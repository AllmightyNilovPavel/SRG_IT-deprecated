import { debugLogging } from "modules";
import { IRequestFlat } from "options/testData/krona";
import { RealtyType, ValuationResultData } from "../Enums";
import { KronaRequestsQualifiedRepairsState } from "../Enums";
import { KronaRequestsWallsType } from "../Enums";

import { RequestsBase } from "./krona.requests.base";

export class RequestsFlat extends RequestsBase {
  path = "/request/flat/new";

  //------------------------------------------------ Методы ------------------------------------------------------------
  fullfillFlatRequest(data: IRequestFlat) {
    let addressCheck: string = "";
    addressCheck = this.InputAddress(data.address);
    if (addressCheck !== null || addressCheck !== "" || addressCheck !== " ") {
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
    } else throw new Error(`Ошибка ввода адреса.`);
  }

  waitForLoad() {
    this.select_realtyType(RealtyType.FLAT);
    this.$map.waitForDisplayed({
      timeoutMsg:
        "При открытии страницы с созданием нового запроса стоимости не прогрузилась карта.",
    });
    debugLogging(`Страница создания нового запроса стоимости открылась`);
  }

  waitForResult(requestedResult?: ValuationResultData) {
    debugLogging(`Ожидание расчета стомости роботом...`);
    return this.valuationResult(RealtyType.FLAT, requestedResult);
  }
}

export const requestsCreateFlat = new RequestsFlat();
