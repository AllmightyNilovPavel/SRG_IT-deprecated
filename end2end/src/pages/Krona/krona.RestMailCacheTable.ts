import options from "options";
import { KronaEnumEmailsMailTitle } from "./Enums/EmailsData/krona.emails.mailTitle";

class KronaRestMailCacheTable {
  path = "/rest/mail/cache/table";

  private get $emailsTable() {
    // return $(`//table/tbody`)
    return $(`//table[@id='restMailCacheTable']/tbody`);
  }
  private get $emailInfo() {
    return this.$emailsTable.$(`//tr[@class='emailInfo']`);
  }

  /**
   * Метод который возвращает элемент если он был найден по шаблону поиска письма
   * по его ТЕМЕ (subject).
   * @param emailTitleSearchPattern
   * @returns WebdriverIO.Element
   */
  getEmailTitle(emailTitleSearchPattern: KronaEnumEmailsMailTitle): WebdriverIO.Element {
    let emailFoundByTitle: WebdriverIO.Element = this.$emailInfo.$(
      `//td[@class='emailSubject'${emailTitleSearchPattern}]`
    );
    console.log(
      `Текст тела найденного письма в формате HTML: ${emailFoundByTitle
        .$(`..//td[@class='emailTextHtml']`)
        .getText()}`
    );
    return emailFoundByTitle;
  }
  /**
   * Метод который возвращает текст целиком из тела письма в формате HTML.
   * TODO: Пока только пишет в консоль. Требуется доработка формата
   * @returns
   */
  getEmailBody(/* emailBodySearchPattern: KronaEnumEmailsMailBody */) {
    let emailText = this.$emailInfo.$(`//td[@class='emailTextHtml']`);
    console.log(`Текст искомого письма в формате HTML: ${emailText}`);
    // return this.$emailInfo.$(`//td[@class='' and contains(text(),'${emailBodySearchPattern}')]`)
    return;
  }
  open() {
    browser.url(options.krona.host + this.path);
    this.waitForLoad();
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
    this.$emailsTable.waitForExist();
    this.$emailsTable.waitForDisplayed();
  }
}

/**
 * Класс в котором описаны геттеры и методы
 * для работы с таблицей писем
 * @url /9r/rest/mail/cache/table
 */
export const kronaRestMailCacheTable = new KronaRestMailCacheTable();
