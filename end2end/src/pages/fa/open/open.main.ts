import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class OpenOcenka {
  prefix = `open`;
  path = `open-ocenka.srg-it.ru`;

  // get $siteBodyIdentifier() {
  // return $(`body`).getAttribute("class");
  //}
  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  } /** Кнопка "оценка недвижимости"" */
  public get $button_appraisal() {
    return browser.$("//a[@id='creditOrderLink']");
  }
  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return browser.$("//span[@id='profileLink']");
  }
  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return browser.$(
      `div[class*="AuthLiteMortgage_actions"] > button[class*="AuthLiteMortgage_authButton"]`
    );
  }
  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }

  //get $inputFlatNumber() {
  //  return $(`//input[@id='flatNumber']`);
  //}

  open() {
    browser.url(FaHostNameResolver(SiteList.OPENBANK));
  }
  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }
}
/** Сайт Открытия */
export const openOcenka = new OpenOcenka();
