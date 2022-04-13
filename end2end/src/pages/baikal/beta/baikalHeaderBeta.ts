import { baikalRightPanelBetaComparables } from "./rightPanelBeta";
import { BaikalEnumHeader } from "../enums";
import { debugLogging } from "modules";

class BaikalHeaderBeta {
  //------------------------------------------------------ Геттеры -----------------------------------------------------

  get $header() {
    return browser.$(`//div[contains(@class, 'Header_root')]`);
  }

  get $copy_report_form() {
    return this.$header.$(`.//div[contains(@class, 'Header_copyReport')]`);
  }

  get $copy_report_input() {
    return this.$copy_report_form.$(`.//input[contains(@class, 'Header_copy_input')]`);
  }

  get $copy_report_button() {
    return this.$copy_report_form.$(`.//button`);
  }

  get $user_name() {
    return this.$header.$(`.//div[@class="Header_username_hruLd"]`);
  }

  get $logout() {
    return this.$header.$(`.//i[contains(@class, "Header_logout")]`);
  }

  //----------------------------------------------- Методы ------------------------------------------------------------

  goToSection(section: BaikalEnumHeader) {
    let target = this.$header.$(`a=${section}`);
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Раздел ${section} в хидере не кликабельный.`,
    });
    target.click();
    debugLogging(`Кликнул по разделу ${section}`);
  }

  logout() {
    this.$logout.waitForClickable({
      timeoutMsg: `Кнопка logout-a в header-e Байкала не кликабельна`,
    });
    this.$logout.click();
    debugLogging(`Клик по кнопке logout-a`);
  }

  addAnalogsByRequestId(requestId: string) {
    this.$copy_report_input.setValue(requestId);
    this.$copy_report_button.click();

    browser.waitUntil(
      () => {
        let countrows = baikalRightPanelBetaComparables.$offers_short_list_table.$$("tr").length;
        return countrows >= 3;
      },
      {
        timeout: 10000,
      }
    );
  }
}

export const baikalHeaderBeta = new BaikalHeaderBeta();
