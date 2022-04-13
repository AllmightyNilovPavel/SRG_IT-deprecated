import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";

/** Класс описывает раздел "Графики" из правой панели. */
export class BaikalRightPanelBetaGraphics extends BaikalRightPanelBetaBase {
  get $graphics_root(): WebdriverIO.Element {
    return this.$right_panel.$(`.//div[contains(@class, 'Graphs_root')]`);
  }

  waitForLoad() {
    this.$graphics_root.waitForExist({
      timeoutMsg: `Раздел "Графики" не загрузилася в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Графики" из правой панели. */
export const baikalRightPanelBetaGraphics = new BaikalRightPanelBetaGraphics();
