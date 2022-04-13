import { kronaLoginPage, kronaNavigationBar } from "pages/Krona/index";

/** Последовательность действий:
 * Ожидание загрузки страницы логина
 * Логин в КРОНУ под пользователем
 * Ожидание загрузки страницы с меню КРОНЫ
 *
 * @param login - логин пользователя, под которым будет логин в КРОНУ
 * @param password - пароль пользователя, под которым будет логин в КРОНУ
 */
export function kronaLoginAndLoad(login: string, password: string) {
  kronaLoginPage.open();
  kronaLoginPage.login(login, password);
  kronaNavigationBar.waitForLoad();
}
