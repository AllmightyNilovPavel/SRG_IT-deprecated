/**
 * Кнопки для модального окна "Создать отчёт"
 *
 * @see
 */
export enum BaResidentialNewReportTypes {
  /** Квартиры */
  RESIDENTIAL = "createNewReport",
  /** Коммерческая недвижимость */
  COMMERCIAL = "createNewCommReport",
  // COUNTRY_PROPERTY = "",
  /** Жилые дома */
  LIVING_HOUSE = "createNewCountryPropertyReport",
  /** Нематериальные активы */
  INTANGIBLE = "createNewIntngReport",
  /** Движимое имущество */
  MOVABLE = "createNewMvblReport",
  /** Товарно-материальные ценности */
  INVENTORY = "createNewInvntReport",
}
