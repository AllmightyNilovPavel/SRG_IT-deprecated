import * as krona from "pages/Krona";

class KronaImpersonatePage {
  path = "/9r/user/impersonate";

  get $login_input() {
    return $("#user-login");
  }

  get $login_button() {
    return $("#btnSend");
  }

  // --------------------------------------------------------------------
  /** Функция ожидания прогрузки страницы */
  waitForLoad(iterations?: number) {
    this.$login_input.waitForDisplayed();
  }

  login(expertLogin: string) {
    this.$login_input.setValue(expertLogin);
    this.$login_button.click();
    krona.kronaNavigationBar.waitForLoad();
  }
}

/** Страница "Войти под другим сотрудником" */
export const kronaImpersonatePage = new KronaImpersonatePage();
