import DocCollection, { BaseDoc } from "../framework/doc";

export interface EditableDoc extends BaseDoc {}

export default class EditableConcept {
  public readonly edits = new DocCollection<EditableDoc>("editable");
}
