import {
  KronaBuildingQarter,
  KronaRequestsQualifiedRepairsState,
  KronaRequestsWallsType,
  RealtyType,
  ValuationResultData,
} from "../Enums";
import { IRequestNewApartment } from "options/testData/krona";
import { RequestsBase } from "./krona.requests.base";

class RequestsNewApartment extends RequestsBase {
  path = "/request/new_apartment/new";

  FullfillNewApartmentRequest(data: IRequestNewApartment) {
    this.inputDocumentAddress(data.documentAddress);
    this.InputAddress(data.address);
    this.inputHouseNumber(data.houseNumber);
    this.inputHousingComplexName(data.housingComplexName);
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
    this.$map.waitForDisplayed({});
    this.select_realtyType(RealtyType.NEW_APARTMENT);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
  waitForResult(requestedResult?: ValuationResultData) {
    let result = this.valuationResult(RealtyType.NEW_APARTMENT, requestedResult);
    return result;
  }
}

export const requestsCreateNewApartment = new RequestsNewApartment();
