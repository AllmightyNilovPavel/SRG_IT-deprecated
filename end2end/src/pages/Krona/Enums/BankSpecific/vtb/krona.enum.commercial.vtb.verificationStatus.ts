export enum KronaCommercialVtbVerificationStatus {
  /** Готово */
  READY = "READY",
  /** Экспресс-оценка. Готово */
  READY_EXPRESS_CONCLUSION = "READY_EXPRESS_CONCLUSION",
  /** Запрет залог */
  COLLATERAL_DECLINED = "COLLATERAL_DECLINED",
  /** Проверка ДЗ */
  UZI_CHECK = "UZI_CHECK",
  /** Готово. Возвращено ОК */
  READY_DECLINED = "READY_DECLINED",
  /** Проверка ОМБ */
  OMB_CHECK = "OMB_CHECK",
  /** Стоимость одобрена */
  CONCLUSION_PRICE_APPROVED = "CONCLUSION_PRICE_APPROVED",
  /** Заключение не одобрено */
  CONCLUSION_DECLINED = "CONCLUSION_DECLINED",
  /** Без согласования */
  DPA_CHECK = "DPA_CHECK",
}
