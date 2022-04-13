export class MathRandom {
  /**
   * Метод который выдаёт случайное число между двумя указанными в виде параметров
   * @param MIN - минимальное число
   * @param MAX - максимальное число
   * @returns случайное число между MIN и MAX
   */
  getRandomNumberBetween(MIN: number, MAX: number): number {
    return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  }
  /**
   * Метод который возвращает случайное число от первого параметра
   * прибавленного ко второму параметру.
   *
   * Обычно используется для рандомизации номера дома в адресах
   * @param rndMultiplier число в пределах которого нужно получить значение
   * @param addition минимальное значение
   * @returns `Math.ceil(Math.random() * rndMultiplier) + addition`
   */
  getMinIntFromRandomWithMinStartingNum(rndMultiplier: number, addition: number): number {
    return Math.ceil(Math.random() * rndMultiplier) + addition;
  }
}

export const mathRandom = new MathRandom();
