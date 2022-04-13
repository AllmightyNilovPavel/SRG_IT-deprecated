import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";

/** Класс описывает раздел "Поиск" из правой панели. */
export class BaikalRightPanelBetaSearch extends BaikalRightPanelBetaBase {
  /** Таблица офферов в компоненте "Поиск". */
  get $offer_list_table(): WebdriverIO.Element {
    return this.$right_panel.$(`.//table[contains(@class, 'OfferListTable_table')]`);
  }

  waitForLoad() {
    this.$offer_list_table.waitForExist({
      timeoutMsg: `Раздел "Поиск" не загрузилася, так как таблица со списком офферов не отображается в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Поиск" из правой панели. */
export const baikalRightPanelBetaSearch = new BaikalRightPanelBetaSearch();
