import { debugLogging } from "modules";
import { BaikalEnumRightPanelButtons } from "../../enums";

/** Базовый класс, описывающий общие компоненты/методы из правой панели Байкала. */
export class BaikalRightPanelBetaBase {
  protected get $right_panel(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class,'Panel_right')]`);
  }
  protected get $right_panel_menu(): WebdriverIO.Element {
    return this.$right_panel.$(`.//div[contains(@class,'Panel_menu')]`);
  }

  /** Перейти в раздел из правой панели */
  goToSectionFromRightMenu(section: BaikalEnumRightPanelButtons) {
    let target: WebdriverIO.Element;
    target = this.$right_panel_menu.$(`.//div[contains(text(), "${section}")]`);

    if (target.getAttribute("class").match("Panel_active") === null) {
      target.waitForClickable({
        timeoutMsg: `Не удается кликнуть по разделу ${section} из правой панели.`,
      });
      target.click();
      browser.waitUntil(() => target.getAttribute("class").match("Panel_active") != null, {
        timeoutMsg: `Раздел ${section} из правой панели не открылся.`,
      });
      debugLogging(`Перешел в раздел ${section} из правой панели`);
    } else debugLogging(`Раздел ${section} уже открыт.`);
  }

  closeSectionFromRightMenu(section: BaikalEnumRightPanelButtons) {
    let target: WebdriverIO.Element;
    target = this.$right_panel_menu.$(`.//div[contains(text(), "${section}")]`);

    if (target.getAttribute("class").match("Panel_active") !== null) {
      target.waitForClickable({
        timeoutMsg: `Не удается кликнуть по разделу ${section} из правой панели.`,
      });
      target.click();
      browser.waitUntil(() => target.getAttribute("class").match("Panel_active") === null, {
        timeout: 20000,
        timeoutMsg: `Раздел ${section} из правой панели не закрылся.`,
      });
      debugLogging(`Закрыл раздел ${section} из правой панели`);
    } else debugLogging(`Раздел ${section} уже закрыт.`);
  }
}
