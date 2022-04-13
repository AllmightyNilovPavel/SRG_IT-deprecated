import { BaAnalogDataField } from "../../enums";
import { BaResidentialReportPartAnalogsFunctionsGetters } from "./ba.residential.report.part.analogs.functions.getters";

/**
 * Класс с описанием функций работы с _аналогами отчёта_
 *
 * @includes `BaResidentialReportPartAnalogs | BaResidentialReportPartAnalogsFunctionsGetters`
 * * Копирование данных
 * ** из объекта оценки для __первого аналога__
 * ** из предыдущего аналога для __аналогов с 2 по 5__
 * * Очистка
 * * Заполнение полей аналогов
 */
export class BaResidentialReportPartAnalogsFunctionsSetters extends BaResidentialReportPartAnalogsFunctionsGetters {
  /**
   * Функция копирования данных аналога.
   * * _Для первого аналога_ - копировани данных из __Объекта оценки__
   * * _Для аналогов с 2 по 5_ - копирование данных из __предыдущего аналога__
   *
   * @param analogToBeFilled - номер аналога.
   */
  copyAnalogData(analogToBeFilled: number) {
    let realAnalogNumber = analogToBeFilled - 1;
    let buttonCopy = this.$head.$(`a#copy${realAnalogNumber}`);

    // this.$root.scrollIntoView();
    buttonCopy.scrollIntoView({ block: "center", inline: "center" });
    buttonCopy.waitForDisplayed({});
    // browser.debug();
    buttonCopy.click();
  }
  /**
   * Функция очистки данных аналога.
   *
   * @param analogToBeCleared - номер аналога.
   */
  clearAnalog(analogToBeCleared: number) {
    let realAnalogNumber = analogToBeCleared - 1;
    let buttonClear = this.$head.$(`#${realAnalogNumber}`);

    buttonClear.scrollIntoView();
    buttonClear.waitForClickable();
    buttonClear.click();

    browser.waitUntil(
      () => this.getAnalogTextData(realAnalogNumber, BaAnalogDataField.CITY) === null
    );
  }
  /**
   * Функция заполнения конкретного поля аналога
   *
   * @param analogNumber - номер аналога
   * @param dataToSet - данные которыми надо заполнить поле
   * @param analogDataType -
   * @param customAnalogDataType
   */
  setAnalogTextData(
    analogNumber: number,
    dataToSet: string,
    analogDataField: BaAnalogDataField
    // customAnalogDataType?: string
  ) {
    // if (analogDataField === null && customAnalogDataType === null)
    //   throw new Error("Не указаны поля для записи");
    // else if (analogDataField !== null && customAnalogDataType !== null)
    //   throw new Error("Не могут быть указаны несколько полей для записи");
    // else {
    $$(`//*[@id="comparables"]//td[contains(text(),'${analogDataField}')]/..//input`)[
      analogNumber - 1
    ].setValue(dataToSet);
    // }
  }

  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab6"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
