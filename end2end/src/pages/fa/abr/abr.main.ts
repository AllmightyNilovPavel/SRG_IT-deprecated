import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";

class AbrOcenka {
  path = `abr-ocenka.srg-test.ru`;

  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  }

  /** Кнопка "Личный кабинет" */
  public get $button_userCabinet() {
    return browser.$("//span[@id='profileLink']");
  }

  /** Кнопка "оценка недвижимости" */
  public get $button_Realty() {
    return browser.$(`#creditOrderLink`);
  }

  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }
  open() {
    browser.url(FaHostNameResolver(SiteList.ABR));
  }

  /** кнопка "Войти" */
  public get $button_auth() {
    return browser.$("//button[@id='authButton']");
  }

  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }
}
/** Сайт Банк России */
export const abrOcenka = new AbrOcenka();
