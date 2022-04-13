import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class AlfaOcenka {
  path = `https://ocenka-alfabank.srg-test.ru/`;

  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  }
  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return $(`a[href="/order/"]`);
  }
  /** Поле ввода логина */
  public get $input_login() {
    return $(`#login`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return $(`div[class*="Auth_actions"] > button[class*="authButton"]`);
  }
  /** поле ввода пароля */
  public get $input_password() {
    return $(`#password`);
  }

  get $buttonMakeOrder() {
    return $(`//button[@id='makeOrder']`);
  }
  get $inputFlatNumber() {
    return $(`//input[@id='flatNumber']`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(FaHostNameResolver(SiteList.ALFABANK));
  }
  waitForLoad() {
    this.$header_title.waitForDisplayed({ timeout: 1000, reverse: false });
    this.$button_userCabinet.waitForClickable();
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
}
/** Сайт Альфа */
export const alfaOcenka = new AlfaOcenka();
