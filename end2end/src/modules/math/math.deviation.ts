import { isNull } from "lodash";
import { DeviationSide } from "./enum.math.deviationSide";

/**
 * Класс который содержит в себе методы подсчёта числовых отклонений
 */
export class MathDeviation {
  /**
   * Метод для подсчёта отклонения оного числа относительного другого
   *
   * @param deviationFrom - число относительного которого считать отклонение
   * @param deviationTo - число чьё отклонение относительно `deviationFrom` нужно выяснить
   * @returns отклонение в % для числа `deviationTo` относительно `deviationFrom`
   */
  getDeviationBetweenTwoNumbers(deviationFrom: number, deviationTo: number): number {
    console.log(`Вычисляем % отклонение числа ${deviationTo} от числа ${deviationFrom}`);
    return Math.trunc(((deviationTo - deviationFrom) / deviationFrom) * 100);
  }
  getDeviationFromPriceByPercent(
    deviationPrice: number,
    deviationPercent: number,
    deviationSide?: DeviationSide
  ): number {
    console.log(`Собираемся считать отклонение в ${deviationPercent}% от числа ${deviationPrice}`);
    if (!isNull(deviationPrice) || !isNaN(deviationPrice)) {
      let percentToFloat = deviationPercent / 100;
      console.log(`Проценты переведённые в число ${percentToFloat}`);

      return deviationSide === DeviationSide.MINUS
        ? Math.trunc(deviationPrice / (1 + percentToFloat))
        : Math.trunc(deviationPrice * (1 + percentToFloat));
    } else throw new Error(`Число от которого требуется считать отклонение - пустое.`);
  }
}
