import { BaikalLeftPanelBetaBase } from "./baikalLeftPanelBetaBase";

/** Класс описывает раздел "Аналоги" из левой панели Байкала. */
export class BaikalLeftPanelBetaComparables extends BaikalLeftPanelBetaBase {
  /** Корневой элемент компонента "Аналоги". */
  get $offers_short_list_root(): WebdriverIO.Element {
    return this.$left_panel.$(`.//div[contains(@class, 'OfferShortList_root')]`);
  }

  waitForLoad() {
    this.$offers_short_list_root.waitForExist({
      timeoutMsg: `Раздел "Аналоги" из левой панели Байкала отображается в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Аналоги" из левой панели Байкала. */
export const baikalLeftPanelBetaComparables = new BaikalLeftPanelBetaComparables();
