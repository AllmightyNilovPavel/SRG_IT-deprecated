import { BaResidentialReportPartLocationAndMap } from "../declarations/ba.residential.report.part.locationAndMap";
import { BaReportResidentialSubwayDistance, BaReportResidentialLiquidity } from "../../enums";

export class BaResidentialReportPartLocationAndMapFunctions extends BaResidentialReportPartLocationAndMap {
  deleteField(fieldName: string) {
    let operatingElement = this[`$input_${fieldName}`];

    if (operatingElement.isExisting() && operatingElement.isDisplayed()) {
      operatingElement.scrollIntoView();
      operatingElement.waitForClickable();
      operatingElement.click();
      let buttonRemoveField = $(`a[onclick*=${fieldName}]`);
      buttonRemoveField.waitForDisplayed({});
      buttonRemoveField.click();
      operatingElement.waitForDisplayed({ timeout: 1000, reverse: true });
      console.log(`Поле ${operatingElement.getTitle()} удалено`);
      return true;
    } else {
      console.log(`Поле ${operatingElement.getTitle()} было удалено ранее`);
      return false;
    }
  }
  // ------------------------------------------------------------------------------
  setAdministrativeRegion(region: string) {
    this.$input_administrativeRegion.scrollIntoView();
    this.$input_administrativeRegion.waitForDisplayed({});
    this.$input_administrativeRegion.setValue(region);
  }
  setDistrictInfo(districtInfo: string) {
    this.$input_district.scrollIntoView();
    this.$input_district.waitForDisplayed({});
    this.$input_district.setValue(districtInfo);
  }
  setAveragePriceForObjectClass(averagePrice: number | string) {
    this.$input_averagePrice.scrollIntoView();
    this.$input_averagePrice.waitForDisplayed({});

    typeof averagePrice === "number"
      ? this.$input_averagePrice.setValue(averagePrice.toString())
      : this.$input_averagePrice.setValue(averagePrice);
  }
  setSubwayInfo(subwayInfo: string) {
    this.$input_subwayInfo.scrollIntoView();
    this.$input_subwayInfo.waitForDisplayed({});
    this.$input_subwayInfo.setValue(subwayInfo);
  }
  setSubwayDistance(subwayDistance: BaReportResidentialSubwayDistance) {
    this.$input_subwayDistance.scrollIntoView();
    this.$input_subwayDistance.waitForDisplayed({});
    this.$input_subwayDistance.setValue(subwayDistance);
  }
  setHighwayInfo(highwayInfo: string) {
    this.$input_highway.scrollIntoView();
    this.$input_highway.waitForDisplayed({});
    this.$input_highway.setValue(highwayInfo);
  }
  setHighwayDistanceInfo(highwayDistance: string) {
    this.$input_highwayDistance.scrollIntoView();
    this.$input_highwayDistance.waitForDisplayed({});
    this.$input_highwayDistance.setValue(highwayDistance);
  }
  setMkadDistance(mkadDistance: string) {
    this.$input_mkadDistance.scrollIntoView();
    this.$input_mkadDistance.waitForDisplayed({});
    this.$input_mkadDistance.setValue(mkadDistance);
  }
  setDistrictPrestigeInfo(districtPrestigeInfo: string) {
    this.$input_districtPrestige.scrollIntoView();
    this.$input_districtPrestige.waitForDisplayed({});
    this.$input_districtPrestige.setValue(districtPrestigeInfo);
  }
  setLiquidity(liquidity: BaReportResidentialLiquidity) {
    this.$input_liquidity.scrollIntoView();
    this.$input_liquidity.waitForDisplayed({});
    this.$input_liquidity.setValue(liquidity);
  }
  setNearPlantDescriptions(nearPlantDescriptions: string) {
    this.$input_nearPlantDescriptions.scrollIntoView();
    this.$input_nearPlantDescriptions.waitForDisplayed({});
    this.$input_nearPlantDescriptions.setValue(nearPlantDescriptions);
  }
  mapDataRefresh() {
    this.$button_mapRefresh.scrollIntoView();
    this.$button_mapRefresh.waitForClickable();
    this.$button_mapRefresh.click();
    this.$info_mapErrorMessage.waitForDisplayed({ timeout: 2000, reverse: true });
  }
  // ------------------------------------------------------------------------------
  setBlockData_districtAndLocationOfAssesmentObject(
    averagePrice: string | number,
    liquidity: BaReportResidentialLiquidity,
    nearPlantDescriptions: string
  ) {
    this.setAveragePriceForObjectClass(averagePrice);
    this.setLiquidity(liquidity);
    this.setNearPlantDescriptions(nearPlantDescriptions);
    // this.mapDataRefresh();
  }
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab5"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
