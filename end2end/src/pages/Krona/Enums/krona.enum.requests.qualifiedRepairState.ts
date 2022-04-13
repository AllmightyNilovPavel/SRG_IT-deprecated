export enum KronaRequestsQualifiedRepairsState {
  /** Без отделки / требуется капитальный ремонт */
  WITHOUT_REPAIRS = "WITHOUT_REPAIRS",
  /** Под чистовую отделку */
  PREPARED = "PREPARED",
  /** Среднее жилое состояние / требуется косметический ремонт */
  SIMPLE = "SIMPLE",
  /** Хорошее состояние */
  GOOD = "GOOD",
  /** Отличное (евроремонт) */
  EXCELLENT = "EXCELLENT",
  /** Ремонт премиум класса */
  EURO = "EURO",
}
