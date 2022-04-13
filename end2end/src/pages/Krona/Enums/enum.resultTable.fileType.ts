export enum KronaFileType {
  /** Отчёт */
  report = 'a[href*="download/report?reportId"]',
  /** Заключение к отчёту */
  conclusion = 'a[href*="download/conclusion?reportId"]',
  /** Файл подписи ЭЦП */
  digital_sign = 'a[href*="download/signature?reportId"]',
  /** Отчёт со штампом ЭЦП */
  digital_sign_report = 'a[href*="download/report_with_signature?reportId"]',
  /** Отчёт по Авто */
  vehicle_report = 'a[href*="/9r/files/download/ba"]',
  /** Заключение по авто */
  vehicle_conclusion = 'a[href*="/9r/download-pdf/auto/conclusion"]',
  /** Отчёт по Жилым Домам */
  countryProperty_report = 'a[href*="/country_property/download/report"]',
  /** Заключение по Жилым Домам */
  countryProperty_conclusion = 'a[href*="/country_property/download/conclusion"]',
  /** БЗО. Недвижимость - отчёт */
  BZO_REALTY_REPORT = 'a[href^="/9r/download/report?reportId"]',
  /** БЗО. Недвижимость - заключение */
  BZO_REALTY_CONCLUSION = 'a[href^="/9r/download/conclusion?reportId"]',
  /** Коммерческая недвижимость: Заключение */
  COMMERCIAL_CONCLUSION = `a[href*="9r/download-pdf/conclusion/"]`,
  /** Коммерческая недвижимость: отчёт об оценке */
  COMMERCIAL_REPORT = `a[href*="9r/files/download?filePath=ba"]`,
  /** Отчёты об оценке (ВТБ) -> Заключение */
  VTB_ORDERS_CONCLUSION = `a[href*='/9r/vtb/orders'][href$='/download/conclusion']`,
  /** Отчёты об оценке (Открытие) -> Заключение */
  OPENBANK_ORDERS_CONCLUSION = `a[href*='/9r/openbank/orders'][href$='/download/conclusion']`,
}
