import { IOneBuildIn } from "options/testData/baikal";
import { BaikalCalc } from "../index";

export class BaikalCalculationTemplateOneBuildIn extends BaikalCalc {
  path = "/baikal/calculations";

  private $calcTableRoot() {
    return $(`table[class^="CalculationTable"]`);
  }
  // --------------------------------------------------
  // ----------- Условия рынка	 ----------------------
  // --------------------------------------------------

  /** Ячейка даты предложения для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_offerDate(i: number) {
    return $(`tr#calculationRow4 td:nth-child(${6 + i}) input`);
  }
  private $$datapicker_today() {
    return $$(`div.rdtPicker td.rdtToday`);
    // return $(`td.rdtDay.rdtToday`);
  }
  // --------------------------------------------------
  // ----------- Местоположение -----------------------
  // --------------------------------------------------
  /** Ячейка Адрес для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_address() {
    return this.$calcTableRoot().$$(`div[title="Адрес"] textarea`);
  }
  /** Ячейка Статус населенного пункта для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_localityStatus(i: number) {
    return $$(`//*[@id='calculationRow6']//button`)[i];
  }
  /** выпадашка Статус населенного пункта */
  private $dropdown_localityStatus(i: number) {
    return this.$cell_localityStatus(i).$(`ul:nth-child(2)`);
  }
  private setLocalityStatus(analogNumber: number) {
    let target = this.$cell_localityStatus(analogNumber);
    let targetDropdown: globalThis.WebdriverIO.Element;
    let rndLocalityStatusId = Math.floor(Math.random() * 5) + 1;

    target.waitForEnabled();
    target.click();

    targetDropdown = target.$$(`/..//input`)[rndLocalityStatusId];
    targetDropdown.waitForEnabled();
    targetDropdown.click();

    browser.pause(500);
    debugLogging(
      `Статус населённого пункта аналога №${analogNumber} = ${target.getAttribute("title")}`
    );

    browser.waitUntil(() => target.getAttribute("title") !== "Не выбрано");
  }
  /** Первый пункт в списке Статус населенного пункта */
  private $item_localityStatus(i: number) {
    return this.$cell_localityStatus(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка Местонахождение в пределах города для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_locationWithinLocality(i: number) {
    return $(`tr#calculationRow7 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Местонахождение в пределах города */
  private $dropdown_locationWithinLocality(i: number) {
    return this.$cell_locationWithinLocality(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке метонахождения */
  private $item_locationWithinLocality(i: number) {
    return this.$cell_locationWithinLocality(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка Линия домов для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_buildingLine(i: number) {
    return $(`tr#calculationRow8 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Линия домов */
  private $dropdown_buildingLine(i: number) {
    return this.$cell_buildingLine(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Линия домов */
  private $item_buildingLine(i: number) {
    return this.$cell_buildingLine(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка Доступ к объекту для аналога RENT
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_objectAccess(i: number) {
    return $(`tr#calculationRow9 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Доступ к объекту */
  private $dropdown_objectAccess(i: number) {
    return this.$cell_objectAccess(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Доступ к объекту */
  private $item_objectAccess(i: number) {
    return this.$cell_objectAccess(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка Доступ к объекту для аналога SALE
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_objectAccessSale(i: number) {
    return $(`tr#calculationRow9 td:nth-child(${6 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Доступ к объекту */
  private $dropdown_objectAccessSale(i: number) {
    return this.$cell_objectAccessSale(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Доступ к объекту */
  private $item_objectAccessSale(i: number) {
    return this.$cell_objectAccessSale(i).$(`ul li:nth-child(2)`);
  }
  // --------------------------------------------------
  // ----------- Физические характеристики	 ----------
  // --------------------------------------------------
  /** 	Ячейка Площадь
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_total(i: number) {
    return $(`tr#calculationRow10 td:nth-child(${6 + i}) input`);
  }
  /** Ячейка Материал стен для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_walls(i: number) {
    return $(`tr#calculationRow11 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Материал стен */
  private $dropdown_walls(i: number) {
    return this.$cell_walls(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Материал стен */
  private $item_walls(i: number) {
    return this.$cell_walls(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка подвал, кв.м
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_floorDetails(i: number) {
    return $(`tr#calculationRow13 td:nth-child(${4 + i}) input`);
  }
  /** Ячейка Состояние отделки для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_repairs(i: number) {
    return $(`tr#calculationRow17 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Состояние отделки */
  private $dropdown_repairs(i: number) {
    return this.$cell_repairs(i).$(`ul:nth-child(2)`);
  }
  /** пункт "хорошее" в списке Состояние отделки */
  private $item_repairs(i: number) {
    return this.$cell_repairs(i).$(`ul li:nth-child(5)`);
  }
  /** Ячейка Парковка для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_parking(i: number) {
    return $(`tr#calculationRow22 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Парковка */
  private $dropdown_parking(i: number) {
    return this.$cell_parking(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Парковка */
  private $item_parking(i: number) {
    return this.$cell_parking(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка Класс объекта для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_buildingClass(i: number) {
    return $(`tr#calculationRow23 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка  Класс объекта */
  private $dropdown_buildingClass(i: number) {
    return this.$cell_buildingClass(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке  Класс объекта */
  private $item_buildingClass(i: number) {
    return this.$cell_buildingClass(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка  отапливаемые помещения
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_heatedStorageSpace(i: number) {
    return $(`tr#calculationRow27 td:nth-child(${4 + i}) input`);
  }
  // --------------------------------------------------
  // ----------- Экономические характеристики	---------
  // --------------------------------------------------
  /** Ячейка Коммунальные платежи для аналога
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_includeUtilities(i: number) {
    return $(`tr#calculationRow30 td:nth-child(${4 + i}) div[class^="btn-group"]`);
  }
  /** выпадашка Коммунальные платежи */
  private $dropdown_includeUtilities(i: number) {
    return this.$cell_includeUtilities(i).$(`ul:nth-child(2)`);
  }
  /** Первый пункт в списке Коммунальные платежи */
  private $item_includeUtilities(i: number) {
    return this.$cell_includeUtilities(i).$(`ul li:nth-child(2)`);
  }
  /** Ячейка  Ставка арендной платы
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_pricePerMeter(i: number) {
    return $(`tr#calculationRow31 td:nth-child(${6 + i}) input`);
  }
  /** Ячейка  Цена предложения
   *
   * @param i - номер аналога начиная с 0
   */
  private $cell_price(i: number) {
    return $(`tr#calculationRow30 td:nth-child(${6 + i}) input`);
  }
  // ---------------------------------------------------------------------------
  //                                Функции
  // ---------------------------------------------------------------------------

  private FillAnalogOfferDate(date, analogsCount) {
    for (let i = 0; i < analogsCount; i++) {
      debugLogging(`Заполняем поле ДАТА ПРЕДЛОЖЕНИЯ у аналога №${i}`);
      let target = this.$cell_offerDate(i);
      target.waitForEnabled();
      target.clearValue();
      target.click();
      // target.setValue(date);

      let datapicker = this.$$datapicker_today()[i];
      datapicker.waitForDisplayed({ timeout: 5000 });
      // datapicker.waitForClickable({reverse: false});
      datapicker.click();
      browser.waitUntil(() => target.getValue() !== "", {
        timeout: 10000,
        timeoutMsg: `Не удалось установить дату у аналога ${i}.`,
      });
      browser.keys("Tab");
    }
  }
  private FillAnalogAddress(address, analogsCount) {
    for (let i = 0; i < analogsCount; i++) {
      debugLogging(`Заполняем поле АДРЕС у аналога №${i}`);
      let target = this.$cell_address()[i];
      target.waitForEnabled();
      do {
        browser.pause(500);
        target.click();
        target.clearValue();
        target.setValue(address);
        // this.waitForSendData();
        // browser.pause(1000);
      } while (target.getValue() !== address);
      browser.waitUntil(() => target.getValue() === address);
    }
  }
  private FillAnalogLocalityStatus(analogsCount) {
    // Статус населенного пункта
    for (let i = 0; i < analogsCount; i++) {
      this.setLocalityStatus(i);
      browser.pause(300);
    }
    /* for (let i = 0; i < analogsCount; i++) {
      this.$cell_localityStatus(i).waitForEnabled();
      this.$cell_localityStatus(i).click();
      this.$dropdown_localityStatus(i).waitForDisplayed({timeout: 1000, reverse: false});
      this.$item_localityStatus(i).click();
      browser.pause(300);
      // this.waitForSendData();
      if (this.$dropdown_localityStatus(i).isDisplayed()) {
        this.$cell_localityStatus(i).click();
      }
      browser.waitUntil(
        () =>
          this.$cell_localityStatus(i)
            .$("button")
            .getAttribute("title") !== "Не выбрано"
      );
    } */
  }
  /** Функция заполнения Местоположения в Доходном расчетнике
   *
   * @param n - количество аналогов
   */
  fillData(n: number, data: IOneBuildIn) {
    n = n < 3 ? 3 : n;
    this.FillAnalogOfferDate(data.offerDate, n);
    this.FillAnalogAddress(data.location.address, n);
    this.FillAnalogLocalityStatus(n);

    // Местонахождение в пределах города
    for (let i = 0; i < n; i++) {
      this.$cell_locationWithinLocality(i).waitForEnabled();
      this.$cell_locationWithinLocality(i).click();
      this.$dropdown_locationWithinLocality(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_locationWithinLocality(i).click();
      this.waitForSendData();
      if (this.$dropdown_locationWithinLocality(i).isDisplayed()) {
        this.$cell_locationWithinLocality(i).click();
      }
      browser.waitUntil(
        () =>
          this.$cell_locationWithinLocality(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // Линия домов
    for (let i = 0; i < n; i++) {
      this.$cell_buildingLine(i).waitForEnabled();
      this.$cell_buildingLine(i).click();
      this.$dropdown_buildingLine(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_buildingLine(i).click();
      this.waitForSendData();
      if (this.$dropdown_buildingLine(i).isDisplayed()) {
        this.$cell_buildingLine(i).click();
      }
      browser.waitUntil(
        () => this.$cell_buildingLine(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // Доступ к объекту
    for (let i = 0; i < n; i++) {
      if (browser.getUrl().includes("tab=SALE")) {
        this.$cell_objectAccessSale(i).waitForEnabled();
        this.$cell_objectAccessSale(i).click();
        this.$dropdown_objectAccessSale(i).waitForDisplayed({ timeout: 1000, reverse: false });
        this.$item_objectAccessSale(i).click();
        this.waitForSendData();
        if (this.$dropdown_objectAccessSale(i).isDisplayed()) {
          this.$cell_objectAccessSale(i).click();
        }
        browser.waitUntil(
          () => this.$cell_objectAccessSale(i).$("button").getAttribute("title") !== "Не выбрано"
        );
      } else {
        this.$cell_objectAccess(i).waitForEnabled();
        this.$cell_objectAccess(i).click();
        this.$dropdown_objectAccess(i).waitForDisplayed({ timeout: 1000, reverse: false });
        this.$item_objectAccess(i).click();
        this.waitForSendData();
        if (this.$dropdown_objectAccess(i).isDisplayed()) {
          this.$cell_objectAccess(i).click();
        }
        browser.waitUntil(
          () => this.$cell_objectAccess(i).$("button").getAttribute("title") !== "Не выбрано"
        );
      }
    }
    for (let i = 0; i < n; i++) {
      // Площадь
      this.$cell_total(i).waitForEnabled();
      this.$cell_total(i).click();
      do {
        this.$cell_total(i).setValue(data.physical.total);
        this.waitForSendData();
        browser.pause(1000);
      } while (this.$cell_total(i).getValue() != data.physical.total);
      browser.waitUntil(() => this.$cell_total(i).getValue() == data.physical.total);
    }
    // Материал стен
    for (let i = 0; i < n; i++) {
      this.$cell_walls(i).waitForEnabled();
      this.$cell_walls(i).click();
      this.$dropdown_walls(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_walls(i).click();
      this.waitForSendData();
      if (this.$dropdown_walls(i).isDisplayed()) {
        this.$cell_walls(i).click();
      }
      browser.waitUntil(
        () => this.$cell_walls(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // В том числе: подвал, кв.м
    for (let i = 0; i < n; i++) {
      this.$cell_floorDetails(i).waitForEnabled();
      this.$cell_floorDetails(i).click();
      do {
        this.$cell_floorDetails(i).setValue(data.physical.floorDetails);
        this.waitForSendData();
        browser.pause(1000);
      } while (this.$cell_floorDetails(i).getValue() != data.physical.floorDetails);
      browser.waitUntil(() => this.$cell_floorDetails(i).getValue() == data.physical.floorDetails);
    }
    // Состояние отделки, в том числе:
    for (let i = 0; i < n; i++) {
      this.$cell_repairs(i).waitForEnabled();
      this.$cell_repairs(i).click();
      this.$dropdown_repairs(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_repairs(i).click();
      this.waitForSendData();
      if (this.$dropdown_repairs(i).isDisplayed()) {
        this.$cell_repairs(i).click();
      }
      browser.waitUntil(
        () => this.$cell_repairs(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // Парковка
    for (let i = 0; i < n; i++) {
      this.$cell_parking(i).waitForEnabled();
      this.$cell_parking(i).click();
      this.$dropdown_parking(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_parking(i).click();
      this.waitForSendData();
      if (this.$dropdown_parking(i).isDisplayed()) {
        this.$cell_parking(i).click();
      }
      browser.waitUntil(
        () => this.$cell_parking(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // Класс объекта
    for (let i = 0; i < n; i++) {
      this.$cell_buildingClass(i).waitForEnabled();
      this.$cell_buildingClass(i).click();
      this.$dropdown_buildingClass(i).waitForDisplayed({ timeout: 1000, reverse: false });
      this.$item_buildingClass(i).click();
      this.waitForSendData();
      if (this.$dropdown_buildingClass(i).isDisplayed()) {
        this.$cell_buildingClass(i).click();
      }
      browser.waitUntil(
        () => this.$cell_buildingClass(i).$("button").getAttribute("title") !== "Не выбрано"
      );
    }
    // отапливаемые помещения
    for (let i = 0; i < n; i++) {
      this.$cell_heatedStorageSpace(i).waitForEnabled();
      this.$cell_heatedStorageSpace(i).click();
      do {
        this.$cell_heatedStorageSpace(i).setValue(data.physical.heatedStorageSpace);
        this.waitForSendData();
        browser.pause(1000);
      } while (this.$cell_heatedStorageSpace(i).getValue() != data.physical.heatedStorageSpace);
      browser.waitUntil(
        () => this.$cell_heatedStorageSpace(i).getValue() == data.physical.heatedStorageSpace
      );
    }
    if (!browser.getUrl().includes("tab=SALE")) {
      // Коммунальные платежи
      for (let i = 0; i < n; i++) {
        this.$cell_includeUtilities(i).waitForEnabled();
        this.$cell_includeUtilities(i).click();
        this.$dropdown_includeUtilities(i).waitForDisplayed({ timeout: 1000, reverse: false });
        this.$item_includeUtilities(i).click();
        this.waitForSendData();
        if (this.$dropdown_includeUtilities(i).isDisplayed()) {
          this.$cell_includeUtilities(i).click();
        }
        browser.waitUntil(
          () => this.$cell_includeUtilities(i).$("button").getAttribute("title") !== "Не выбрано"
        );
      }
      // Ставка арендной платы
      for (let i = 0; i < n; i++) {
        this.$cell_pricePerMeter(i).waitForEnabled();
        this.$cell_pricePerMeter(i).click();
        do {
          this.$cell_pricePerMeter(i).setValue(data.pricePerMeter);
          this.waitForSendData();
          browser.pause(1000);
        } while (this.$cell_pricePerMeter(i).getValue() != data.pricePerMeter);
        browser.waitUntil(() => this.$cell_pricePerMeter(i).getValue() == data.pricePerMeter);
      }
    }
    if (browser.getUrl().includes("tab=SALE")) {
      for (let i = 0; i < n; i++) {
        this.$cell_price(i).waitForEnabled();
        this.$cell_price(i).click();
        do {
          this.$cell_price(i).setValue(data.price);
          this.waitForSendData();
          browser.pause(1000);
        } while (this.$cell_price(i).getValue() != data.price);
        browser.waitUntil(() => this.$cell_price(i).getValue() == data.price);
      }
    }
  }
}
/** Расчётник Байкала одного встроенного помещения без ЗУ */
export const baikalCalcTemplateOneBuildIn = new BaikalCalculationTemplateOneBuildIn();
