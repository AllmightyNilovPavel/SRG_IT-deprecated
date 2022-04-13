import { IReportData, IRequestLand } from "options/testData/krona";
import { KronaRequestLandCategory, KronaRequestLandCommunications, RealtyType } from "../Enums";
import { KronaReportsBase } from "./krona.reports.base";

class ReportsLand extends KronaReportsBase {
  path = "/report/land/new";

  FullfillLandRequest(data: IRequestLand) {
    this.InputAddress(data.address);
    this.inputLandNumber(data.landNumber);
    this.inputAssociationName(data.associationName);
    this.inputCadastralNumber(data.cadastralNumber);
    this.inputLandSpace(data.landSpace);
    this.selectLandCategory(Object.values(KronaRequestLandCategory)[data.landCategoryIndex]);
    this.inputLandPurpose(data.landPurpose);
    this.selectLandElectricity(
      Object.values(KronaRequestLandCommunications)[data.landElectrycityIndex]
    );
    this.selectLandGasSupply(Object.values(KronaRequestLandCommunications)[data.landGasupplyIndex]);
    this.selectLandWaterSupply(
      Object.values(KronaRequestLandCommunications)[data.landWaterSupplyIndex]
    );
    this.selectLandSewerage(Object.values(KronaRequestLandCommunications)[data.landSewerageIndex]);
    this.inputLandPrice(data.landPrice);
    // this.inputFile(data.filePath);
  }
  FullfillReportData(data: IReportData) {
    this.inputReportNumber(data.reportNumber);
    this.inputCustomerFullName(data.reportCustomerFullName);
    this.inputReportAppraiserCompanyName(data.reportAppraiserName);
    this.inputReportAppraisercompanyInn(data.reportAppraiserInn);
    this.inputReportFile(data.reportFilePath);
  }
  waitForLoad() {
    this.select_realtyType(RealtyType.LAND);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}

export const reportCreateLand = new ReportsLand();
