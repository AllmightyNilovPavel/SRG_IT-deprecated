export enum BaOrdersVehicleStatus {
  /** Всего заказов */
  ALL = "ALL",
  /** Новые */
  SENT = "SENT",
  /** В работе ОК */
  IN_PROGRESS = "IN_PROGRESS",
  /** На доработке */
  CORRECTION = "CORRECTION",
  /** Верификация */
  VERIFICATION = "VERIFICATION",
  /** Запрос коррекции */
  REQUEST_OF_CORRECTION = "REQUEST_OF_CORRECTION",
  /** Запрос. Отказ */
  REQUESTED_CANCELLATION_BY_CUSTOMER = "REQUESTED_CANCELLATION_BY_CUSTOMER",
  /** Отказ */
  REJECTED_OR_CANCELLED = "rejected_or_canceled",
  /** БЗО. Готово */
  APPROVED = "APPROVED",
}
