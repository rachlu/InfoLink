import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";

export interface VerifiedItemDoc extends BaseDoc {}

export default class VerifiedItemConcept {
  public readonly verifiedItems = new DocCollection<VerifiedItemDoc>("verifiedItem");

  async isVerified(user: ObjectId) {}
}
