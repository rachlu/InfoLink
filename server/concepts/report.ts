import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface ReportDoc extends BaseDoc {
  reporter: ObjectId;
  edit: ObjectId;
}

export default class ReportConcept {
  public readonly reports = new DocCollection<ReportDoc>("report");

  async create(reporter: ObjectId, edit: ObjectId) {
    await this.notReported(reporter, edit);
    const _id = await this.reports.createOne({ reporter, edit });
    return { msg: "User created successfully!", report: await this.reports.readOne({ _id }) };
  }

  async delete(reporter: ObjectId, edit: ObjectId) {
    await this.reportExists(reporter, edit);
    await this.reports.deleteOne({ reporter, edit });
    return { msg: "Report deleted!" };
  }

  async isReporter(user: ObjectId, edit: ObjectId) {
    const report = await this.reports.readOne({ user, edit });
    if (!report) {
      throw new NotFoundError(`Report ${edit} does not exist!`);
    }
    if (report.reporter.toString() !== user.toString()) {
      throw new ReportNotMatchError(user, edit);
    }
  }
  private async notReported(reporter: ObjectId, edit: ObjectId) {
    if (await this.reports.readOne({ reporter, edit })) {
      throw new NotAllowedError("User already reported this edit");
    }
  }

  private async reportExists(reporter: ObjectId, edit: ObjectId) {
    const report = this.reports.readOne({ reporter, edit });
    if (!report) {
      throw new NotAllowedError("Report Does not Exist");
    }
  }
}

export class ReportNotMatchError extends NotAllowedError {
  constructor(
    public readonly reporter: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the reporter of report {1}!", reporter, _id);
  }
}
