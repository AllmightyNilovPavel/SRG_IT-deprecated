import { KronaNavigationButtons, KronaNavigationButtonsPrimary } from "./Enums";

class KronaNavigationBar {
  /** Основной блок меню */
  private get $class_menu() {
    return browser.$('div[class="menu"]');
  }
  private get $block_advActions() {
    return this.$class_menu.$(`div[class="navbar pull-right"]`);
  }
  /** кнопка "выход" */
  private get $button_logout() {
    return this.$block_advActions.$("[href='/9r/logout']");
  }
  private get $icon_user() {
    return this.$block_advActions.$(`i.fa-user`);
  }
  private get $icon_settings() {
    return this.$block_advActions.$(`i.fa-cog`);
  }
  private get $icon_statistics() {
    return this.$block_advActions.$(`i.fa-area-chart`);
  }

  /** кнопка "сменить пароль" */
  get $button_changePassword() {
    return this.$block_advActions.$('a[title="Смена пароля"]');
  }
  /** кнопка "скачать инструкцию" */
  get $button_bankReadme() {
    return this.$block_advActions.$('a[title="Инструкция для пользователей"]');
  }
  /** кнопка Заказы АИЖК */
  get $button_aijkOrders() {
    return this.$class_menu.$(`a[href*="aijk/order"]`);
  }
  /** Новый заказ АИЖК */
  get $button_newAijkOrder() {
    return this.$class_menu.$('a[href="/9r/aijk/order/new"]');
  }
  /** кнопка "Экспресс-анализ" */
  public get $button_expressAnalytics() {
    return this.$class_menu.$(`a[href="/9r/sbd/express/requests"]`);
  }
  /** кнопка "Экспресс-анализ" */
  public get $button_newExpressAnalytics() {
    return this.$class_menu.$(`a[href="/9r/sbd/express/request/flat/new"]`);
  }
  /** кнопка "Экспертная оценка" */
  public get $button_expertAppraise() {
    return this.$class_menu.$(`a[href="/9r/sbd/expert/requests"]`);
  }
  /** кнопка "Экспертная оценка" */
  public get $button_newExpertAppraise() {
    return this.$class_menu.$(`a[href="/9r/sbd/expert/request/flat/new"]`);
  }
  /** Отчёты об оценке Сбербанк */
  get $button_sbdOrders() {
    return this.$class_menu.$('a[href="/9r/sbd/orders"]');
  }
  /** Отчёты об оценке (банк открытие) */
  get $button_openbankOrders() {
    return this.$class_menu.$('a[href="/9r/openbank/orders"]');
  }
  /** реестр объектов */
  get $button_Requests() {
    return this.$class_menu.$('a[href="/9r/requests"]');
  }
  /** новый запрос на оценку ОБЪЕКТА */
  get $button_newRequest() {
    return this.$class_menu.$('a[href="/9r/request/flat/new"]');
  }
  /** реестр отчётов */
  get $button_Reports() {
    return this.$class_menu.$('a[href="/9r/kronaReports"]');
  }
  /** новый запрос на оценку ОТЧЁТА */
  get $button_newReport() {
    return this.$class_menu.$('a[href="/9r/report/flat/new"]');
  }
  /** реестр Верификаций */
  get $button_verificationReestr() {
    return browser.$('a[href="/9r/verifications"]');
  }
  /** реестр Жилых Домов */
  get $button_countryProperty() {
    return browser.$('a[href="/9r/country_property/kronaReports"]');
  }
  /** отчёты по авто (ВТБ) */
  get $button_vehicleBzoReports() {
    return browser.$('a[href="/9r/valuation/orders"]');
  }
  /** новый отчёт по авто (ВТБ) */
  get $button_newVehicleBzoReport() {
    return browser.$('a[href="/9r/valuation/order/auto/new"]');
  }
  /** новый отчёт по авто (ВТБ) - версия 2 */
  get $button_newVehicleBzoReport_v2() {
    return browser.$('a[href="/9r/valuation/order/auto/ver2/new"]');
  }
  /** реестр "быстрых" отчётов по авто */
  get $button_vehicleReportsExpress() {
    return browser.$('a[href="/9r/valuation/express/auto/reestr"]');
  }
  /** новый "быстрый" отчёт по авто */
  get $button_newVehicleExpressReport() {
    return browser.$('a[href="/9r/valuation/express/auto/new"]');
  }
  /** новый "быстрый" отчёт по авто - версия 2 */
  get $button_newVehicleExpressReport_v2() {
    return browser.$('a[href="/9r/valuation/express/auto/ver2/new"]');
  }
  /** реестр ЕГРН */
  get $button_EGRN() {
    return browser.$('a[href="/9r/egrn"]');
  }
  /** заказ выписки ЕГРН */
  get $button_EGRNrequest() {
    return browser.$('a[href="/9r/egrn/new"]');
  }
  /** реестр Коррекции */
  get $button_correctionReestr() {
    return browser.$('a[href="/9r/corrections"]');
  }
  /** Реестр расчётов (байкал) */
  get $button_rbRequests() {
    return browser.$('a[href="/9r/rbRequests"]');
  }
  /** "реестр заявок" - ака "реестр экспертов SRG" */
  get $button_expertRequests() {
    return browser.$('a[href="/9r/expert/requests"]');
  }
  /** Реестр переоценок */
  get $button_revaluationReestr() {
    return browser.$('a[href="/9r/revaluation/reestr"]');
  }
  /** новый запрос на переоценку */
  get $button_newRevaluation() {
    return browser.$('a[href="/9r/revaluation/new"]');
  }
  /** реестр федерального оценщика */
  get $button_federalAppraiser() {
    return this.$class_menu.$('a[href="/9r/fa/orders"]');
  }
  /** реестр ВТБ ИМ */
  get $button_vtbIM() {
    return browser.$('a[href="/9r/vtbim/reestr"]');
  }
  /** реестр Архивов (отчёты о верификации) */
  get $button_archives() {
    return browser.$('a[href="/9r/revaluation/archiveList"]');
  }
  /** Электронная регистрация */
  get $button_elReg() {
    return browser.$('a[href="/9r/elreg"]');
  }
  /** "Продажа недвижимости" ака "Аукцион" */
  get $button_auction() {
    return browser.$('a[href="/9r/elreg/auction"]');
  }
  /** вход под другим юзером */
  get $button_impersonateLogin() {
    return this.$class_menu.$('a[href="/9r/user/impersonate"]');
  }
  private get $modal_browserInform() {
    return $(`#decisionForm`);
  }
  private get $button_browserInformClose() {
    return $(`#getMassage`);
  }
  // -------------------------------------------------------------------------------
  //                                    Функции
  // -------------------------------------------------------------------------------
  waitForLoad() {
    this.$icon_user.waitForExist();
    if (this.$modal_browserInform.isDisplayed()) this.$button_browserInformClose.click();
    this.$icon_user.waitForClickable();
  }
  /** Функция выхода */
  logout() {
    this.$icon_user.click();
    this.$button_logout.waitForDisplayed({});
    this.$button_logout.click();
  }
  /**
   * Функция перехода по кнопкам основного (верхнего меню)
   *
   * @param button - кнопка на которую надо перейти (`KronaNavigationButtons`)
   */
  navigate_to(button: KronaNavigationButtons) {
    if (button === undefined || button === null) return console.error("Отсутствует аргумент.");
    // Проверяем принадлежность параметра основному набору кнопок
    else if (KronaNavigationButtonsPrimary.has(button))
      return this.$class_menu.$(`${button}`).click();
    // если он не принадлежит первому енаму - дёргаем второй
    else {
      this.$icon_settings.click();
      this.$block_advActions.$(`${button}`).waitForDisplayed({});
      this.$block_advActions.$(`${button}`).click();
    }
  }
}
/** Верхнее меню с кнопками */
export const kronaNavigationBar = new KronaNavigationBar();
