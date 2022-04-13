export enum AijkOrdersStatus {
  /** В работе */
  SRG_IN_PROGRESS = "SRG_IN_PROGRESS",
  /** Готово */
  SRG_READY = "SRG_READY",
  /** На доработке у SRG */
  SRG_CORRECTION = "SRG_CORRECTION",
  /** На доработке у Банка */
  BANK_CORRECTION = "BANK_CORRECTION",
  /** Принято */
  BANK_READY = "BANK_READY",
  /** Приостановлено SRG */
  SUSPENDED_BY_SRG = "SUSPENDED_BY_SRG",
  /** Приостановлено Банком */
  SUSPENDED_BY_BANK = "SUSPENDED_BY_BANK",
  /** Проверка Заявки */
  SRG_CHECK = "SRG_CHECK",
  /** Черновик */
  DRAFT = "DRAFT",
}
