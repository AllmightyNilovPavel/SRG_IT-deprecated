export enum BaNavigationButtons {
  /** Список отчётов */
  REPORTS_LIST = "/index.html",
  /** Сводка */
  INFO_SUMMARY = "/info_summary.html",
  /** Лицевой счёт */
  PAY_HISTORY = "/pay_history.html",
  /** Сообщения */
  MESSAGES = "/message_list.html",
  /** Настройки */
  SETTINGS = "/market_list.html",
  /** Админка */
  ADMIN_SETTINGS = "/sa_companies.html",
  // ------------- Отчёты ---------------------------
  /** Квартиры */
  RESIDENTIAL_REPORTS = "/index.html",
  /** Последняя комната */
  LAST_ROOM = "/last_room_reports.html",
  /** Загородная недвижимость */
  COUNTRYSIDE = "/countryside_reports.html",
  /** Коммерческая недвижимость */
  COMMERCIAL = "/commercial_reports.html",
  /** Нематериальные активы */
  INTANGIBLE = "/intangible_reports.html",
  /** Движимое имущество */
  MOVABLE = "/movable_reports.html",
  /** Товарно-материальные ценности */
  INVENTORY = "/inventory_reports.html",
  /** Гаражи */
  GARAGE = "/garage_reports.html",
  /** Автомобили */
  VEHICLE = "/auto_reports.html",
  // --------------------- Заказы --------------------------
  /** Недвижимость */
  ORDERS_REALTY = "authorities.canAcceptOrders",
  /** Коммерческая недвижимость */
  ORDERS_COMMERCIAL = "canAccessCommercialOrders",
  /** Нематериальные активы */
  ORDERS_INTANGIBLE = "canAccessIntangibleOrders",
  /** Движимое имущество */
  ORDERS_MOVABLE = "canAccessMovableOrders",
  /** Товарно-материальные ценности */
  ORDERS_INVENTORY = "canAccessInventoryOrders",
  /** Смешанный объект */
  ORDERS_MIXED = "canAccessMixedOrders",
  /** Автомобили */
  ORDERS_VEHICLE = "canHandleOrdersCars",
  /** Экспресс-оценка */
  ORDERS_FA = "canAccessFederalAppraiser",
  /** Аггрегатор */
  ORDERS_AGGREGATOR = "canAccessAggregator",
  /** Модератор */
  ORDERS_MODERATOR = "canModerateAggregator",
  /** Рефинансирование */
  ORDERS_ZALOG = "canAccessZalogOcenka",
  /** Тинькофф */
  RCS_ORDERS = "canAccessRcsOrders",
  /** Недвижимость ДПА */
  DPA_ORDERS = "canAccessDpaOrders",
}
export let BaNavigationButtonsOrders = new Set<BaNavigationButtons>([
  BaNavigationButtons.ORDERS_REALTY,
  BaNavigationButtons.ORDERS_COMMERCIAL,
  BaNavigationButtons.ORDERS_INTANGIBLE,
  BaNavigationButtons.ORDERS_MOVABLE,
  BaNavigationButtons.ORDERS_INVENTORY,
  BaNavigationButtons.ORDERS_MIXED,
  BaNavigationButtons.ORDERS_VEHICLE,
  BaNavigationButtons.ORDERS_FA,
  BaNavigationButtons.ORDERS_AGGREGATOR,
  BaNavigationButtons.ORDERS_MODERATOR,
  BaNavigationButtons.ORDERS_ZALOG,
  BaNavigationButtons.RCS_ORDERS,
  BaNavigationButtons.DPA_ORDERS,
]);
export let BaNavigationButtonsPrimary = new Set<BaNavigationButtons>([
  BaNavigationButtons.REPORTS_LIST,
  BaNavigationButtons.INFO_SUMMARY,
  BaNavigationButtons.PAY_HISTORY,
  BaNavigationButtons.MESSAGES,
  BaNavigationButtons.SETTINGS,
  BaNavigationButtons.ADMIN_SETTINGS,
]);
export let BaNavigationButtonsSecondary = new Set<BaNavigationButtons>([
  BaNavigationButtons.RESIDENTIAL_REPORTS,
  BaNavigationButtons.LAST_ROOM,
  BaNavigationButtons.COUNTRYSIDE,
  BaNavigationButtons.COMMERCIAL,
  BaNavigationButtons.INTANGIBLE,
  BaNavigationButtons.MOVABLE,
  BaNavigationButtons.INVENTORY,
  BaNavigationButtons.GARAGE,
  BaNavigationButtons.VEHICLE,
]);
