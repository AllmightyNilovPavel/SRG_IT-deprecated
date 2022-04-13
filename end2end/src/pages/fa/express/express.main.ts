import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class ExpressOcenka {
  private get $root() {
    return $(`//div[@id='root']/div[@id='standartPageRoot']`);
  }
  private get $header() {
    return this.$root.$(`//div[contains(@class,'headerWrapper')]`);
  }
  private get $contentBlock() {
    return this.$root.$(`//div[@id='contentBlock']`);
  }
  private get $footer() {
    return this.$root.$(`//div[@id='footer']`);
  }

  get $buttonCreditOrderLink() {
    return this.$contentBlock.$(`//a[@id='creditOrderLink']`);
  }
  get $buttonInsuranceLink() {
    return this.$contentBlock.$(`//a[@id='insuranceLink']`);
  }
  // ---------------------------------------------------------------------------
  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  }
  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return browser.$(`a[href="/credit/order/"]`);
  }
  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return browser.$(`div[class*="Auth_actions"] > button[class*="authButton"]`);
  }
  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }

  get $buttonMakeOrder() {
    return $(`//button[@id='makeOrder']`);
  }
  get $inputFlatNumber() {
    return $(`//input[@id='flatNumber']`);
  }
  // ---------------------------------------------------------------------------
  //                          Блок описания функций
  // ---------------------------------------------------------------------------
  open() {
    browser.url(FaHostNameResolver(SiteList.EXPRESS));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
  waitForLoad() {}
}
/** Сайт Экспресс */
export const expressOcenka = new ExpressOcenka();
