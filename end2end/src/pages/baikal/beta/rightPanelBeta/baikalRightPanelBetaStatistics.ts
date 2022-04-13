import { debugLogging } from "modules";
import {
  BaikalEnumStatisticsFromRightPanelLong,
  BaikalEnumSectionsFromRightPanelStatistic,
  BaikalEnumRightPanelStatisticVersion,
} from "pages/baikal/enums";

import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";

/** Класс описывает раздел "Статистика" из правой панели. */
export class BaikalRightPanelBetaStatistics extends BaikalRightPanelBetaBase {
  get $stats_panel_content(): WebdriverIO.Element {
    return this.$right_panel.$(`.//div[contains(@class,'Panel_content')]`);
  }

  get $stats_panel_root(): WebdriverIO.Element {
    return this.$stats_panel_content.$(`.//div[contains(@class,'StatsPanel_root')]`);
  }

  /** Список элементов с группами кнопок в статистике */
  get $stats_panel_buttons(): WebdriverIO.Element[] {
    return this.$stats_panel_root.$$(
      `.//div[@class='ant-radio-group ant-radio-group-outline ant-radio-group-small']`
    );
  }

  get $stats_panel_table(): WebdriverIO.Element {
    return this.$stats_panel_root.$(`table`);
  }

  get $$table_rows(): WebdriverIO.Element[] {
    return this.$stats_panel_table.$$(`tr`);
  }

  /** Получить значение у параметра из таблицы со статистикой.
   *
   * @param stats_name - BaikalEnumStatisticsFromRightPanelLong(енам, в котором все строки таблицы)
   */
  getStatValue(stats_name: BaikalEnumStatisticsFromRightPanelLong) {
    return this.$stats_panel_table
      .$(`.//tr[@class="${stats_name}"]/td[@class="stat_value"]`)
      .getText();
  }

  /** Кнопки, по которым осуществляется переход по разделам таблицы "Статистика"
   *
   * @param section - Имя кнопки
   * */
  statsPanelSection(section: BaikalEnumSectionsFromRightPanelStatistic) {
    let TARGET: WebdriverIO.Element;
    let CHECK: WebdriverIO.Element;
    TARGET = this.$stats_panel_buttons[0].$(`.//span[contains(text(), "${section}")]`);
    CHECK = TARGET.$(`./..`);

    TARGET.scrollIntoView();
    TARGET.waitForClickable({
      timeoutMsg: `Не удается кликнуть по разделу ${section} в таблице со статистикой.`,
    });
    debugLogging(`Кликаем по разделу ${section} в таблице со статистикой`);
    TARGET.click();
    browser.waitUntil(
      () => CHECK.getAttribute(`class`).match(`ant-radio-button-wrapper-checked`) !== null,
      {
        timeoutMsg: `Раздел ${section} в таблице со статистикой не открылся.`,
      }
    );
    debugLogging(`В таблице со статистикой (из правой панели) открылся раздел ${section}`);
    browser.waitUntil(
      () => this.$stats_panel_root.getAttribute(`class`).match(`StatsPanel_loading`) === null,
      {
        timeoutMsg: `Вкладка со статистикой открылась, но статистика во вкладке не может прогрузиться.`,
      }
    );
    debugLogging(`Статистика прогрузилась`);
  }

  /** Переключить версию таблицы (короткая/полная)
   *
   * @param version - Версия таблицы
   * */
  statsPanelVersion(version: BaikalEnumRightPanelStatisticVersion) {
    let TARGET: WebdriverIO.Element;
    let CHECK: WebdriverIO.Element;
    TARGET = this.$stats_panel_buttons[1].$(`.//span[contains(text(), "${version}")]`);
    CHECK = TARGET.$(`./..`);

    TARGET.scrollIntoView();
    TARGET.waitForClickable({
      timeoutMsg: `Не удается кликнуть по версии "${version}" в таблице со статистикой.`,
    });
    debugLogging(`Кликаем по версии таблицы = ${version} в таблице со статистикой`);
    TARGET.click();

    browser.waitUntil(
      () => CHECK.getAttribute(`class`).match(`ant-radio-button-wrapper-checked`) !== null,
      {
        timeoutMsg: `Версия "${version}" в таблице со статистикой не открылась.`,
      }
    );
    debugLogging(`В таблице со статистикой (из правой панели) открылась версия = "${version}"`);
    browser.waitUntil(
      () => this.$stats_panel_root.getAttribute(`class`).match(`StatsPanel_loading`) === null,
      {
        interval: 1000,
        timeout: 20000,
        timeoutMsg: `Вкладка со статистикой открылась, но статистика во вкладке не может прогрузиться.`,
      }
    );
    debugLogging(`Статистика прогрузилась`);
  }

  waitForLoad() {
    this.$stats_panel_root.waitForExist({
      timeoutMsg: `Раздел "Статистика" не отображается в DOM-дереве`,
    });
  }
}

/** Класс описывает раздел "Статистика" из правой панели. */
export const baikalRightPanelBetaStatistics = new BaikalRightPanelBetaStatistics();
