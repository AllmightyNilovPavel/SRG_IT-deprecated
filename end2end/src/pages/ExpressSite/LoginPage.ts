import options from "options";

export class LoginPage {
  path = "/login";
  /** поле ввода Логина */
  get $input_login() {
    return browser.$(`input[name="j_username"]`);
  }
  /** Поле ввода пароля */
  get $input_password() {
    return $(`input[name="j_password"]`);
  }
  /** Кнопка "логин" */
  get $button_login() {
    return browser.$("form[name='f'] input[type='image']");
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  login(login: string, password: string) {
    this.$input_login.setValue(login);
    this.$input_password.setValue(password);
    this.$button_login.click();
  }
  waitForLoad() {
    this.$button_login.waitForExist();
  }
  open() {
    browser.url(options.ExpressSite.host_basic + this.path);
    this.waitForLoad();
  }
}

/** Страница Логина */
export const loginPage = new LoginPage();
