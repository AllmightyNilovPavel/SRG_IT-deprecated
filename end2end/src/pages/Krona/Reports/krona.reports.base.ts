import { RequestsBase } from "../Requests/krona.requests.base";

/**
 * Класс типа `PageObject` для работы со страницей
 * создания [нового запроса на верификацию](https://test.srg-it.ru/9r/report/flat/new)
 *
 * Здесь описаны функции работы только с блоком "Данные отчёта".
 * Для получения инфо о функциях работающих с другими блоками
 *
 * @link RequestsBase
 */
export class KronaReportsBase extends RequestsBase {
  private get $reports_root() {
    return $(`//h4[contains(text(),'Данные отчета')]/..`);
  }
  protected get $input_reportNumber() {
    return this.$reports_root.$(`#reportNumber`);
  }
  protected get $input_customerFullName() {
    return this.$reports_root.$(`#customerFulName`);
  }
  protected get $input_appraiserCompanyName() {
    return this.$reports_root.$(`#appraiserCompanyName`);
  }
  protected get $input_appraiserCompanyInn() {
    return this.$reports_root.$(`#appraiserCompanyInn`);
  }
  protected get $input_reportFileInput() {
    return this.$reports_root.$(`#file`);
  }

  /**
   * Функция заполнения строки `№ Отчёта об оценке`
   *
   * @param reportNumber
   */
  inputReportNumber(reportNumber: string) {
    let target = this.$input_reportNumber;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(reportNumber);
  }
  /**
   * Функция получения данных из поля "№ Отчёта об оценке"
   * @returns номер отчёта
   */
  getReportNumber(): string {
    let target = this.$input_reportNumber;
    target.scrollIntoView();
    target.waitForClickable();

    return target.getValue();
  }
  /**
   * Функция заполнения строки `ФИО Заёмщика`
   *
   * @param customerFullName
   */
  inputCustomerFullName(customerFullName: string) {
    let target = this.$input_customerFullName;
    target.scrollIntoView({ block: "center", inline: "center" });
    target.clearValue();
    target.setValue(customerFullName);
  }
  /**
   * Функция заполнения строки `Наименование ОК`
   *
   * @param appraiserCompanyName
   */
  inputReportAppraiserCompanyName(appraiserCompanyName: string) {
    let target = this.$input_appraiserCompanyName;
    target.scrollIntoView({ block: "center", inline: "center" });
    target.clearValue();
    target.setValue(appraiserCompanyName);
  }
  /**
   * Функция заполнения строки `ИНН ОК`
   *
   * @param AppraiserInn
   */
  inputReportAppraisercompanyInn(AppraiserInn: string) {
    let target = this.$input_appraiserCompanyInn;
    target.scrollIntoView({ block: "center", inline: "center" });
    target.clearValue();
    target.setValue(AppraiserInn);
  }
  /**
   * Функция загрузки файла отчёта.
   *
   * @param filePath ссылка на тестовый файл.
   * Все базовые типы файлов можно найти в директории `./src/test_files`
   */
  inputReportFile(filePath: string) {
    // let uploadedFilePath = browser.uploadFile(`./src/test_files/test.jpg`);
    let uploadedFilePath = browser.uploadFile(filePath);
    this.$input_reportFileInput.setValue(uploadedFilePath);
    // this.$loadedFile_fileSize.waitForDisplayed({timeout: 5000, reverse: false});
    // this.$loadedFileThumbnail.waitForExist({timeout: 5000, reverse: false});
    browser.pause(2000);
  }
}
