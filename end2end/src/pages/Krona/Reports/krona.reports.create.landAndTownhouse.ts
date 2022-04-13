import { IReportData, IRequestLandAndHouse } from "options/testData/krona";
import {
  KronaRequestLandCategory,
  KronaRequestLandCommunications,
  KronaRequestsQualifiedRepairsState,
  RealtyType,
} from "../Enums";
import { KronaReportsBase } from "./krona.reports.base";

/**
 * Класс типа `PageFactory` для работы со страницей
 * создания нового запроса на верификацию по типу
 * Таунхаус с Землёй
 */
class ReportsLandAndTownhouse extends KronaReportsBase {
  path = "/report/land_and_townhouse/new";

  /**
   * Функция заполнения данных по объекту оценки
   *
   * @param data
   */
  FullfillLandAndTownhouseRequest(data: IRequestLandAndHouse) {
    this.InputAddress(data.address);
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
    // this.inputFile(data.filePath);
  }
  FullfillReportData(data: IReportData) {
    this.inputReportNumber(data.reportNumber);
    this.inputCustomerFullName(data.reportCustomerFullName);
    this.inputReportAppraiserCompanyName(data.reportAppraiserName);
    this.inputReportAppraisercompanyInn(data.reportAppraiserInn);
    this.inputReportFile(data.reportFilePath);
  }
  // ----------------------------------------------------------------------------------------------------------
  waitForLoad() {
    this.select_realtyType(RealtyType.LAND_AND_TOWNHOUSE);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
    this.$input_landNumber.waitForDisplayed({ timeout: 5000 });
    this.$input_houseCadastralNumber.waitForDisplayed({ timeout: 5000 });
  }
}

export const reportCreateLandAndTownhouse = new ReportsLandAndTownhouse();
