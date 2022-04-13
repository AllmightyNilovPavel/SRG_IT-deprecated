export class BaikalAuth {
  // -------------------------------------------------- Геттеры --------------------------------------------------------

  /** Корневой элемент формы аутенфикации */
  get $login_form() {
    return browser.$(`//div[contains(@class, "LoginForm_root")]`);
  }
  /** Поле для ввода логина */
  get $input_login() {
    return this.$login_form.$(`.//input[@id="username"]`);
  }
  /** Поле для ввода пароля */
  get $input_password() {
    return this.$login_form.$(`.//input[@id="password"]`);
  }
  /** Кнопка "Войти" */
  get $login_button() {
    return this.$login_form.$(`.//button[contains(@class, "LoginForm_primaryButton")]`);
  }
  /** Сообщение, которое показывается пользователю при НЕ успешной авторизации */
  get $unsuccessful_message() {
    return this.$login_form.$(
      `.//span[@class='ant-alert-message' and contains(text(), 'Не удалось войти')]`
    );
  }

  //--------------------------------------------------- Методы ---------------------------------------------------------

  /**  Авторизация в Байкал beta.
   * В случаях, когда тесты КРОНы запущены на стенде duo
   * форма для авторизации в Байкал beta не появляется.
   *
   * @param login - Имя пользователя
   * @param password - Пароль
   */
  loginInBeta(login: string, password: string) {
    console.log(`Зашел в функцию логина в бету`);
    try {
      this.$input_login.waitForDisplayed({
        timeout: 5000,
      });
    } catch (e) {
      console.log(`Форма для авторизации в Байкал beta не появиилась`);
    }
    if (this.$input_login.isDisplayed()) {
      this.$input_login.waitForClickable({
        timeoutMsg: `При входе в Байкал beta поле для ввода логина не кликабельно.`,
      });
      this.$input_login.setValue(login);
      this.$input_password.setValue(password);
      this.$login_button.scrollIntoView();
      this.$login_button.waitForClickable({
        timeoutMsg: `При входе в Байкал beta кнопка 'Войти' не кликабельна.`,
      });
      this.$login_button.click();
      console.log(`Авторизовался в Байкал-beta под пользователем ${login}`);
    }
  }

  waitForLoad() {
    this.$input_login.waitForDisplayed({
      timeoutMsg: `Форма логина не отображается на экране`,
    });
    this.$input_login.waitForClickable({
      timeoutMsg: `Форма логина не кликабельна`,
    });
  }
}

export const baikalAuth = new BaikalAuth();
