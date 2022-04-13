import { BaikalEnumLeftPanelButtons } from "pages/baikal/enums";

/** Базовый класс, описывающий общие компоненты/методы из левой панели Байкала. */
export class BaikalLeftPanelBetaBase {
  protected get $left_panel(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class,'Panel_left')]`);
  }

  protected get $left_panel_menu(): WebdriverIO.Element {
    return this.$left_panel.$(`.//div[contains(@class,'Panel_menu')]`);
  }

  /** Перейти в раздел из левой панели */
  goToSectionFromLeftMenu(section: BaikalEnumLeftPanelButtons) {
    let target = this.$left_panel_menu.$(`//div[contains(text(), "${section}")]`);
    target.waitForClickable({
      timeoutMsg: `Не удается кликнуть по разделу ${section} из левой панели.`,
    });
    target.click();
  }
}
