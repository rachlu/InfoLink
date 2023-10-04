import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

export interface TimeOutDoc extends BaseDoc {
  user: ObjectId;
  expire: Date;
}

export default class TimeoutConcept {
  public readonly timeouts = new DocCollection<TimeOutDoc>("timeout");

  async block(user: ObjectId, secs: number) {
    await this.notBlocked(user);
    const expire = new Date();
    expire.setSeconds(expire.getSeconds() + secs);
    const _id = await this.timeouts.createOne({ user, expire });
    return { msg: `User Blocked! until ${expire}`, user: await this.timeouts.readOne({ _id }) };
  }

  async getUsersUnblockedAt() {
    // Get all users that will be unblocked at this time
    const filter = { $lt: new Date() };
    const users = await this.timeouts.readMany({ filter });
    return users;
  }

  async isUserExpired(userID: ObjectId) {
    const user = await this.timeouts.readOne({ user: userID });
    if (!user) {
      return true;
    }

    const currentTime = new Date();
    if (user.expire < currentTime) {
      return true;
    }

    return false;
  }

  async freeUser(_id: ObjectId) {
    // Free specific User with _id
    if (await this.isUserExpired(_id)) {
      await this.timeouts.deleteOne({ user: _id });
      return { msg: "Blocked User freed!" };
    }
    return { msg: "No User freed!" };
  }

  async existsBlockedUser(userID: ObjectId) {
    const user = await this.timeouts.readOne({ user: userID });
    if (!user) {
      throw new NotAllowedError(`User with UserID ${userID} is not blocked`);
    }
  }

  async notBlocked(userID: ObjectId) {
    const blockedUser = await this.timeouts.readOne({ user: userID });
    if (blockedUser) {
      throw new NotAllowedError(`User with UserID ${userID} is blocked until ${blockedUser.expire}`);
    }
  }
}
