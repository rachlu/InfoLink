import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

export interface TagDoc extends BaseDoc {
  tag: String;
  post: ObjectId;
}

export default class TagConcept {
  public readonly tags = new DocCollection<TagDoc>("tag");

  private sanitizeTags(t: TagDoc) {
    // eslint-disable-next-line
    const { tag, ...rest } = t; // Only get tag name
    return tag;
  }
  async addTag(tag: String, post: ObjectId) {
    await this.notExist(tag, post);
    const _id = await this.tags.createOne({ tag, post });
    return { msg: "Tag created successfully!", tag: await this.tags.readOne({ _id }) };
  }

  async deleteTag(tag: String, post: ObjectId) {
    await this.exists(tag, post);
    await this.tags.deleteOne({ tag, post });
    return { msg: "Deleted Tag Successfully!" };
  }

  async getTagsPost(post: ObjectId) {
    return (await this.tags.readMany({ post })).map(this.sanitizeTags);
  }

  private async notExist(tag: String, post: ObjectId) {
    if (await this.tags.readOne({ tag, post })) {
      throw new NotAllowedError(`${tag} exists`);
    }
  }

  private async exists(tag: String, post: ObjectId) {
    const result = await this.tags.readOne({ tag, post });
    if (!result) {
      throw new NotAllowedError(`${tag} does not exist`);
    }
  }
}
