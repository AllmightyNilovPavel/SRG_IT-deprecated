import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";

/** Класс описывает раздел "Аналоги" из правой панели. */
export class BaikalRightPanelBetaComparables extends BaikalRightPanelBetaBase {
  /** Корневой элемент компонента "Аналоги". */
  get $offers_short_list_root(): WebdriverIO.Element {
    return this.$right_panel.$(`.//div[contains(@class, 'OfferShortList_root')]`);
  }
  get $offers_short_list_table(): WebdriverIO.Element {
    return this.$offers_short_list_root.$(`.//div[contains(@class, 'tableContent')]//tbody`);
  }

  /** Добавить в избранное все аналоги, которые есть в расчетнике */
  addToFavorite() {
    this.$offers_short_list_table.waitForDisplayed({
      timeoutMsg: `Аналоги из правой панели Байкала не открыты. Поэтому добавить аналоги в избранное не получится.`,
    });
    let rows = browser.$$(
      `//div[contains(@class, 'tableContent')] //tbody //tr //i[contains(@class, 'ActionPanel_glyph_star')]`
    );
    for (let index_row = 0; index_row < rows.length; index_row++) {
      let target = rows[index_row];
      target.waitForClickable({
        timeoutMsg: `Кнопка "Добавить в избранное" не кликабельна`,
      });
      target.click();
      console.log(`Аналог №${index_row + 1} добавлен в избранное!`);
    }
  }

  waitForLoad() {
    this.$offers_short_list_root.waitForExist({
      timeoutMsg: `Раздел "Аналоги" из правой панели Байкала отображается в DOM-дереве`,
    });
  }
}

export const baikalRightPanelBetaComparables = new BaikalRightPanelBetaComparables();
