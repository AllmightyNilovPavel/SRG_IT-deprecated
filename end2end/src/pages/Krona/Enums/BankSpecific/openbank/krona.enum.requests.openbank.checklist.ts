export enum KronaRequestsOpenbankChecklist {
  /** Здание не имеет материал стен: брус/дерево */
  BUILDING_WALLS_MATERIAL = "Здание не имеет материал стен: брус/дерево",
  /** Здание не имеет деревянных перекрытий */
  BUILDING_DONT_HAVE_WOODEN_FLOOR = "Здание не имеет деревянных перекрытий",
  /** Здание имеет более 2-х этажей */
  BUILDING_2_FLOORS_TALL_MIN = "Здание имеет более 2-х этажей",
  /** Здание не находится в аварийном состоянии */
  BUILDING_IS_NO_IN_EMERGENCY_STATE = "Здание не находится в аварийном состоянии",
  /** Здание не стоит на учете на капитальный ремонт, снос и реконструкцию с отселением */
  BUILDING_IS_NOT_REGISTERED_FOR_DEMOLISH = "Здание не стоит на учете на капитальный ремонт, снос и реконструкцию с отселением",
  /** Здание не участвует в программе «Реновация»  */
  BUILDING_IS_NOT_REGISTERED_FOR_RENOVATION = "Здание не участвует в программе «Реновация»",
  /** Износ многоквартирного дома не более 60% */
  BUILDING_WEAROUT_NOT_MORE_THAN_60_PERCENT = "Износ многоквартирного дома не более 60%",
  /** Здание не находится на территории ЗАТО */
  BUILDING_IS_NOT_ON_ZATO_TERRITORY = "Здание не находится на территории ЗАТО",
  /** В квартире отдельно выделен санузел */
  SEPARATED_BATHROOM = "В квартире отдельно выделен санузел",
  /** В квартире выделено кухонное пространство в отдельно выделенной зоне */
  SEPARATED_KITCHEN = "В квартире выделено кухонное пространство в отдельно выделенной зоне",
  /** В квартире не осуществлялся полный снос несущей стены/стен */
  MAIN_WALLS_ARE_NOT_DEMOLISHED = "В квартире не осуществлялся полный снос несущей стены/стен",
  /** В квартире не изменились внешние границы после перепланировки */
  FLAT_BORDERS_WASNT_CHANGED = "В квартире не изменились внешние границы после перепланировки",
  /** Коммуникации в квартире не находятся в неудовлетворительном состоянии */
  COMMUNICATIONS_ARE_NOT_IN_BAD_STATE = "Коммуникации в квартире не находятся в неудовлетворительном состоянии",
  /** Квартира подключена к центральному отоплению */
  FLAT_IS_CONNECTED_TO_CENTRAL_HEATING = "Квартира подключена к центральному отоплению",
  /** Квартира обеспечена холодным водоснабжением */
  FLAT_IS_PROVIDED_WITH_COLD_WATER = "Квартира обеспечена холодным водоснабжением",
  /** Квартира обеспечена горячим водоснабжением */
  FLAT_IS_PROVIDED_WITH_HOT_WATER = "Квартира обеспечена горячим водоснабжением",
}
