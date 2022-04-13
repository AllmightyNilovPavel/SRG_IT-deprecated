/** Кнопки Перехода верхнего меню */
export enum KronaNavigationButtons {
  // Кнопки под шестерёнкой (настройки)
  PROJECT_PROP = "#project_properties",
  /** кнопка "Пользователи" */
  USER_REESTR = "#userreestr",
  /** кнопка "Компании" */
  COMPANIES = "#companies",
  /** Коммерческая недвижимость */
  COMMERCIAL_REALTY = "#commercial_list",
  /** Коммерческая недвижимость -> реестр отчётов */
  COMMERCIAL_REPORTS = "#commercial_reports",
  /** Кнопка "Эксперты" */
  EXPERT_REESTR = "expertsreestr",
  /** Кнопка "Эксперты (статистика за день)" */
  EXPERT_DAILY_STAT = "expert-daily-stat",
  /** Адреса */
  ADDRESS_LIST = "#address_list",
  /** Рассылка писем */
  MAILING_LIST = "#sent_email_list_form",
  /** Реестр средних цен */
  AVERAGE_PRICES = "#average_prices_list",
  /** кнопка "Диагностические центры" */
  DIAGNOSTIC_CENTERS = "#diagnostic_center_list",
  /** кнопка "Аккредитация" */
  ACCREDITATIONS = "#accreditations_list",
  /** Реестр переоценок */
  REVALUATION_REGISTRY = "#revaluation_reestr",
  /** Кнопка "Экспресс-оценка" */
  FA_ADMIN = "fa_admin",
  /** Кнопка "Статистика ИЦ" */
  FA_SRG_STAT = "fa_srg_statistic",
  /** Кнопка "Подписание документов" */
  BACKOFFICE_SIGN = "backofficeSign",
  /** Кнопка "Агентские платежи" */
  BACKOFFICE_AGENCY_PAYMENTS = "backofficeAgencyPayments",
  /** Кнопка "Переводы" */
  BACKOFFICE_TRANSFER = "backofficeTransfer",
  // --------------- Конец кнопок под шестерёнкой -------------------
  /** Участники Smart */
  SMART_APPRAISERS = "#smartAppraisers",
  /** SmartОценка */
  SMART_REGION_PRICES = "#regionsPricesSmart",
  /** Отчёты ЗЗО */
  REPORTS_ZZO = "#assets_reports",
  /** История оценок */
  APPRAISAL_HISTORY = "#appraisal_history",
  /** кнопка выход */
  LOGOUT = "#logout",
  /** кнопка "сменить пароль" */
  CHANGE_PASSWORD = "#change_password",
  /** кнопка "скачать инструкцию" */
  BANK_README = "#user_manual",
  /** Заказы АИЖК */
  AIJK_ORDERS = "#aijk_orders",
  /** Новый заказ АИЖК */
  NEW_AIJK_ORDERS = "#aijk_order_new",
  /** кнопка "Экспресс-анализ" */
  EXPRESS_ANALYTICS = "#sbd_express_requests",
  /** Кнопка + рядом с "Экспресс-Анализ" */
  NEW_EXPRESS_ANALYTICS = "#sbd_express_request_flat_new",
  /** кнопка "Экспертная оценка" */
  EXPERT_APPRAISAL = "#sbd_expert_requests",
  /** Кнопка + рядом с "Экспертная Оценка" */
  NEW_EXPERT_APPRAISAL = "#sbd_expert_request_flat_new",
  /** Отчёты об оценке Сбербанк */
  SBD_ORDERS = "#sbd_orders",
  /** Отчёты об оценке (банк открытие) */
  OPENBANK_ORDERS = "#openbank_orders",
  /** реестр объектов */
  REGISTRY_REQUESTS = "#requests",
  REQUESTS_NEW = "#requestsNew",
  REQUESTS_OLD = "#requestsOld",
  /** новый запрос */
  NEW_REQUEST = "#request_flat_new",
  /** реестр отчётов */
  REGISTRY_REPORTS = "#reports",
  REPORTS_NEW = "#reportsNew",
  REPORTS_OLD = "#reportsOld",
  /** новый отчёт */
  NEW_REPORT = "#report_flat_new",
  /** реестр Верификаций */
  REGISTRY_VERIFICATION = "#verifications",
  /** реестр Жилых Домов */
  REGISTRY_COUNTRY_PROPERTY = "#country_property_reports",
  /** БЗО.ТС.Реестр оценок */
  REGISTRY_VEHICLE_REPORTS_BZO = "#valuation_orders",
  /** Новый заказ БЗО.ТС */
  VEHICLE_REPORTS_BZO_NEW = "#valuation_order_auto_new",
  /** Новый заказ БЗО.ТС - версия 2 */
  VEHICLE_REPORTS_BZO_NEW_v2 = "#valuation_order_auto_ver2_new",
  /** реестр Экспресс.ТС */
  REGISTRY_VEHICLE_REPORTS_EXPRESS = "#valuation_express_auto_reestr",
  /** новый заказ Экспресс.ТС */
  VEHICLE_REPORTS_EXPRESS_NEW = "#valuation_express_auto_new",
  /** новый заказ Экспресс.ТС - версия 2 */
  VEHICLE_REPORTS_EXPRESS_NEW_v2 = "#valuation_express_auto_ver2_new",
  /** реестр ЕГРН */
  REGISTRY_EGRN = "#egrn",
  /** заказ выписки ЕГРН */
  EGRN_REQUEST = "#egrn_new",
  /** реестр Коррекции */
  REGISTRY_CORRECTIONS = "#corrections",
  /** Реестр расчётов (байкал) */
  REGISTRY_BAIKAL_REQUESTS = "#rbRequests",
  /** * "Реестр заявок"
   * ** "реестр экспертов SRG"
   */
  REGISTRY_REQUESTS_EXPERT = "#expert_requests",
  /** Реестр переоценок */
  REGISTRY_REVALUATIONS = "#revaluation_reestr",
  /** * Новый запрос на переоценку
   * ** Кнопка "+" рядом с реестром переоценок
   */
  REVALUATION_NEW = "#revaluation_new",
  /** Реестр "Заказы Федерального оценщика".
   * Только для суперадмина
   */
  REGISTRY_FEDERAL_APPRAISER = "#fa_orders",
  FA_ORDERS_NEW = "#faOrderRequests",
  FA_ORDERS_OLD = "#faOrderRequestsOld",
  /** Реестр "Заказы Федерального оценщика".
   * публичный
   */
  REGISTRY_FEDERAL_APPRAISER_PUBLIC = "#fa_public_orders",
  /** Реестр ВТБ ИМ */
  REGISTRY_VTB_IM = "#vtbim_reestr",
  /** Реестр Архивов (отчёты о верификации) */
  REGISTRY_ARCHIVES = "#revaluation_archiveList",
  /** Электронная регистрация */
  ELECTRONIC_REGISTRATION = "#elreg",
  /** "Продажа недвижимости" ака "Аукцион" */
  ELECTRONIC_REGISTRATION_AUCTION = "#elreg_auction",
  /** Кнопка "Зайти под другим пользователем" */
  LOGIN_IMPERSONATE = "#user_impersonate",
  /** Реестр. `БЗО. Недвижимость_Заказ` */
  REGISTRY_ORDERS_DPA = "#dpaOrder",
  /** `БЗО. Недвижимость_Заказ -> Новый заказ` */
  ORDERS_DPA_NEW = "#vtb_dpa_order_new_list",
  /** Жилая недвижимость */
  ORDERS_DPA_NEW_CREATE_RESIDENTIAL = "#vtb_dpa_order_new_residential",
  /** Отчёты об оценке ВТБ */
  VTB_ORDERS = "#vtb_orders",
}

export let KronaNavigationButtonsPrimary = new Set<KronaNavigationButtons>([
  KronaNavigationButtons.AIJK_ORDERS,
  KronaNavigationButtons.NEW_AIJK_ORDERS,
  KronaNavigationButtons.EXPRESS_ANALYTICS,
  KronaNavigationButtons.NEW_EXPRESS_ANALYTICS,
  KronaNavigationButtons.EXPERT_APPRAISAL,
  KronaNavigationButtons.NEW_EXPERT_APPRAISAL,
  KronaNavigationButtons.SBD_ORDERS,
  KronaNavigationButtons.OPENBANK_ORDERS,
  KronaNavigationButtons.VTB_ORDERS,
  KronaNavigationButtons.REGISTRY_REQUESTS,
  KronaNavigationButtons.NEW_REQUEST,
  KronaNavigationButtons.REGISTRY_REPORTS,
  KronaNavigationButtons.NEW_REPORT,
  KronaNavigationButtons.REGISTRY_VERIFICATION,
  KronaNavigationButtons.REGISTRY_COUNTRY_PROPERTY,
  KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_BZO,
  KronaNavigationButtons.VEHICLE_REPORTS_BZO_NEW,
  KronaNavigationButtons.VEHICLE_REPORTS_BZO_NEW_v2,
  KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_EXPRESS,
  KronaNavigationButtons.VEHICLE_REPORTS_EXPRESS_NEW,
  KronaNavigationButtons.VEHICLE_REPORTS_EXPRESS_NEW_v2,
  KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER,
  KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER_PUBLIC,
  KronaNavigationButtons.REGISTRY_EGRN,
  KronaNavigationButtons.EGRN_REQUEST,
  KronaNavigationButtons.REGISTRY_CORRECTIONS,
  KronaNavigationButtons.REGISTRY_BAIKAL_REQUESTS,
  KronaNavigationButtons.REGISTRY_REQUESTS_EXPERT,
  KronaNavigationButtons.REGISTRY_REVALUATIONS,
  KronaNavigationButtons.REVALUATION_NEW,
  KronaNavigationButtons.REGISTRY_VTB_IM,
  KronaNavigationButtons.REGISTRY_ARCHIVES,
  KronaNavigationButtons.ELECTRONIC_REGISTRATION,
  KronaNavigationButtons.ELECTRONIC_REGISTRATION_AUCTION,
  KronaNavigationButtons.LOGIN_IMPERSONATE,
  KronaNavigationButtons.SMART_APPRAISERS,
  KronaNavigationButtons.SMART_REGION_PRICES,
  KronaNavigationButtons.REPORTS_ZZO,
  KronaNavigationButtons.APPRAISAL_HISTORY,
  KronaNavigationButtons.REGISTRY_ORDERS_DPA,
  KronaNavigationButtons.ORDERS_DPA_NEW,
]);

export let KronaNavigationButtonsAdvanced = new Set<KronaNavigationButtons>([
  KronaNavigationButtons.REPORTS_NEW,
  KronaNavigationButtons.REPORTS_OLD,
  KronaNavigationButtons.REQUESTS_NEW,
  KronaNavigationButtons.REQUESTS_OLD,
  KronaNavigationButtons.FA_ORDERS_NEW,
  KronaNavigationButtons.FA_ORDERS_OLD,
  KronaNavigationButtons.COMMERCIAL_REPORTS,
]);

export let SettingsKronaNavigationButtons = new Set<KronaNavigationButtons>([
  KronaNavigationButtons.PROJECT_PROP,
  KronaNavigationButtons.USER_REESTR,
  KronaNavigationButtons.COMPANIES,
  KronaNavigationButtons.EXPERT_REESTR,
  KronaNavigationButtons.EXPERT_DAILY_STAT,
  KronaNavigationButtons.ADDRESS_LIST,
  KronaNavigationButtons.MAILING_LIST,
  KronaNavigationButtons.AVERAGE_PRICES,
  KronaNavigationButtons.DIAGNOSTIC_CENTERS,
  KronaNavigationButtons.ACCREDITATIONS,
  KronaNavigationButtons.REVALUATION_REGISTRY,
  KronaNavigationButtons.FA_ADMIN,
  KronaNavigationButtons.FA_SRG_STAT,
  KronaNavigationButtons.BACKOFFICE_SIGN,
  KronaNavigationButtons.BACKOFFICE_AGENCY_PAYMENTS,
  KronaNavigationButtons.BACKOFFICE_TRANSFER,
]);

export let UserListKronaNavigationButtons = new Set<KronaNavigationButtons>([
  KronaNavigationButtons.LOGOUT,
  KronaNavigationButtons.CHANGE_PASSWORD,
  KronaNavigationButtons.BANK_README,
]);
