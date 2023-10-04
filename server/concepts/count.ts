import DocCollection, { BaseDoc } from "../framework/doc";

export interface CountDoc extends BaseDoc {}

export default class CommentConcept {
  public readonly counts = new DocCollection<CountDoc>("count");
}
