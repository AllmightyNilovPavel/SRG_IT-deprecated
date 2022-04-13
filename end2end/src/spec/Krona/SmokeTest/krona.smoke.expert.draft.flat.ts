import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import options from "../../../options";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  kronaReports,
  kronaExpertRequestCard,
  KronaDataType,
  KronaResidentialRequestStatus,
  KronaNavigationButtons,
  KronaReportObjectType,
  KronaExpertResponseComparableFieldNames,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe("КРОНА. СМОК. Проверка сохранения черновика расчёта эксперта.", function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  let testUrl = "test.srg-it.ru";

  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открытие "реестра отчётов"`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Фильтр по отчётам в статусе "окончание вериф..."`, function () {
    allureReporter.generateReport();
    kronaReports.select_status(KronaResidentialRequestStatus.AWAITS_EXPERT_VALUATION);
    kronaReports.select_objectType(KronaReportObjectType.FLAT);
    kronaReports.$filter_dataFrom.clearValue();
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Переход в карточку оценки эксперта`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.EXPERT).click();
    kronaExpertRequestCard.$table_requestSourceInfo.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    makeScreenshot("SMOKE_КарточкаРасчётаЭксперта");
  });
  it(`Отказ от просмотра фоток`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
  });
  it(`Заполнение ссылки у аналога`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard
      .comparables(1, KronaExpertResponseComparableFieldNames.INFO_LINK)
      .scrollIntoView();
    kronaExpertRequestCard
      .comparables(1, KronaExpertResponseComparableFieldNames.INFO_LINK)
      .setValue(testUrl);
  });
  it(`Сохранение черновика`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.saveResonseDraft();
  });
  it(`Обновление страницы и скриншот`, function () {
    allureReporter.generateReport();
    browser.refresh();
    kronaExpertRequestCard.$table_requestSourceInfo.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    kronaExpertRequestCard
      .comparables(1, KronaExpertResponseComparableFieldNames.INFO_LINK)
      .scrollIntoView();
    // проверка что черновик сохранился
    let temp = kronaExpertRequestCard
      .comparables(1, KronaExpertResponseComparableFieldNames.INFO_LINK)
      .getValue();
    expect(temp).to.be.equal(testUrl);
    makeScreenshot("SMOKE_КарточкаРасчётаЭксперта_2");
  });
});
