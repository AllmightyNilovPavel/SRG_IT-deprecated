import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class ZalogOcenka {
  prefix = `zalog`;
  path = `zalog-ocenka.srg-it.ru`;

  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`a[class*="headerTitle"]`);
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
  /**
   * Функция перехода на сайт
   *
   * @param path - если параметр указан то будет осуществлён переход на этот хост,
   * иначе - на базовый `test.srg-test.ru`
   */
  open() {
    browser.url(FaHostNameResolver(SiteList.VTB));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({});
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}
/** Сайт ВТБ */
export const zalogOcenka = new ZalogOcenka();
