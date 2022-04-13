import { debugLogging } from "modules";
import options from "../../options";

class KronaLoginPage {
  path = "/login";
  /** поле ввода Логина */
  private get $input_login(): WebdriverIO.Element {
    return browser.$("#username");
  }
  /** Поле ввода пароля */
  private get $input_password(): WebdriverIO.Element {
    return browser.$("#password");
  }
  /** Кнопка "Войти" */
  private get $button_login(): WebdriverIO.Element {
    return browser.$("button[type='submit']");
  }
  /** Чекбокс "Запомнить меня" */
  get $checkbox_rememberMe(): WebdriverIO.Element {
    return browser.$("#remember-me");
  }
  /** Кнопка "Сбросить пароль" */
  get $button_resetPassword(): WebdriverIO.Element {
    return browser.$(`a.btn.btn-primary`);
  }
  /** Модальное окно, связанное с НГ */
  private get $modal_popupNewYear(): WebdriverIO.Element {
    return browser.$(`div[class*="new-year"]`);
  }
  /** Закрытие модального окна, связанного с НГ */
  private get $button_popupNewYearClose(): WebdriverIO.Element {
    return this.$modal_popupNewYear.$(`a.new-year-popup-close`);
  }
  /** Модальное окно для сброса пароля */
  get $base_resetPasswordModal(): WebdriverIO.Element {
    return browser.$(`#decisionForm`);
  }
  get $resetPassword_modalTitle(): WebdriverIO.Element {
    return this.$base_resetPasswordModal.$(`h4.modal-title`);
  }
  /** Строка ввода  */
  get $resetPassword_userName(): WebdriverIO.Element {
    return this.$base_resetPasswordModal.$(`#passwordResetUsername`);
  }
  /** Сбросить пароль */
  get $resetPassword_buttonConfirm(): WebdriverIO.Element {
    return this.$base_resetPasswordModal.$(`#passwordReset`);
  }
  /** Сообщение "Неверное имя пользователя или пароль" */
  get $invalid_name_and_password(): WebdriverIO.Element {
    return browser.$(
      `//div[contains (@class, 'alert-danger')]/span[contains(text(), 'Неверное имя пользователя или пароль')]`
    );
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /**
   * Метод простого логина в Крону.
   * Передаём параметры и логинимся по ним.
   * После ввода данных метод ждёт что кнопка `Войти` пропадает с формы, иначе - ошибка.
   * @param login
   * @param password
   */
  login(login: string, password: string) {
    this.$input_login.setValue(login);
    this.$input_password.setValue(password);
    this.$button_login.scrollIntoView();
    this.$button_login.waitForClickable({
      timeoutMsg: `Кнопка логина в КРОНУ не кликабельна`,
    });
    this.$button_login.click();
    debugLogging(`Нажал кнопку логина в КРОНУ`);
    this.$button_login.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Не удалось залогиниться",
    });
    debugLogging(`Успешно залогинился в КРОНУ под пользователем ${login}`);
  }
  waitForLoad() {
    debugLogging(`Ожидание загрузки страницы авторизации в КРОНУ`);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null, {
      timeoutMsg: `Страница ${browser.getUrl()} не прогрузилась`,
    });
    this.$button_login.waitForClickable({
      timeoutMsg: "Кнопка 'Войти' не кликабельна",
    });
    debugLogging(`Страница авторизации в КРОНУ успешно загрузилась`);
  }
  open() {
    browser.url(options.krona.host + this.path);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);

    debugLogging("Тестируемся на", options.krona.host);
    this.waitForLoad();
    if (this.$modal_popupNewYear.isDisplayed()) this.$button_popupNewYearClose.click();
  }

  open_on_base_url(krona_url: string) {
    browser.url(krona_url + this.path);
    this.waitForLoad();
  }
  /**
   * Функция сброса пароля
   *
   * @param username - имя пользователя в системе
   */
  resetPassword(username: string) {
    this.$button_resetPassword.waitForClickable();
    this.$button_resetPassword.click();
    this.$base_resetPasswordModal.waitForDisplayed({});
    this.$resetPassword_userName.setValue(username);
    this.$resetPassword_buttonConfirm.waitForClickable();
    this.$resetPassword_buttonConfirm.click();

    browser.waitUntil(
      function () {
        return browser.isAlertOpen();
      },
      { timeout: 10000 }
    );
    debugLogging("Текст уведомления", browser.getAlertText());
    browser.acceptAlert();

    this.$button_login.waitForClickable();
  }
}

/** Страница Логина */
export const kronaLoginPage = new KronaLoginPage();
