import { BaikalCalculationBetaBase } from "./baikalCalculationBetaBase";
import { BaikalEnumStatisticsFromCalculation } from "pages/baikal/enums";

/** Класс описывает вкладку "Статистики" из раздела "Расчетник". */
export class BaikalCalculationBetaStatistics extends BaikalCalculationBetaBase {
  /** Таблица со статистикой */
  get $calculation_table(): WebdriverIO.Element {
    return this.$calculationWrap.$(`.//table[contains(@class, 'Calculation_table')]`);
  }

  /** Получить значение у параметра из таблицы со статистикой.
   *
   * @param parameter - BaikalEnumStatisticsFromCalculation (енам, в котором все строки таблицы)
   */
  getStatValue(parameter: BaikalEnumStatisticsFromCalculation): string {
    let row = this.$calculation_table.$(`.//span[contains(text(), '${parameter}')]`);

    // Всего 5 элементов. 3ий элемент - строка, 4 элемент - столбец
    let cell_with_param_name: Array<string> = row.$(`./..`).getAttribute(`id`).split(`:`);

    let row_number = cell_with_param_name[2];
    let column_number = parseInt(cell_with_param_name[3]);

    // Т.к. значение хранится на 2 столбца правее, чем имя параметра, то плюсуем 2 к номеру столбца
    let column_number_in_value_cell = (column_number + 2).toString();

    let param_value = this.$calculation_table.$(
      `.//div[@id="0:1:${row_number}:${column_number_in_value_cell}:0"]`
    );
    return param_value.getText();
  }
}

export const baikalCalculationBetaStatistics = new BaikalCalculationBetaStatistics();
