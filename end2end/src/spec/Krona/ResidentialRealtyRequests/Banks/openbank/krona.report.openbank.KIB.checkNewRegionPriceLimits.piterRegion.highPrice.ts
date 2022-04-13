import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  KronaDataType,
  kronaExpertRequestCard,
  KronaExpertResponseComparableFieldNames,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaRequestCard,
  KronaResidentialReportStatusesTranslated,
  kronaResultTable,
  reportsCreateFlat,
  requestsCreateFlat,
  ValuationResultData,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { getIdFromUrl, makeScreenshot } from "modules";
import { KronaTestDataOpenbankReportsOverprice } from "options/testData/krona/testData/banks/openbank/reports/krona.testData.openbank.reports";

describe(`КРОНА. ОТЧЁТ. ОТКРЫТИЕ. КИБ. Новые условия проверки дорогих объектов. Ленинградская область. Больше лимита.`, function () {
  let requestId: string = "";
  const TestData = KronaTestDataOpenbankReportsOverprice.FLAT.PITER_REGION.HIGH_PRICE;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-34185",
  });
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_KIB,
      TestDataKrona.Users.password.openbank.autotest_KIB
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REPORT);
    reportsCreateFlat.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport({
      description: `Создаём запрос стоимости с ценой 50 млн чтобы
      проверить попадание на проверку SRG. \n
      Данные объекта оценки:
      ${JSON.stringify(TestData, void 2, 2)}`,
    });
    browser.refresh();
    reportsCreateFlat.waitForLoad();

    reportsCreateFlat.FullfillFlatRequest(TestData);
    reportsCreateFlat.FullfillReportData(KronaTestDataOpenbankReportsOverprice.REPORT_DATA);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport({
      additionalArguments: [
        {
          argName: "Номер кредитной заявки",
          argValue: `${TestData.custom1}`,
        },
      ],
      description: `Статус запроса должен быть "${KronaResidentialReportStatusesTranslated.AWAITS_EXPERT_VALUATION}"`,
    });

    reportsCreateFlat.$button_buttonSend.click();
    browser.waitUntil(() => browser.getUrl().match("/9r/reports") != null, {
      timeout: 30000,
      timeoutMsg: `Ошибка отпарвки отчёта на верификацию`,
    });
  });
  // it(`Находим объект в реестре`, function () {
  //   allureReporter.generateReport({ description: `` });
  //   kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
  //   kronaFiltersBox.waitForLoad();
  //   kronaFiltersBox.inputCustomField(TestData.custom1, 1);

  //   kronaFiltersBox.showResults();
  //   kronaResultTable.waitForLoad();
  //   let request = kronaResultTable.resultTableGetData(KronaDataType.REQUEST);

  //   request.waitForClickable();
  //   request.click();
  //   kronaRequestCard.waitForLoad();
  //   requestId = getIdFromUrl();
  // });
  it(`Перезаходим под суперадмином`, function () {
    allureReporter.generateReport({
      description: `Перезаходим в систему под суперадмином SRG для оценки`,
    });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaFiltersBox.waitForLoad();
    kronaFiltersBox.inputReportNumber(
      KronaTestDataOpenbankReportsOverprice.REPORT_DATA.reportNumber
    );

    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad();
    let request = kronaResultTable.resultTableGetData(KronaDataType.REQUEST);

    request.waitForClickable();
    request.click();
    kronaExpertRequestCard.waitForLoad(false);
    requestId = getIdFromUrl();
  });
  it(`Оцениваем запрос`, function () {
    allureReporter.generateReport({
      description: `
      * Находим запрос в реестре объектов
      * Переходим в карточку расчёта эксперта
      * Оцениваем запрос дороже 50 млн`,
    });
    // kronaExpertRequestCard.goToExpertRequestCard(requestId);
    // kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.fillDataFromAnotherRequest("282333");
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
    for (let i = 1; i < 4; i++) {
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.PRICE)
        .setValue(TestData.price + 5000000);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.TOTAL_SPACE)
        .setValue(TestData.total_space);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.REPAIRS_TYPE)
        .selectByIndex(TestData.flatRepairs_index);
    }
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.commitJuniorAnalystResponse();
    kronaExpertRequestCard.confirmationBySenior();
  });
  it(`Проверяем статус`, function () {
    allureReporter.generateReport({
      description: `Так как цена запроса больше 50 млн и эксперт оценил дороже 50 млн - статус запроса после верификации должен быть "${KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION}"`,
    });
    kronaRequestCard.goToRequestCard(requestId);
    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.include(
      KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION
    );
    makeScreenshot("check status after expert verification");
  });
});
