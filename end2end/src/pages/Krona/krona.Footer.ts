import { MenuTypes } from "./Enums";

class KronaFooter {
  private get root() {
    return $(`div.footer`);
  }

  /** Ссылка на создание письма админу компании */
  get $link_sendMail() {
    return this.root.$(`a[href*="mailto"]`);
  }
  /** Кнопка перехода в новое меню */
  get $button_switchToNewMenu() {
    return this.root.$(`#btnThymeleaf`);
  }
  /** Кнопка перехода в старое меню */
  get $button_switchToOldMenu() {
    return this.root.$(`#btnReact`);
  }
  private get $button_currentMenuType() {
    return this.root.$(`button[onclick^="changeMenuType"]`);
  }
  get $textSupportPhoneNumber() {
    return $(`//div[@class='info-block']/i[@class='fa fa-phone icon']/..`);
  }
  // -----------------------------------------------------------
  waitForLoad() {
    this.root.waitForExist({
      timeout: 5000,
      timeoutMsg: `Футер ("div.footer") не существует на странице ${browser.getUrl()}`,
    });
    this.root.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Футер ("div.footer") не отрисовался на странице ${browser.getUrl()}`,
    });
  }
  switchMenuType(menu: MenuTypes): boolean {
    let currentButton: string;
    this.root.waitForExist();
    this.root.scrollIntoView();

    currentButton = this.$button_currentMenuType.getAttribute("id");
    // console.log("Текущее значение кнопки перехода на другое меню: ", currentButton);
    if (menu === currentButton) return false;
    else if (menu === MenuTypes.NEW) {
      console.log("Переключаемся на новое меню");
      this.$button_switchToNewMenu.waitForClickable();
      this.$button_switchToNewMenu.click();
      this.$button_switchToOldMenu.waitForExist({ timeout: 20000, reverse: false });
      return true;
    } else if (menu === MenuTypes.OLD) {
      console.log("Переключаемся на старое меню");
      this.$button_switchToOldMenu.waitForClickable();
      this.$button_switchToOldMenu.click();
      this.$button_switchToNewMenu.waitForExist({ timeout: 20000, reverse: false });
      return true;
    }
    return false;
  }
}
/** Нижнее меню */
export const kronaFooter = new KronaFooter();
