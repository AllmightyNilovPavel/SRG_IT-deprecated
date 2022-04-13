import { faUserCabinet } from "./fa.userCabinet";

import { SiteList } from "./enum/fa.enum.siteList";
import { FaHostNameResolver } from "./modules/fa.module.hostNameResolver";

export class FederalAppraiserMain {
  /**
   * Геттер для определения принадлежности сайта
   * определённому банку
   */
  private get $getBankAffilation() {
    return $(`//body`).getAttribute("class");
  }
  private get $root() {
    return $(`//div[@id='standardPageRoot']`);
  }

  private get $contentBlock() {
    return this.$root.$(`//div[@id='contentBlock']`);
  }
  private get $button_profileLink() {
    return this.$root.$(`#profileLink`);
  }
  private get $button_creditOrder() {
    return this.$contentBlock.$(`//div[@id='creditOrderLink']`);
  }
  private get $button_insurance() {
    return this.$contentBlock.$(`//div[@id='insuranceLink']`);
  }
  get $test() {
    return 1;
  }
  // --------------------------------------------------------------------------------
  private get $input_login() {
    return $(`#login`);
  }
  private get $input_password() {
    return $(`#password`);
  }
  private get $button_authButton() {
    return $(`#authButton`);
  }

  // --------------------------------------------------------------------------------
  /**
   * Метод который открывает сайт указанного банка
   * и возвращает признак принадлежности сайту
   * @param bank
   * @returns document.body.class
   */
  goToSite(bank: SiteList) {
    browser.url(FaHostNameResolver(bank));
    // this.$body.waitForExist({ timeout: 10000, reverse: false });
    this.$root.waitForExist({ timeout: 10000, reverse: false });
    return this.$getBankAffilation;
  }

  private input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({});
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }

  goToUserCabinet(login: string[], password: string) {
    if (this.$button_profileLink.isDisplayed()) {
      this.$button_profileLink.waitForClickable();
      this.$button_profileLink.scrollIntoView();
      this.$button_profileLink.click();

      this.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
      this.input_login(login);
      this.$button_authButton.scrollIntoView();
      this.$button_authButton.click();
      this.$input_password.waitForDisplayed({});
      this.$input_password.setValue(password);
      this.$button_authButton.scrollIntoView();
      this.$button_authButton.click();

      faUserCabinet.waitForLoad();
    } else if (this.$contentBlock.isDisplayed()) {
      this.$button_creditOrder.waitForClickable();
      this.$button_creditOrder.scrollIntoView();
      this.$button_creditOrder.click();

      this.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
      // this.$input_password.waitForDisplayed({timeout: 10000, reverse: false});
      this.input_login(login);
      if (this.$input_password.isDisplayed()) {
        this.$input_password.setValue(password);
        this.$button_authButton.scrollIntoView();
        this.$button_authButton.click();
      } else {
        this.$button_authButton.scrollIntoView();
        this.$button_authButton.click();
        this.$input_password.waitForDisplayed({});
        this.$input_password.setValue(password);
        this.$button_authButton.click();
      }

      faUserCabinet.waitForLoad();
    }
  }
}

export const faMain = new FederalAppraiserMain();
