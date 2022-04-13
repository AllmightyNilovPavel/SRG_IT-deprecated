/**
 * Список статусов верификации для отчётов по КН
 * для банка Открытие.
 */
export enum KronaCommercialOpenbankVerificationStatus {
  /** Одобрено */
  READY = "READY",
  /** Формальное обеспечение */
  COLLATERAL_DECLINED = "COLLATERAL_DECLINED",
  /** Скорректировано */
  READY_PRICE_CHANGED = "READY_PRICE_CHANGED",
  /** Отказ */
  CANCELED = "CANCELED",
}
