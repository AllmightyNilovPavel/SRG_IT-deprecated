import { BaResidentialReportPartBuildingInfo } from "../declarations/ba.residential.report.part.buildingInfo";
import {
  BaReportResidentialRenovation,
  BaResidentialBuildingOuterWallsMaterial,
} from "pages/ba/classic/enums/index";

export class BaResidentialReportPartBuildingInfoFunctions extends BaResidentialReportPartBuildingInfo {
  inputStoreys(storeys: string | number) {
    this.$input_storeys.scrollIntoView();
    this.$input_storeys.waitForDisplayed({});

    typeof storeys === "number"
      ? this.$input_storeys.setValue(storeys.toString())
      : this.$input_storeys.setValue(storeys);
  }
  /**
   * Метод заполнения поля "Материал наружных стен"
   * @param wallsMaterial
   * @deprecated вместо этого метода используйте `selectOuterWallsMaterial`
   */
  inputOuterWallsMaterial(wallsMaterial: string) {
    this.$input_buildingWalls.scrollIntoView();
    this.$input_buildingWalls.waitForDisplayed({});
    this.$input_buildingWalls.setValue(wallsMaterial);
  }
  /**
   * Метод выбора значения из селектора для поля "Материал наружных стен"
   * @param outerWallsMaterial
   */
  selectOuterWallsMaterial(outerWallsMaterial: BaResidentialBuildingOuterWallsMaterial) {
    let target: WebdriverIO.Element;
    target = this.$selectorOuterBuildingWallsMaterial;

    target.waitForExist();
    target.waitForClickable();
    target.scrollIntoView();
    target.selectByAttribute("value", outerWallsMaterial);
  }
  inputBtiWallsMaterial(btiWallsMaterial: string) {
    this.$input_buildingWallsBTI.scrollIntoView();
    this.$input_buildingWallsBTI.waitForDisplayed({});
    this.$input_buildingWallsBTI.setValue(btiWallsMaterial);
  }
  inputBuildingCeillings(buildingCeilings: string) {
    this.$input_buildingCeillings.scrollIntoView();
    this.$input_buildingCeillings.waitForDisplayed({});
    this.$input_buildingCeillings.setValue(buildingCeilings);
  }
  inputBuiltInYear(builtInYear: string | number) {
    this.$input_builtInYear.scrollIntoView();
    this.$input_builtInYear.waitForDisplayed({});

    typeof builtInYear === "number"
      ? this.$input_builtInYear.setValue(builtInYear.toString())
      : this.$input_builtInYear.setValue(builtInYear);
  }
  inputStateOfBuilding(stateOfBuilding: string) {
    this.$input_stateOfBuilding.scrollIntoView();
    this.$input_stateOfBuilding.waitForDisplayed({});
    this.$input_stateOfBuilding.setValue(stateOfBuilding);
  }
  inputStateOfRoof(stateOfRoof: string) {
    this.$input_stateOfRoof.scrollIntoView();
    this.$input_stateOfRoof.waitForDisplayed({});
    this.$input_stateOfRoof.setValue(stateOfRoof);
  }
  inputFlatsCount(flatsCount: string | number) {
    this.$input_floorFlatsCount.scrollIntoView();
    this.$input_floorFlatsCount.waitForDisplayed({});

    typeof flatsCount === "number"
      ? this.$input_floorFlatsCount.setValue(flatsCount.toString())
      : this.$input_floorFlatsCount.setValue(flatsCount);
  }
  selectRenovation(renovationData: BaReportResidentialRenovation, renovationComment?: string) {
    this.$selector_renovation.selectByAttribute("value", renovationData);
    this.$input_renovationComment.waitForDisplayed({ timeout: 2000, reverse: false });
    if (renovationComment) {
      this.$input_renovationComment.scrollIntoView();
      this.$input_renovationComment.addValue(renovationComment);
    }
  }

  setBlockData_BuildingAndNearbyTerritory(
    storeys: string | number,
    outerWallsMaterial: BaResidentialBuildingOuterWallsMaterial,
    btiWallsMaterial: string,
    buildingCeilings: string,
    builtInYear: string | number,
    stateOfBuilding: string,
    stateOfRoof: string,
    flatsCount: string | number,
    renovationData: BaReportResidentialRenovation,
    renovationComment?: string
  ) {
    this.inputStoreys(storeys);
    this.inputOuterWallsMaterial(outerWallsMaterial);
    this.inputBtiWallsMaterial(btiWallsMaterial);
    this.inputBuildingCeillings(buildingCeilings);
    this.inputBuiltInYear(builtInYear);
    this.selectRenovation(renovationData, renovationComment);
    this.inputStateOfBuilding(stateOfBuilding);
    this.inputStateOfRoof(stateOfRoof);
    this.inputFlatsCount(flatsCount);
  }

  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab4"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
