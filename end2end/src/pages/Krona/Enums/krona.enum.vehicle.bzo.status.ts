/** Енам для поля "Статус" БЗО.ТС на странице
 * https://test.srg-it.ru/9r/valuation/orders
 */
export enum KronaVehicleBzoStatus {
  /** Черновик */
  DRAFT = "DRAFT",
  /** Отправлено */
  SENT = "SENT",
  /** В работе ОК */
  IN_PROGRESS = "IN_PROGRESS",
  /** Запрос. Возврат в работу */
  REQUEST_TO_REVOKE = "REQUEST_TO_REVOKE",
  /** Запрос. Корректировка заявки */
  REQUEST_OF_CORRECTION = "REQUEST_OF_CORRECTION",
  /** Верификация УЗИ ДРКР */
  VERIFICATION = "VERIFICATION",
  /** На доработке */
  CORRECTION = "CORRECTION",
  /** Отказ. Оценка невозможна */
  REJECTED = "REJECTED",
  /** Отменён */
  CANCELED = "CANCELED",
  /** Запрос. Отказ по инициативе заказчика */
  REQUESTED_CANCELLATION_BY_CUSTOMER = "REQUESTED_CANCELLATION_BY_CUSTOMER",
  /** БЗО. Готово */
  APPROVED = "APPROVED",
}
