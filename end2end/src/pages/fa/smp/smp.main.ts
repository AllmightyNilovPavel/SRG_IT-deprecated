import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class SmpOcenka {
  prefix = `smp`;
  path = `smp-ipoteka-ocenka.srg-test.ru`;

  /** Заголовок страницы */
  public get $header_title() {
    return $(`div[class*="BaseLayout_header"]`);
  }
  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return browser.$(`a[href="/credit/order/"]`);
  }
  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }
  /** Кнопка "отправить" */
  public get $button_send() {
    return browser.$(`div[class*="Auth_actions"] > button[class*="authButton"]`);
  }
  /** Поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }
  private get $table_makeOrder() {
    return $(`#makeOrder`);
  }
  public get $button_newOrder() {
    return this.$table_makeOrder.$(`button[class*="Index_link"]`);
  }
  // ---------------------------------------------------------------------------
  //                          Блок описания функций
  // ---------------------------------------------------------------------------
  open() {
    browser.url(FaHostNameResolver(SiteList.SMP));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
}
/** Сайт СМП */
export const smpOcenka = new SmpOcenka();
