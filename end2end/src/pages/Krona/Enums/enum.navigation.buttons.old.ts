/** Кнопки Перехода верхнего меню */
export enum NavigationButtons {
  PROJECT_PROP = "#project_properties",
  /** кнопка "Пользователи" */
  USER_REESTR = "#userreestr",
  /** кнопка "Компании" */
  COMPANIES = "#companies",
  /** кнопка "Диагностические центры" */
  DIAGNOSTIC_CENTERS = "#diagnostic_center_list",
  /** кнопка "Аккредитация" */
  ACCREDITATIONS = "#accreditations_list",
  /** кнопка выход */
  logout = '[href="/9r/logout"]',
  /** кнопка "сменить пароль" */
  changePassword = 'a[title="Смена пароля"]',
  /** кнопка "скачать инструкцию" */
  bankReadme = 'a[title="Инструкция для пользователей"]',
  /** Заказы АИЖК */
  aijkOrders = 'a[href*="aijk/order"]',
  /** Новый заказ АИЖК */
  newAijkOrder = 'a[href="/9r/aijk/order/new"]',
  /** кнопка "Экспресс-анализ" */
  expressAnalytics = 'a[href="/9r/sbd/express/requests"]',
  /** Кнопка + рядом с "Экспресс-Анализ" */
  newExpressAnalytics = 'a[href="/9r/sbd/express/request/flat/new"]',
  /** кнопка "Экспертная оценка" */
  expertAppraise = 'a[href="/9r/sbd/expert/requests"]',
  /** Кнопка + рядом с "Экспертная Оценка" */
  newExpertAppraise = 'a[href="/9r/sbd/expert/request/flat/new"]',
  /** Отчёты об оценке Сбербанк */
  sbdOrders = 'a[href="/9r/sbd/orders"]',
  /** Отчёты об оценке (банк открытие) */
  openbankOrders = 'a[href="/9r/openbank/orders"]',
  /** реестр объектов */
  Requests = 'a[href="/9r/requests"]',
  /** новый запрос */
  newRequest = 'a[href="/9r/request/flat/new"]',
  /** реестр отчётов */
  Reports = 'a[href="/9r/reports"]',
  /** новый отчёт */
  newReport = 'a[href="/9r/report/flat/new"]',
  /** реестр Верификаций */
  verificationReestr = 'a[href="/9r/verifications"]',
  /** реестр Жилых Домов */
  countryProperty = 'a[href="/9r/country_property/reports"]',
  /** БЗО.ТС.Реестр оценок */
  vehicleBzoReports = 'a[href="/9r/valuation/orders"]',
  /** Новый заказ БЗО.ТС */
  newVehicleBzoReport = 'a[href="/9r/valuation/order/auto/new"]',
  /** Новый заказ БЗО.ТС - версия 2 */
  newVehicleBzoReport_v2 = 'a[href="/9r/valuation/order/auto/ver2/new"]',
  /** реестр Экспресс.ТС */
  vehicleReportsExpress = 'a[href="/9r/valuation/express/auto/reestr"]',
  /** новый заказ Экспресс.ТС */
  newVehicleExpressReport = 'a[href="/9r/valuation/express/auto/new"]',
  /** новый заказ Экспресс.ТС - версия 2 */
  newVehicleExpressReport_v2 = 'a[href="/9r/valuation/express/auto/ver2/new"]',
  /** реестр ЕГРН */
  EGRN = 'a[href="/9r/egrn"]',
  /** заказ выписки ЕГРН */
  EGRNrequest = 'a[href="/9r/egrn/new"]',
  /** реестр Коррекции */
  correctionReestr = 'a[href="/9r/corrections"]',
  /** Реестр расчётов (байкал) */
  rbRequests = 'a[href="/9r/rbRequests"]',
  /** * "Реестр заявок"
   * ** "реестр экспертов SRG"
   */
  expertRequests = 'a[href="/9r/expert/requests"]',
  /** Реестр переоценок */
  revaluationReestr = 'a[href="/9r/revaluation/reestr"]',
  /** * Новый запрос на переоценку
   * ** Кнопка "+" рядом с реестром переоценок
   */
  newRevaluation = 'a[href="/9r/revaluation/new"]',
  /** * Реестр "Заказы Федерального оценщика"
   * ** Если ВТБ - "Стол Заказов"
   */
  federalAppraiser = 'a[href="/9r/fa/orders"]',
  /** Реестр ВТБ ИМ */
  vtbIM = 'a[href="/9r/vtbim/reestr"]',
  /** Реестр Архивов (отчёты о верификации) */
  archives = 'a[href="/9r/revaluation/archiveList"]',
  /** Электронная регистрация */
  elReg = 'a[href="/9r/elreg"]',
  /** "Продажа недвижимости" ака "Аукцион" */
  auction = 'a[href="/9r/elreg/auction"]',
  /** Кнопка "Зайти под другим пользователем" */
  impersonateLogin = 'a[href="/9r/user/impersonate"]',
}

export let NavigationButtonsPrimary = new Set<NavigationButtons>([
  NavigationButtons.aijkOrders,
  NavigationButtons.newAijkOrder,
  NavigationButtons.expressAnalytics,
  NavigationButtons.newExpressAnalytics,
  NavigationButtons.expertAppraise,
  NavigationButtons.newExpertAppraise,
  NavigationButtons.sbdOrders,
  NavigationButtons.openbankOrders,
  NavigationButtons.Requests,
  NavigationButtons.newRequest,
  NavigationButtons.Reports,
  NavigationButtons.newReport,
  NavigationButtons.verificationReestr,
  NavigationButtons.countryProperty,
  NavigationButtons.vehicleBzoReports,
  NavigationButtons.newVehicleBzoReport,
  NavigationButtons.newVehicleBzoReport_v2,
  NavigationButtons.vehicleReportsExpress,
  NavigationButtons.newVehicleExpressReport,
  NavigationButtons.newVehicleExpressReport_v2,
  NavigationButtons.EGRN,
  NavigationButtons.EGRNrequest,
  NavigationButtons.correctionReestr,
  NavigationButtons.rbRequests,
  NavigationButtons.expertRequests,
  NavigationButtons.revaluationReestr,
  NavigationButtons.newRevaluation,
  NavigationButtons.federalAppraiser,
  NavigationButtons.vtbIM,
  NavigationButtons.archives,
  NavigationButtons.elReg,
  NavigationButtons.auction,
  NavigationButtons.impersonateLogin,
]);

export let NavigatinButtonsSecondary = new Set<NavigationButtons>([
  NavigationButtons.ACCREDITATIONS,
  NavigationButtons.COMPANIES,
  NavigationButtons.PROJECT_PROP,
  NavigationButtons.USER_REESTR,
  NavigationButtons.DIAGNOSTIC_CENTERS,
]);
