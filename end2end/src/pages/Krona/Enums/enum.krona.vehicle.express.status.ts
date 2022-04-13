/** Статусы реестра "ТС. Реестра экспресс оценок" */
export enum VehicleExpressStatus {
  /** Одобрено */
  ACCEPTED = "ACCEPTED_AUTO_VALUATION",
  /** Прочерк (не оценивается) */
  NOT_EVAL = "NOT_EVALUATED",
  /** Отклонено */
  OVERVALUATION = "OVERVALUATION",
}
