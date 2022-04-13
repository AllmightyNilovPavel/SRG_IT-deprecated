import {
  KronaBuildingQarter,
  KronaRequestsQualifiedRepairsState,
  KronaRequestsWallsType,
  RealtyType,
} from "../Enums";
import { IReportData, IRequestNewApartment } from "options/testData/krona";
import { KronaReportsBase } from "./krona.reports.base";

class ReportsNewFlat extends KronaReportsBase {
  path = "/report/new_flat/new";

  FullfillReportData(data: IReportData) {
    this.inputReportNumber(data.reportNumber);
    this.inputCustomerFullName(data.reportCustomerFullName);
    this.inputReportAppraiserCompanyName(data.reportAppraiserName);
    this.inputReportAppraisercompanyInn(data.reportAppraiserInn);
    this.inputReportFile(data.reportFilePath);
  }
  FullfillNewFlatRequest(data: IRequestNewApartment) {
    this.inputDocumentAddress(data.documentAddress);
    this.InputAddress(data.address);
    this.inputHouseNumber(data.houseNumber);
    this.selectBuildQuarter(Object.values(KronaBuildingQarter)[data.buildQuarter]);
    this.inputBuildYear(data.buildYear);
    this.inputStoreys(data.storeys);
    this.selectWallsType(Object.values(KronaRequestsWallsType)[data.wallsType_index]);
    this.inputFloor(data.floor);
    this.inputRoomsCount(data.roomsCount);
    this.inputTotalSpace(data.total_space);
    this.selectRepairState(
      Object.values(KronaRequestsQualifiedRepairsState)[data.flatRepairs_index]
    );
    this.inputPrice(data.price);
  }
  waitForLoad() {
    this.select_realtyType(RealtyType.NEW_FLAT);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}

export const reportsCreateNewFlat = new ReportsNewFlat();
