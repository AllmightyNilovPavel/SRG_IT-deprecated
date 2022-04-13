import { BaikalLeftPanelBetaBase } from "./baikalLeftPanelBetaBase";

/** Класс описывает раздел "Статистика" из левой панели Байкала. */
export class BaikalLeftPanelBetaStatistics extends BaikalLeftPanelBetaBase {
  get $stats_panel_content(): WebdriverIO.Element {
    return this.$left_panel.$(`.//div[contains(@class,'Panel_content')]`);
  }

  get $stats_panel_root(): WebdriverIO.Element {
    return this.$stats_panel_content.$(`.//div[contains(@class,'StatsPanel_root')]`);
  }

  waitForLoad() {
    this.$stats_panel_root.waitForExist({
      timeoutMsg: `Раздел "Статистика" не отображается в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Статистика" из левой панели Байкала. */
export const baikalLeftPanelBetaStatistics = new BaikalLeftPanelBetaStatistics();
