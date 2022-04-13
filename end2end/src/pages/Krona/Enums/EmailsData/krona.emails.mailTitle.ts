/**
 * Енам который содержит в себе ТЕМЫ для поиска писем и
 * используется только для работы с таблицей писем.
 * Каждое значение енама содержит либо полный текст либо xpath-выражение
 * для того чтобы найти именно то письмо которое нужно по соответствующей ТЕМЕ.
 * @see kronaRestMailCacheTable
 */
export enum KronaEnumEmailsMailTitle {
  PASSWORD_RESET = `and contains(text(),'Письмо для сброса пароля в сервисе "КРОНА"')`,
  LIVING_HOUSES_SRG_VERIFICATION = `and starts-with(text(),'Жилые дома: верификация отчета об оценке') and contains(text(),'сотрудником SRG')`,
  OPENBANK_BANK_VERIFICATION_NEEDED = `and contains(text(),'Поступил на верификацию отчет об оценке квартиры/апартаментов')`,
}
