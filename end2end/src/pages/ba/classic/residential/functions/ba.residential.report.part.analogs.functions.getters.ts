import { BaAnalogDataField } from "../../enums";
import { BaResidentialReportPartAnalogs } from "../declarations/ba.residential.report.part.analogs";

/**
 * Класс содержащий функции для получения данных полей аналогов.
 *
 * @includes `BaResidentialReportPartAnalogs`
 */
export class BaResidentialReportPartAnalogsFunctionsGetters extends BaResidentialReportPartAnalogs {
  /**
   * Функция получения данных из инфо-полей аналогов
   *
   * @param analogNumber - номер аналога
   * @param analogDataType - наименование данных которые надо получить
   * @param customAnalogDataType - если требуется получить данные из нестандартного поля
   * @returns текст содержащийся в указанном поле
   */
  getAnalogTextData(analogNumber: number, analogDataType?: BaAnalogDataField): string {
    let realAnalogNumber = analogNumber - 1;
    // if (analogDataType === null && customAnalogDataType === null)
    //   throw new Error("Не указаны данные для получения");
    // else if (analogDataType !== null && customAnalogDataType !== null)
    //   throw new Error("Не могут быть указаны несколько полей данных для получения");
    // else     {
    let AnalogTextData: string;

    if (analogDataType === BaAnalogDataField.REPAIR_STATE) {
      AnalogTextData = $$(
        `//*[@id="comparables"]//td[contains(text(),"${analogDataType}")]/..//select`
      )[realAnalogNumber].getValue();
    } else {
      AnalogTextData = $$(
        `//*[@id="comparables"]//td[contains(text(),"${analogDataType || ""}")]/..//input`
      )[realAnalogNumber].getValue();
    }

    return AnalogTextData;
    // }
  }
}
