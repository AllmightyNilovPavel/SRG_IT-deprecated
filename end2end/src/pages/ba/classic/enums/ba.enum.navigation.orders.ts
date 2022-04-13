export enum BaNavigationOrders {
  /** Недвижимость */
  REALTY = "authorities.canAcceptOrders",
  /** Коммерческая недвижимость */
  COMMERCIAL = "canAccessCommercialOrders",
  /** Нематериальные активы */
  INTANGIBLE = "canAccessIntangibleOrders",
  /** Движимое имущество */
  MOVABLE = "canAccessMovableOrders",
  /** Товарно-материальные ценности */
  INVENTORY = "canAccessInventoryOrders",
  /** Смешанный объект */
  MIXED = "canAccessMixedOrders",
  /** Автомобили */
  VEHICLE = "canHandleOrdersCars",
  /** Экспресс-оценка */
  FA = "canAccessFederalAppraiser",
  /** Аггрегатор */
  AGGREGATOR = "canAccessAggregator",
  /** Модератор */
  MODERATOR = "canModerateAggregator",
  /** Рефинансирование */
  ZALOG = "canAccessZalogOcenka",
  /** Тинькофф */
  RCS_ORDERS = "canAccessRcsOrders",
  /** Недвижимость ДПА */
  DPA_ORDERS = "canAccessDpaOrders",
}
