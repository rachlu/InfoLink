import DocCollection, { BaseDoc } from "../framework/doc";

export interface CommentDoc extends BaseDoc {}

export default class ReportConcept {
  public readonly comments = new DocCollection<CommentDoc>("comment");
}
