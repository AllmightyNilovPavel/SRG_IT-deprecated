export enum CountryPropertyStatus {
  /** Проверка УЗИ */
  VALIDATION_BANK = "VALIDATION_BANK",
  /** Проверка ДИК */
  VALIDATION_DIK = "VALIDATION_DIK",
  /** Проверка МБ */
  VALIDATION_DMB = "VALIDATION_DMB",
  /** На верификации */
  VALIDATION_SRG = "VALIDATION_SRG",
  /** Готово */
  READY = "READY",
  /** Готово. Изменена стоимость */
  READY_PRICE_CHANGED = "READY_PRICE_CHANGED",
}
