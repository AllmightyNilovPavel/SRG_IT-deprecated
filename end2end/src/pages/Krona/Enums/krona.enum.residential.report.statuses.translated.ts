export enum KronaResidentialReportStatusesTranslated {
  /** Принят */
  CREATED = "Принят",
  /** Оценивается */
  AWAITS_AUTO_VALUATION = "Оценивается",
  /** Одобрен */
  ACCEPTED_AUTO_VALUATION = "Одобрен",
  /** Скорректировано */
  OVERVALUATION = "Скорректировано",
  /** Не оценивается */
  NOT_EVALUATED = "Не оценивается",
  /** Окончание верификации... по МСК */
  AWAITS_EXPERT_VALUATION = "Окончание верификации",
  /** Требует верификации до... по МСК */
  BANK_SELF_EXPERT_VERIFICATION = "Требует верификации",
  /** Ошибка в запросе */
  INVALID_FOR_EXPERT_VALUATION = "Ошибка в запросе",
  /** Одобрено экспертом */
  ACCEPTED_EXPERT_VALUATION = "Одобрено экспертом",
  /** Ошибка при автоматической оценке */
  FAILED_AUTO_VALUATION = "Ошибка при автоматической оценке",
  /** Не оценивается */
  INVALID = "Не оценивается",
  /** Отменен */
  CANCELED = "Отменен",
  /** Не подлежит оценке */
  SHOULD_NOT_BE_EVALUATED = "Не подлежит оценке",
}
