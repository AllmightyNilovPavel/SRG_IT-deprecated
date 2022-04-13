import { IRequestFlat } from "options/testData/krona";
import { RealtyType, ValuationResultData } from "../Enums";
import { KronaRequestsQualifiedRepairsState } from "../Enums/krona.enum.requests.qualifiedRepairState";
import { KronaRequestsWallsType } from "../Enums/krona.enum.requests.wallsType";
import { RequestsBase } from "./krona.requests.base";

class RequestsTownhouse extends RequestsBase {
  path = "/request/townhouse/new";

  FullfillTownhouseRequest(data: IRequestFlat) {
    let check = null;
    check = this.InputAddress(data.address);

    if (check !== null || check !== "") {
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
    } else {
      throw new Error(`Ошибка при вводе адреса`);
    }
  }
  // -----------------------------------------------------------------------------------
  waitForLoad() {
    this.select_realtyType(RealtyType.TOWNHOUSE);
    this.$map.waitForDisplayed({});
  }
  waitForResult(requestedResult?: ValuationResultData) {
    let result = this.valuationResult(RealtyType.TOWNHOUSE, requestedResult);
    return result;
  }
}

export const requestsCreateTownhouse = new RequestsTownhouse();
