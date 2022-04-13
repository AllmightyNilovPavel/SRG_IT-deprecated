import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

export class UralsibOcenka {
  prefix = `ocenka`;
  path = `ocenka-uralsib.srg-it.ru`;

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
    return $(`#login`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return browser.$(`div[class*="Auth_actions"] > button[class*="authButton"]`);
  }
  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }
  // ---------------------------------------------------------------------------
  //                          Блок описания функций
  // ---------------------------------------------------------------------------
  open() {
    browser.url(FaHostNameResolver(SiteList.URALSIB));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
  waitForLoad() {
    this.$header_title.waitForExist();
    $(`//*[contains(text(),'УРАЛСИБ')]`).waitForExist({ timeout: 5000 });
  }
}
/** Сайт Уралсиб */
export const uralsibOcenka = new UralsibOcenka();
