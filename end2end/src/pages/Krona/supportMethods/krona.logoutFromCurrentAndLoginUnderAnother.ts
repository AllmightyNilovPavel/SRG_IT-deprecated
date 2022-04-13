import { kronaLoginPage, kronaNavigationBar } from "pages/Krona/index";

/** Последовательность действий:
 * Логаут с текущего пользователя в КРОНЕ
 * Ожидание загрузки страницы логина
 * Логин в КРОНУ под пользователем
 *
 * @param login - логин пользователя, под которым будет логин в КРОНУ
 * @param password - пароль пользователя, под которым будет логин в КРОНУ
 */
export function kronaLogoutFromCurrentAndLoginUnderAnother(login: string, password: string) {
  kronaNavigationBar.logout();
  kronaLoginPage.waitForLoad();
  kronaLoginPage.login(login, password);
  kronaNavigationBar.waitForLoad();
}
