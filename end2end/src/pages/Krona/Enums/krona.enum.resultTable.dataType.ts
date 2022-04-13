/** Енам для описания данных в таблице результатов любого реестра.
 */
export enum KronaDataType {
  /** Коммерческая недвижимость */
  COMMERCIAL = "a[href*='/commercial/report']",
  commercial_report_status = "tbody > tr:nth-child(1) > td:nth-child(13)",
  commercial_zapret_zalog = "tbody > tr:nth-child(1) > td:nth-child(12)",
  /** Аижк */
  AIJK = "a[href*='aijk/order']",
  /** Экспресс Анализ */
  SBD_EXPRESS = "a[href*='sbd/express/request/']",
  /** Экспертная оценка */
  SBD_EXPERT = "a[href*='sbd/expert/request']",
  /** Отчёты об оценке (Сбербанк) */
  SBD_ORDER = "a[href*='/sbd/order/']",
  /** Отчёты об оценке (Открытие) */
  OPENBANK_ORDER = "a[href*='/openbank/order/']",
  /** Реестр объектов */
  REQUEST = "a[href*='request/']",
  /** Реестр отчётов */
  REPORT = "a[href*='/report/']",
  REPORT_STATUS = "tbody > tr > td:nth-child(10)",
  /** Верификации */
  VERIFICATION = "a[href*='9r/request']",
  /** Жилые Дома */
  COUNTRY_PROPERTY = "a[href*='country_property']",
  /** Автомобили БЗО + Экспресс */
  VEHICLE = "a[href*='order/']",
  VEHICLE_EXPRESS = "a[href*='ver2/order/']",
  VEHICLE_status_vtb = "tbody > tr > td:nth-child(14) > div",
  VEHICLE_status_openbank = "tbody > tr:nth-child(1) > td:nth-child(15) > div",
  /** Реестр "на коррекции" */
  CORRECTION = "a[href*='correction']",
  /** Реестр расчётов (ака Байкал) */
  BAIKAL = "a[href*='rbRequest']",
  /** Переоценки */
  REVALUATION = "a[href*='revaluation']",
  /** Заказы Федерального Оценщика (только для SRG) */
  FA = `a[href^='/9r/fa/order']`,
  /** Заказы Федерального Оценщика (для всех) */
  FA_PUBLIC = `a[href^='/9r/fa/public/order']`,
  /** Выписка ЕГРН */
  EGRN = "#result_table > tbody > tr:nth-child(1)",
  /** Пользователи */
  USER = "a[href*='user/']",
  /** Аккредитации */
  ACCREDITATION = "a[href*='company/']",
  /** Заявки экспертов SRG */
  EXPERT = "a[href*='expert/request']",
  /** Архивы */
  ARCHIVES = "a[href*='revaluation/downloadArchive/']",
  // ----------------------------------------------------
  BZO_ORDER_CARD = "a[href*='/9r/valuation/dpa/order/auto/ver2/']",
  /** Статус заказа БЗО.Недвижимость */
  BZO_STATUS = "tbody > tr:nth-child(1) > td:nth-child(8)",
  /** История оценок */
  APPRAISAL_HISTORY = "a[href*='/9r/appraisal/history/report/']",
}
