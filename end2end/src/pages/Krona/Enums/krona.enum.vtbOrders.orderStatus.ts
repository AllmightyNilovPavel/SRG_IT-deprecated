export enum KronaVtbOrdersOrderStatus {
  /** В работе */
  SRG_IN_PROGRESS = "SRG_IN_PROGRESS",
  /** На доработке у Банка */
  BANK_CORRECTION = "BANK_CORRECTION",
  /** На доработке у ОК */
  SRG_CORRECTION = "SRG_CORRECTION",
  /** Ожидает осмотра */
  SRG_PENDING_FOR_AN_INSPECTION = "SRG_PENDING_FOR_AN_INSPECTION",
  /** Отмена заявки банком  */
  CANCELED_BY_BANK = "CANCELED_BY_BANK",
  /** Принято */
  BANK_READY = "BANK_READY",
  /** Приостановлено Банком */
  SUSPENDED_BY_BANK = "SUSPENDED_BY_BANK",
  /** Приостановлено ОК */
  SUSPENDED_BY_SRG = "SUSPENDED_BY_SRG",
  /** Проверка Заявки */
  SRG_CHECK = "SRG_CHECK",
  /** Проверка СТЗ/ДЗ */
  SRG_READY = "SRG_READY",
  /** Черновик */
  DRAFT = "DRAFT",
}
