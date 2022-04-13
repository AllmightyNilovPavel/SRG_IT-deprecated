import { baReportPage } from "../classic";
import { ReportTypeName } from "./enums/react.enum.reportTypeName";

export class ReactHeader {
  /** Основа шапки  */
  get $header_root() {
    return browser.$(`[class*="Header_root"]`);
  }
  /** Логотип БО */
  get $header_logo() {
    return this.$header_root.$(`href="/reports/"`);
  }
  /** Кнопка "Новый отчёт" */
  private get $button_newReport() {
    return this.$header_root.$(`div[class*=newReport]`);
  }
  /** окно с выбором типа отчёта для создания */
  private get $modal_selectReportTypeForCreation() {
    return browser.$(`div[class*="Header_newReportModal"]`);
  }
  private get $modal_selectReportTypeBlock() {
    return this.$modal_selectReportTypeForCreation.$(`div.actions`);
  }
  private get $$modal_availableReportTypes() {
    return this.$modal_selectReportTypeBlock.$$(`button`);
  }

  /** Кнопка "Пополнить счет" */
  get $button_fundAccount() {
    return this.$header_root.$(`div[class*=billUp]`);
  }
  /** Кнопка \имя пользователя\ */
  get $button_userSettings() {
    return this.$header_root.$(`href="/my_user.html"`);
  }
  /** Кнопка "Выход" */
  get $button_logout() {
    return this.$header_root.$(`title="Выход"`);
  }

  /**  */
  private selectReportType(reportType: ReportTypeName) {
    let buttonsArray: string[] = [];
    // Складываем текст каждой кнопки в массив
    this.$$modal_availableReportTypes.forEach((element, index) => {
      buttonsArray[index] = element.getText();
      console.log(`Массив кнопок ${buttonsArray.join(", ")}`);
    });
    // ищем совпадение текста кнопки с текстом переданном в параметре
    let buttonsCount: number = buttonsArray.length;
    for (let i = 0; i < buttonsCount; i++) {
      if (buttonsArray[i] === reportType) {
        console.log(`Нашли нужную кнопку`);
        return this.$$modal_availableReportTypes[i].click();
      }
      console.log(`Не нашли нужную кнопку. Идём дальше.`);
    }
  }

  createNewReport(reportType: ReportTypeName) {
    this.$button_newReport.click();
    this.$modal_selectReportTypeForCreation.waitForDisplayed({ timeout: 5000 });
    console.log(`Переходим в цикл поиска нужного типа отчёта`);
    this.selectReportType(reportType);
    console.log(`Вышли из цикла`);
    baReportPage.waitForLoad(); // ждём открытия страницы. Пока классической
  }
}
/** Шапка БО для страниц реакта */
export const reactHeader = new ReactHeader();
