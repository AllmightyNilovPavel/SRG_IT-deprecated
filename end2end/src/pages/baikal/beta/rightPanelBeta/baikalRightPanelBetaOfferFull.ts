import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";

/** Класс описывает раздел "Объект оценки" из правой панели. */
export class BaikalRightPanelBetaOfferFull extends BaikalRightPanelBetaBase {
  get $offer_full_root(): WebdriverIO.Element {
    return this.$right_panel.$(`.//main[contains(@class, 'OfferFull_comparableInfo')]`);
  }

  waitForLoad() {
    this.$offer_full_root.waitForExist({
      timeoutMsg: `Раздел "Объект оценки" не загрузилася в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Объект оценки" из правой панели. */
export const baikalRightPanelBetaOfferFull = new BaikalRightPanelBetaOfferFull();
