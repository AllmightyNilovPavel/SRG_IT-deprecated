import options from "../../../options";

class BaLoginPage {
  path = "/login.html";

  private get $form_login() {
    return $(`div.login-form`);
  }
  get $input_login() {
    return this.$form_login.$(`input#authEmail`);
  }
  get $input_password() {
    return this.$form_login.$(`input#authPassword`);
  }
  get $button_login() {
    return this.$form_login.$(`a#login`);
  }
  private get $modal_popupFacebook() {
    return $(`#facebook-popup-modal`);
  }
  private get $button_popupFacebookClose() {
    return this.$modal_popupFacebook.$(`button`);
  }
  private get $modal_popupNewYear() {
    return $(`div[class*="new-year"]`);
  }
  private get $button_popupNewYearClose() {
    return this.$modal_popupNewYear.$(`a.new-year-popup-close`);
  }

  login(login: string, password: string) {
    if (this.$form_login.isExisting()) {
      this.$input_login.scrollIntoView();
      this.$input_login.clearValue();
      this.$input_login.setValue(login);

      this.$input_password.scrollIntoView();
      this.$input_password.clearValue();
      this.$input_password.setValue(password);

      this.$button_login.scrollIntoView();
      this.$button_login.waitForEnabled();
      this.$button_login.click();
    } else this.waitForLoad();
    // this.$input_login.waitForDisplayed({timeout: 5000, reverse: true, timeoutMsg: "Не удалось залогиниться"});
  }
  private closeFacebookPopup() {
    if (this.$modal_popupFacebook.isDisplayed()) {
      console.log(`обнаружено уведомление Facebook`);
      this.$button_popupFacebookClose.waitForClickable();
      this.$button_popupFacebookClose.click();
      this.$modal_popupFacebook.waitForDisplayed({ timeout: 5000, reverse: true });
      return true;
    } else return false;
  }
  private closeNewYearPopup() {
    if (this.$modal_popupNewYear.isDisplayed()) {
      console.log(`обнаружено уведомление Нового Года`);
      this.$button_popupNewYearClose.waitForClickable();
      this.$button_popupNewYearClose.click();
      return true;
    } else return false;
  }
  waitForLoad(customTimeout?: number) {
    browser.refresh();
    let tempTimeout = customTimeout ? customTimeout : 50000;
    this.$form_login.waitForExist({
      timeout: tempTimeout,
      timeoutMsg: `Поле ввода логина недоступно на странице ${browser.getUrl()} по истечение ${
        tempTimeout / 1000
      } сек`,
    });

    while (this.closeFacebookPopup());
    while (this.closeNewYearPopup());
    this.$input_login.waitForDisplayed({});
    this.$input_login.waitForClickable();
  }
  open() {
    browser.url(options.ba.host + this.path);
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);

    console.log("Тестируемся на", options.ba.host);
    console.log(`Текущая страница - `, browser.getUrl());

    this.waitForLoad();
  }
}

export const baLoginPage = new BaLoginPage();
