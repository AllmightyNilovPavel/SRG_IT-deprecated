import {
  KronaRequestsQualifiedRepairsState,
  KronaRequestsWallsType,
  RealtyType,
  ValuationResultData,
} from "../Enums";
import { IRequestApartment } from "options/testData/krona";
import { RequestsBase } from "./krona.requests.base";

class RequestsApartment extends RequestsBase {
  path = "/request/apartment/new";

  FullfillApartmentRequest(data: IRequestApartment) {
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
    if (data.custom1) {
      this.inputCustomField(data.custom1, 1);
    }
  }

  waitForLoad() {
    this.$map.waitForDisplayed({});
    this.select_realtyType(RealtyType.APARTMENT);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
  waitForResult(requestedResult?: ValuationResultData) {
    let result = this.valuationResult(RealtyType.FLAT, requestedResult);
    return result;
  }
}

export const requestsCreateApartment = new RequestsApartment();
