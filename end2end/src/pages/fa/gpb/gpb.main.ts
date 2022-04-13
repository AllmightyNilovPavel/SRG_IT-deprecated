import options from "options/index";
import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class GpbOcenka {
  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  }
  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return browser.$(`a[href="/order/"]`);
  }
  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return $(`//button[@id='authButton']`);
  }
  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }
  get $buttonCreditOrderLink() {
    return $(`//a[@id='creditOrderLink']`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(FaHostNameResolver(SiteList.GAZPROM));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
}
/** Сайт ГПБ */
export const gpbOcenka = new GpbOcenka();
