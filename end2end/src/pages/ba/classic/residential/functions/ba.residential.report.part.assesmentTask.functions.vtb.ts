import { BaResidentialUserDepartment } from "../../enums";
import { BaResidentialReportPartAssesmentTaskVtb } from "../declarations/ba.residential.report.part.assesmentTask.vtb";
import { BaResidentialReportPartAssesmentTaskFunctions } from "./ba.residential.report.part.assesmentTask.functions";

export class BaResidentialReportPartAssesmentTaskFunctionsVtb extends BaResidentialReportPartAssesmentTaskFunctions {
  assesmentTaskVtb = new BaResidentialReportPartAssesmentTaskVtb();

  selectDivision(department: BaResidentialUserDepartment) {
    this.assesmentTaskVtb.$selector_division.waitForExist();
    this.assesmentTaskVtb.$selector_division.scrollIntoView();
    this.assesmentTaskVtb.$selector_division.selectByAttribute("value", department);
  }
}
