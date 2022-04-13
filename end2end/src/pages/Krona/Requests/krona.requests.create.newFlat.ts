import { IRequestNewFlat } from "options/testData/krona";
import {
  RealtyType,
  KronaRequestsWallsType,
  KronaRequestsQualifiedRepairsState,
  KronaBuildingQarter,
} from "../Enums";
import { RequestsBase } from "./krona.requests.base";

class RequestsNewFlat extends RequestsBase {
  path = "/request/new_flat/new";

  FullfillNewFlatRequest(data: IRequestNewFlat) {
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
    this.select_realtyType(RealtyType.NEW_FLAT);
    this.$input_documentAddress.waitForDisplayed({ timeout: 5000 });
  }
  waitForResult() {
    let result = this.valuationResult(RealtyType.NEW_FLAT);
    return result;
  }
}

export const requestCreateNewFlat = new RequestsNewFlat();
