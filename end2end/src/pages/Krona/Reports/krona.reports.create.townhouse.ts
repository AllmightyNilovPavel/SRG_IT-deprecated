import { IReportData, IRequestFlat } from "options/testData/krona";
import { KronaRequestsQualifiedRepairsState, KronaRequestsWallsType, RealtyType } from "../Enums";
import { KronaReportsBase } from "./krona.reports.base";

class ReportsTownhouse extends KronaReportsBase {
  path = "/report/townhouse/new";

  FullfillReportData(data: IReportData) {
    this.inputReportNumber(data.reportNumber);
    this.inputCustomerFullName(data.reportCustomerFullName);
    this.inputReportAppraiserCompanyName(data.reportAppraiserName);
    this.inputReportAppraisercompanyInn(data.reportAppraiserInn);
    this.inputReportFile(data.reportFilePath);
  }
  FullfillTownhouseRequest(data: IRequestFlat) {
    this.InputAddress(data.address);
    this.inputHouseNumber(data.houseNumber);
    this.inputBuildYear(data.buildDate);
    this.inputStoreys(data.storeys);
    this.selectWallsType(Object.values(KronaRequestsWallsType)[data.wallsType_index]);
    this.inputFloor(data.floor);
    this.inputRoomsCount(data.roomsCount);
    this.inputTotalSpace(data.total_space);
    this.inputLivingSpace(data.living_space);
    this.inputKitchenSpace(data.kitchen_space);
    this.selectRepairState(
      Object.values(KronaRequestsQualifiedRepairsState)[data.flatRepairs_index]
    );
    this.inputPrice(data.price);
  }
  waitForLoad() {
    this.select_realtyType(RealtyType.TOWNHOUSE);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}

export const reportsCreateTownhouse = new ReportsTownhouse();
