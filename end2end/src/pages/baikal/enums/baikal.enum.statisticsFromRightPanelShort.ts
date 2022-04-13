/**
 *
 * Краткая версия enums для перечня полей, которые находятся в таблице "Статистика" из правой панели.
 * В качестве значений енамов берутся айдишники элементов
 *
 * */
export enum BaikalEnumStatisticsFromRightPanelShort {
  /** Количество объектов */
  NUMBER_OF_OBJECTS = "count_objects",

  /** Среднеарифметическое */
  ARITHMETIC_MEAN = "average",

  /** Средневзвешенное */
  WEIGHTED_AVERAGE = "weighted_average",

  /** Медиана,
   1 квартиль / 3 квартиль */
  MEDIAN_FIRST_THIRD_QUARTER = "median_1/3",

  /** Мин/Макс */
  MIN_MAX = "min_max",

  /** Коэффициент вариации */
  COEFFICIENT_OF_VARIATION = "coefficient_of_variation",

  /** Стандартное отклонение */
  STANDARD_DEVIATION = "standard_deviation",

  /** Количество СКО (слева/справа) */
  COUNT_MSD_LEFT_RIGHT = "count_ssd",
}
