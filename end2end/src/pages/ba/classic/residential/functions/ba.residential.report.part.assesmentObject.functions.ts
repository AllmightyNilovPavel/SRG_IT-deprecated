import { BaResidentialReportPartAssesmentObject } from "../declarations/ba.residential.report.part.assesmentObject";
import { BaQualifiedRepairState, BaResidentialInternalInspection } from "../../enums";
import { debugLogging } from "modules";
import { RealtyType } from "pages/Krona";

export class BaResidentialReportPartAssesmentObjectFunctions extends BaResidentialReportPartAssesmentObject {
  setFlatDataSource(dataSource: string) {
    debugLogging(`Данные для функции: ${dataSource}`);
    this.$input_flatDataSource.scrollIntoView();
    this.$input_flatDataSource.waitForDisplayed({});
    this.$input_flatDataSource.setValue(dataSource);
  }
  setFlatRoomsCount(roomsCount: string | number) {
    debugLogging(`Данные для функции: ${roomsCount}`);
    this.$input_rooms.waitForExist();

    if (this.$input_rooms.isEnabled() === false) {
      this.$checkbox_rooms_noData.scrollIntoView();
      this.$checkbox_rooms_noData.waitForClickable();
      this.$checkbox_rooms_noData.click();
      this.$input_rooms.waitForEnabled();
      this.$input_rooms.scrollIntoView();
    } else this.$input_rooms.scrollIntoView();

    this.$input_rooms.setValue(roomsCount.toString());
  }
  setFlatSpaceTotal(spaceTotal: string | number) {
    debugLogging(`Данные для функции: ${spaceTotal}`);
    this.$input_spaceTotal.waitForExist();

    if (spaceTotal) {
      this.$input_spaceTotal.scrollIntoView();
      this.$input_spaceTotal.waitForDisplayed({});

      this.$input_spaceTotal.setValue(spaceTotal.toString());

      browser.waitUntil(() => this.$input_spaceTotal.getText() !== null, {
        timeoutMsg: `Не удалось установить значение поля "Общая площадь".`,
      });
    } else {
      throw new Error(`Некорректное значение для поля Общая Площадь.
                    Нужно 'строка | число', а получили ${typeof spaceTotal}`);
    }
  }
  setFlatSpaceLiving(spaceLiving: string | number) {
    debugLogging(`Данные для функции: ${spaceLiving}`);
    if (spaceLiving) {
      this.$input_spaceLiving.scrollIntoView();

      if (this.$input_spaceLiving.isEnabled() === false) {
        this.$checkbox_spaceLiving_noData.scrollIntoView();
        this.$checkbox_spaceLiving_noData.waitForClickable();
        this.$checkbox_spaceLiving_noData.click();
        this.$input_spaceLiving.scrollIntoView();
        this.$input_spaceLiving.waitForEnabled();
      } else this.$input_spaceLiving.scrollIntoView();

      this.$input_spaceLiving.setValue(spaceLiving.toString());
    } else {
      throw new Error(`Некорректное значение для поля Общая Площадь.
                  Нужно ${typeof spaceLiving}, а получили ${spaceLiving}`);
    }
  }
  setFlatSpaceKitchen(spaceKitchen: string | number) {
    debugLogging(`Данные для функции: ${spaceKitchen}`);

    if (this.$input_spaceKitchen.isEnabled() === false) {
      this.$checkbox_spaceKitchen_noData.scrollIntoView();
      this.$checkbox_spaceKitchen_noData.waitForClickable();
      this.$checkbox_spaceKitchen_noData.click();
      this.$input_spaceKitchen.waitForEnabled();
      this.$input_spaceKitchen.scrollIntoView();
    } else this.$input_spaceKitchen.scrollIntoView();

    this.$input_spaceKitchen.setValue(spaceKitchen.toString());
  }
  setFlatSpaceBalcony(spaceBalcony: string | number) {
    debugLogging(`Данные для функции: ${spaceBalcony}`);

    if (this.$input_spaceBalcony.isEnabled() === false) {
      this.$checkbox_spaceBalcony_noData.scrollIntoView();
      this.$checkbox_spaceBalcony_noData.waitForClickable();
      this.$checkbox_spaceBalcony_noData.click();
      this.$input_spaceBalcony.waitForEnabled();
      this.$input_spaceBalcony.scrollIntoView();
    } else this.$input_spaceBalcony.scrollIntoView();

    this.$input_spaceBalcony.setValue(spaceBalcony.toString());
  }

  setSpaceTotalWithBalcony(spaceTotalWithBalcony: string | number) {
    debugLogging(`Данные для функции: ${spaceTotalWithBalcony}`);
    let target = this.$input_spaceTotalWithBalcony;
    target.scrollIntoView();
    target.waitForExist();

    if (!target.isClickable()) {
      this.$checkbox_spaceTotalWithBalcony_noData.scrollIntoView();
      this.$checkbox_spaceTotalWithBalcony_noData.waitForClickable();
      this.$checkbox_spaceTotalWithBalcony_noData.click();
    }

    target.setValue(spaceTotalWithBalcony.toString());
  }
  setRoomsTypeInfo(roomsType: string) {
    debugLogging(`Данные для функции: ${roomsType}`);
    let target = this.$input_adjacentRooms;
    target.scrollIntoView();
    target.waitForDisplayed({});
    target.setValue(roomsType);
  }
  setFlatFloorInfo(flatFloor: string | number) {
    debugLogging(`Данные для функции: ${flatFloor}`);
    this.$input_flatFloor.scrollIntoView();
    this.$input_flatFloor.waitForDisplayed({});

    typeof flatFloor === "number"
      ? this.$input_flatFloor.setValue(flatFloor.toString())
      : this.$input_flatFloor.setValue(flatFloor);
  }
  setFlatIsMansard(isMansard: boolean) {
    debugLogging(`Данные для функции: ${isMansard}`);
    this.$checkbox_mansard.scrollIntoView();
    this.$checkbox_mansard.waitForDisplayed({});

    if (isMansard && this.$input_flatFloor.isEnabled()) {
      this.$checkbox_mansard.scrollIntoView();
      this.$checkbox_mansard.waitForClickable();
      this.$checkbox_mansard.click();
      this.$input_flatFloor.waitForEnabled({ timeout: 10000, reverse: true });
    }
    // else if (this.$input_flatFloor.isEnabled()) {
    //   this.$checkbox_mansard.scrollIntoView();
    //   this.$checkbox_mansard.waitForClickable();
    //   this.$checkbox_mansard.click();
    //   this.$input_flatFloor.waitForEnabled({timeout: 1000, reverse: true});
    // }
  }
  setWindowView(windowView: string) {
    debugLogging(`Данные для функции: ${windowView}`);
    this.$input_windowView.scrollIntoView();
    this.$input_windowView.waitForDisplayed({});
    this.$input_windowView.setValue(windowView);
  }
  setSanitaryFacilitiesInfo(sanitaryInfo: string) {
    this.$input_sanitaryFacilities.scrollIntoView();
    this.$input_sanitaryFacilities.waitForDisplayed({});
    this.$input_sanitaryFacilities.setValue(sanitaryInfo);
  }
  setBalconyInfo(balconyInfo: string) {
    debugLogging(`Данные для функции: ${balconyInfo}`);
    this.$input_balconyType.scrollIntoView();
    this.$input_balconyType.waitForDisplayed({});
    this.$input_balconyType.setValue(balconyInfo);
  }
  selectInternalInspection(internalInspection: BaResidentialInternalInspection) {
    let target: WebdriverIO.Element = this.$selectInternalInspection;
    target.scrollIntoView();
    target.waitForClickable();
    target.selectByAttribute("value", internalInspection);
  }
  // --------------------------------------------------------------------------------------
  selectRepairState(repairState: BaQualifiedRepairState) {
    debugLogging(`Данные для функции: ${repairState}`);
    this.$selector_qualifiedRepairsState.scrollIntoView();
    this.$selector_qualifiedRepairsState.waitForDisplayed();

    if (!this.$selector_qualifiedRepairsState.isClickable())
      this.selectInternalInspection(BaResidentialInternalInspection.YES);

    if (repairState !== BaQualifiedRepairState.OTHER)
      this.$selector_qualifiedRepairsState.selectByAttribute("value", repairState);
    else {
      this.$selector_qualifiedRepairsState.selectByAttribute("value", repairState);
      this.$input_repairState.setValue("Хорошее");
    }
  }

  setBlockData_RoomsAndSpaceOfAssesmentObject(
    dataSource: string,
    roomsCount: string | number,
    spaceTotal: string | number,
    spaceLiving: string | number,
    spaceKitchen: string | number,
    spaceBalcony: string | number,
    spaceTotalWithBalcony: string | number,
    roomsTypeInfo: string,
    floorInfo: string | number,
    isMansard: boolean,
    windowView: string,
    wcInfo: string,
    balconyInfo: string
  ) {
    this.setFlatDataSource(dataSource);
    this.setFlatRoomsCount(roomsCount);
    this.setFlatSpaceTotal(spaceTotal);
    this.setFlatSpaceLiving(spaceLiving);
    this.setFlatSpaceKitchen(spaceKitchen);
    this.setFlatSpaceBalcony(spaceBalcony);
    this.setSpaceTotalWithBalcony(spaceTotalWithBalcony);
    this.setRoomsTypeInfo(roomsTypeInfo);
    this.setFlatFloorInfo(floorInfo);
    this.setFlatIsMansard(isMansard);
    this.setWindowView(windowView);
    this.setSanitaryFacilitiesInfo(wcInfo);
    this.setBalconyInfo(balconyInfo);
  }
  setBlockData_ArrangementAndRedevelopment(repairState: BaQualifiedRepairState) {
    this.selectRepairState(repairState);
  }
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab3"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
