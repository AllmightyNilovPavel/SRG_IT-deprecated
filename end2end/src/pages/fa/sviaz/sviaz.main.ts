import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class SviazOcenka {
  path = `ocenka-sviazbank.srg-test.ru`;

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
    return browser.$(`div[class*="Auth_actions"] > button[class*="authButton"]`);
  }
  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }

  open() {
    browser.url(FaHostNameResolver(SiteList.SVIAZBANK));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
}
/** Сайт Связь Банк */
export const sviazOcenka = new SviazOcenka();
