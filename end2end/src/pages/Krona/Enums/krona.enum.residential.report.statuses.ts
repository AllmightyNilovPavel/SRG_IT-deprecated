export enum KronaResidentialReportStatuses {
  /** Принят */
  CREATED = "CREATED",
  /** Оценивается */
  AWAITS_AUTO_VALUATION = "AWAITS_AUTO_VALUATION",
  /** Одобрен */
  ACCEPTED_AUTO_VALUATION = "ACCEPTED_AUTO_VALUATION",
  /** Скорректировано */
  OVERVALUATION = "OVERVALUATION",
  /** Не оценивается */
  NOT_EVALUATED = "NOT_EVALUATED",
  /** Окончание верификации... по МСК */
  AWAITS_EXPERT_VALUATION = "AWAITS_EXPERT_VALUATION",
  /** Требует верификации до... по МСК */
  BANK_SELF_EXPERT_VERIFICATION = "BANK_SELF_EXPERT_VERIFICATION",
  /** Ошибка в запросе */
  INVALID_FOR_EXPERT_VALUATION = "INVALID_FOR_EXPERT_VALUATION",
  /** Одобрено экспертом */
  ACCEPTED_EXPERT_VALUATION = "ACCEPTED_EXPERT_VALUATION",
  /** Ошибка при автоматической оценке */
  FAILED_AUTO_VALUATION = "FAILED_AUTO_VALUATION",
  /** Не оценивается */
  INVALID = "INVALID",
  /** Отменен */
  CANCELED = "CANCELED",
  /** Не подлежит оценке */
  SHOULD_NOT_BE_EVALUATED = "SHOULD_NOT_BE_EVALUATED",
}
