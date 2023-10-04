import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Friend, Post, Report, Tag, Timeout, User, WebSession } from "./app";
import { PostDoc, PostOptions } from "./concepts/post";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    const created = await User.create(username, password);
    const createdUser = created.user;
    let msg = created.msg;
    if (createdUser) {
      const timeoutResult = await Timeout.block(createdUser._id, 60);
      msg += " " + timeoutResult.msg;
    }
    return { msg: msg, user: created.user };
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  @Router.get("/posts")
  async getPosts(author?: string) {
    let posts;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      posts = await Post.getByAuthor(id);
    } else {
      posts = await Post.getPosts({});
    }
    return Responses.posts(posts);
  }

  @Router.post("/posts")
  async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
    const user = WebSession.getUser(session);
    await Timeout.freeUser(user);
    await Timeout.notBlocked(user);
    const created = await Post.create(user, content, options);
    return { msg: created.msg, post: await Responses.post(created.post) };
  }

  @Router.patch("/posts/:_id")
  async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    await Timeout.freeUser(user);
    await Timeout.notBlocked(user);
    return await Post.update(_id, update);
  }

  @Router.delete("/posts/:_id")
  async deletePost(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    await Timeout.freeUser(user);
    await Timeout.notBlocked(user);
    return Post.delete(_id);
  }

  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    return await Friend.removeFriend(user, friendId);
  }

  @Router.get("/friend/requests")
  async getRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getRequests(user));
  }

  @Router.post("/friend/requests/:to")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
  }

  @Router.post("/report/:_id")
  async reportEdit(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    return await Report.create(user, _id);
  }

  @Router.delete("/report/:_id")
  async deleteReport(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Report.isReporter(user, _id);
    return await Report.delete(user, _id);
  }

  @Router.get("/count/report/:tag")
  async getReportTagNum(session: WebSessionDoc, tag: String) {
    // Gets the number of reports an user has for specific tag
  }

  @Router.post("/edits")
  async createEdit(session: WebSessionDoc, content: string) {
    // Create an edit to a community tagged Post with given content
  }

  @Router.put("/edit/reported/:_id")
  async approveEdit(session: WebSessionDoc, _id: ObjectId) {
    // Let a verified user approve a reported edit
  }

  @Router.delete("/edit/reported/:_id")
  async rejectEdit(session: WebSessionDoc, _id: ObjectId) {
    // Let a verified user reject and delete a reported edit
  }

  @Router.post("/tags/:tag/:_id")
  async addTag(session: WebSessionDoc, tag: String, _id: ObjectId) {
    // Let an user add tag to given post _id if user is author of post
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    await Timeout.freeUser(user);
    await Timeout.notBlocked(user);
    return Tag.addTag(tag, _id);
  }

  @Router.delete("/tags/:tag/:_id")
  async deleteTag(session: WebSessionDoc, tag: String, _id: ObjectId) {
    // Let an user delete a tag to a given post _id if user is author of post
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    await Timeout.freeUser(user);
    await Timeout.notBlocked(user);
    return Tag.deleteTag(tag, _id);
  }

  @Router.get("/tags/:_id")
  async getTags(session: WebSessionDoc, _id: ObjectId) {
    const tags = await Tag.getTagsPost(_id);
    return tags;
  }

  @Router.post("/comments/:_id")
  async createComment(session: WebSessionDoc, _id: ObjectId, content: string) {
    // Let an user create a comment for a specific post
  }

  @Router.delete("/comments/:_id")
  async deleteComment(session: WebSessionDoc, _id: ObjectId) {
    // Let an user delete their own comment
  }

  @Router.patch("/count/increment/:_id")
  async incrementCount(session: WebSessionDoc, _id: ObjectId) {
    // Let user increment count for a specific object with given ID
  }

  @Router.patch("/count/decrement/:_id")
  async decrementCount(session: WebSessionDoc, _id: ObjectId) {
    // Let user decrement count for a specific object with given ID
  }

  @Router.get("/count/:tag")
  async getTagCount(session: WebSessionDoc, tag: String) {
    // Get specific count an user has for a specific tag
  }
}

export default getExpressRouter(new Routes());
