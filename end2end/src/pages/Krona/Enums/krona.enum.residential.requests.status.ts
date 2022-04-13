/** Енам для поля "Статус" на странице
 * https://test.srg-it.ru/9r/requests
 */
export enum KronaResidentialRequestStatus {
  /**   * Статус = "Принят"   */
  CREATED = "CREATED",
  /**   * Статус = "Оценивается"   */
  AWAITS_AUTO_VALUATION = "AWAITS_AUTO_VALUATION",
  /**   * Статус = "Одобрен"   */
  ACCEPTED_AUTO_VALUATION = "ACCEPTED_AUTO_VALUATION",
  /**   * Статус = "Скорректировано"   */
  OVERVALUATION = "OVERVALUATION",
  /**   * Статус = "Не оценивается"   */
  NOT_EVALUATED = "NOT_EVALUATED",
  /**   * Статус = "Окончание верификации ... по МСК"   */
  AWAITS_EXPERT_VALUATION = "AWAITS_EXPERT_VALUATION",
  /**   * Статус = "Требует верификации до ... по МСК"   */
  BANK_SELF_EXPERT_VERIFICATION = "BANK_SELF_EXPERT_VERIFICATION",
  /**   * Статус = "Ошибка в запросе"   */
  INVALID_FOR_EXPERT_VALUATION = "INVALID_FOR_EXPERT_VALUATION",
  /**   * Статус = "Одобрено экспертом"   */
  ACCEPTED_EXPERT_VALUATION = "ACCEPTED_EXPERT_VALUATION",
  /**   * Статус = "Ошибка при автоматической оценке"   */
  FAILED_AUTO_VALUATION = "FAILED_AUTO_VALUATION",
  /**   * Статус = "Не оценивается"   */
  INVALID = "INVALID",
  /**   * Статус = "Отменён"   */
  CANCELED = "CANCELED",
  /**   * Статус = "Не подлежит оценке"   */
  SHOULD_NOT_BE_EVALUATED = "SHOULD_NOT_BE_EVALUATED",
}
