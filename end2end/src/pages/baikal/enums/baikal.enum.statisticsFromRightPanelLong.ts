/**
 *
 * Полная версия enums для перечня полей, которые находятся в таблице "Статистика" из правой панели.
 * В качестве значений енамов берутся айдишники элементов
 *
 * */
export enum BaikalEnumStatisticsFromRightPanelLong {
  /** Количество объектов */
  NUMBER_OF_OBJECTS = "count_objects",

  /** Средний / макс период экспозиции */
  AVERAGE_MAX_EXPOSURE_TIME = "exposure",

  /** Среднеарифметическое */
  ARITHMETIC_MEAN = "average",

  /** Средневзвешенное */
  WEIGHTED_AVERAGE = "weighted_average",

  /** Медиана,
   1 квартиль / 3 квартиль */
  MEDIAN_FIRST_THIRD_QUARTER = "median_1/3",

  /** Среднегеометрическое,
   Логнормальные Мин/Макс (-/+ 3СКО) */
  AVERAGE_GEOMETRIC_VALUE = "geometric_mean",

  /** Модальный интервал
   Среднее / Мин / Макс */
  MODAL_INTERVAL = "modal_interval",

  /** Мин/Макс */
  MIN_MAX = "min_max",

  /** 1/99 процентиль */
  PERCENTILE = "percentile_1/99",

  /** Мин/Макс без выбросов */
  MIN_MAX_NO_EMISSIONS = "min_max_no_emissions",

  /** Коэффициент вариации */
  COEFFICIENT_OF_VARIATION = "coefficient_of_variation",

  /** Стандартное отклонение */
  STANDARD_DEVIATION = "standard_deviation",

  /** Стандартная ошибка */
  STANDARD_ERROR = "standard_error",

  /** Количество СКО (слева/справа) */
  COUNT_MSD_LEFT_RIGHT = "count_ssd",

  /** Границы интервала +/- 1 СКО */
  INTERVAL_BOUNDARIES_ONE_MSD = "ssd_1_avg",

  /** Количество объектов в интервале
   +/- 1 СКО в НР 68,17% */
  COUNT_OF_OBJECTS_ONE_MSD = "ssd_1_avg_percent",

  /** Границы интервала +/- 2 СКО */
  INTERVAL_BOUNDARIES_TWO_MSD = "ssd_2_avg",

  /** Количество объектов в интервале
   +/- 2 СКО в НР 95,45% */
  COUNT_OF_OBJECTS_TWO_MSD = "ssd_2_avg_percent",

  /** Границы интервала +/- 3 СКО */
  INTERVAL_BOUNDARIES_THREE_MSD = "ssd_3_avg",

  /** Количество объектов в интервале
   +/- 3 СКО в НР 99,73% */
  COUNT_OF_OBJECTS_THREE_MSD = "ssd_3_avg_percent",

  /** Ассиметрия / 3Sa (в НР As=0) */
  ASYMMETRY = "skewness",

  /** Эксцесс / 3Se (в НР Ek=0) */
  KURTOSIS = "kurtosis",

  /** Тест Шапиро-Уилка НР < 0.05 */
  SHAPIRO_WILK_TEST = "shapiro_wilk_test",

  /** Д'Агостина в K -squared тест НР < 0.05 */
  D_AGOSTINA_K_SQUARED = "d_agostino_k_squared_test",
}
