/**
 * Енам для поля "Тип объекта" на странице
 * https://test.srg-it.ru/9r/requests
 */
export enum KronaRequestObjectType {
  /** Новостройка */
  NEW_FLAT = "NEW_FLAT",
  /** Квартира (вторичка) */
  FLAT = "FLAT",
  /** Доля в квартире */
  FLAT_SHARE = "FLAT_SHARE",
  /** Апартаменты новостройка */
  NEW_APARTMENT = "NEW_APARTMENT",
  /** Апартаменты вторичка */
  APARTMENT = "APARTMENT",
  /** Земельный участок */
  LAND = "LAND",
  /** Земельный участок c домом */
  LAND_AND_HOUSE = "LAND_AND_HOUSE",
  /** Гараж */
  GARAGE = "GARAGE",
  /** Гараж новостройка */
  NEW_GARAGE = "NEW_GARAGE",
  /** Последняя комната */
  LAST_ROOM = "LAST_ROOM",
  /** Комната */
  ROOMS = "ROOMS",
  /** Жилые Дома */
  COUNTRY_PROPERTY_OBJECTS = "COUNTRY_PROPERTY_OBJECTS",
  /** Коммерческая недвижимость */
  COMMERCIAL_REALTY = "COMMERCIAL_REALTY",
  /** Таунхаус */
  TOWNHOUSE = "TOWNHOUSE",
  /** Таунхаус с земельным участком */
  LAND_AND_TOWNHOUSE = "LAND_AND_TOWNHOUSE",
  /** Нематериальные активы */
  INTANGIBLE = "INTANGIBLE",
  /** Товарно-материальные ценности */
  INVENTORY = "INVENTORY",
  /** Движимое имущество */
  MOVABLE = "MOVABLE",
}
