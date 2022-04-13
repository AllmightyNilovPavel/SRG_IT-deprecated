import { loginPage } from "pages/ExpressSite/LoginPage";

export class NavogationBar {
  get logoutButton() {
    return $('a[href="/ExpressSite/j_spring_security_logout"]');
  }

  logout() {
    this.logoutButton.click();
    loginPage.waitForLoad();
  }
  waitForLoad() {
    this.logoutButton.waitForExist();
  }
}

export const navigationBar = new NavogationBar();
