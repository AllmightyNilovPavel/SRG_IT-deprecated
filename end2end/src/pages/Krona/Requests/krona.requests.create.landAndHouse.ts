import { IRequestLandAndHouse } from "options/testData/krona";
import {
  KronaRequestLandCategory,
  KronaRequestLandCommunications,
  KronaRequestsQualifiedRepairsState,
  RealtyType,
} from "../Enums";

import { RequestsBase } from "./krona.requests.base";

class RequestsLandAndHouse extends RequestsBase {
  path = "/request/land_and_house/new";

  FullfillLandAndHouseRequest(data: IRequestLandAndHouse) {
    let addressChecker = this.InputAddress(data.address);
    if (addressChecker === null || addressChecker === "") this.InputAddress(data.address);

    this.inputHouseNumber(data.houseNumber);
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
    this.inputHouseCadastralNumber(data.houseCadastralNumber);
    this.inputHouseSpace(data.houseSpace);
    this.inputHouseBuildDate(data.houseBuildDate);
    this.inputHouseWalls(data.houseWallsMaterial);
    this.selectHouseRepairState(
      Object.values(KronaRequestsQualifiedRepairsState)[data.houseRepairStateIndex]
    );
    this.inputTotalPrice(data.totalPrice);
    // this.inputHousePrice(data.totalPrice - data.landPrice);
    this.inputLandPrice(data.landPrice);
    this.inputFile(data.filePath);
  }
  // ----------------------------------------------------------------------------------------------------------
  waitForLoad() {
    this.$map.waitForDisplayed({});
    this.select_realtyType(RealtyType.LAND_AND_HOUSE);
    this.$input_landNumber.waitForDisplayed({ timeout: 5000 });
    this.$input_houseCadastralNumber.waitForDisplayed({ timeout: 5000 });
  }
  waitForResult() {
    let result = this.valuationResult(RealtyType.LAND_AND_HOUSE);
    return result;
  }
}

export const requestCreateLandAndHouse = new RequestsLandAndHouse();
