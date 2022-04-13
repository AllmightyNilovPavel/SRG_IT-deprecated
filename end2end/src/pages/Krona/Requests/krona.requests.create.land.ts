import { IRequestLand } from "options/testData/krona";
import {
  KronaRequestLandCategory,
  KronaRequestLandCommunications,
  RealtyType,
  ValuationResultData,
} from "../Enums";
import { RequestsBase } from "./krona.requests.base";

class RequestsLand extends RequestsBase {
  path = "/request/land/new";

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
    this.inputFile(data.filePath);
  }

  waitForLoad() {
    this.$map.waitForDisplayed({});
    this.select_realtyType(RealtyType.LAND);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
  waitForResult(requestedResult?: ValuationResultData) {
    let result = this.valuationResult(RealtyType.LAND, requestedResult);
    return result;
  }
}

export const requestCreateLand = new RequestsLand();
