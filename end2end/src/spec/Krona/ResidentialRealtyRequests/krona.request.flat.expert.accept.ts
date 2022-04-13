import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { getIdFromUrl } from "modules";
import options from "../../../options";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  kronaExpertRequestCard,
  kronaRequestCard,
  kronaRequestsRegistry,
  KronaRequestObjectType,
  KronaResidentialRequestStatus,
  KronaDataType,
  kronaFooter,
  KronaNavigationButtons,
  KronaExpertResponseComparableFieldNames,
  requestsCreateFlat,
  ValuationResultData,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. Оценка экспертом заявки из Кроны без фото.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
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
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();
    expect(requestsCreateFlat.$map.isExisting()).to.be.true;
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    expect(browser.getUrl()).to.include(`request/flat/new`);
    requestsCreateFlat.fullfillFlatRequest(TestDataKrona.Request.Flat.IDEAL);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport();

    requestsCreateFlat.$button_buttonSend.click();
    requestsCreateFlat.waitForResult(ValuationResultData.STATUS);
  });
  it(`Открыть "Реестра Объектов"`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaResultTable.waitForLoad();
    // expect(browser.getUrl()).to.include(`/kronaRequestsRegistry`);
  });
  it(`Фильтрация по отчётам"`, function () {
    allureReporter.generateReport();
    kronaRequestsRegistry.select_status(KronaResidentialRequestStatus.AWAITS_EXPERT_VALUATION);
    kronaRequestsRegistry.select_objectType(KronaRequestObjectType.FLAT);
    kronaRequestsRegistry.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Переход в карточку заявки`, function () {
    allureReporter.generateReport();
    browser.waitUntil(() =>
      kronaResultTable.resultTableGetData(KronaDataType.REQUEST).isDisplayed()
    );
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).scrollIntoView();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).click();
  });
  it(`Перейти в карточку эксперта`, function () {
    allureReporter.generateReport();
    let temp = getIdFromUrl();
    browser.url(options.krona.host + kronaExpertRequestCard.path + temp);
    kronaExpertRequestCard.$table_requestSourceInfo.waitForDisplayed({
      timeout: 5000,
      reverse: false,
    });
    browser.pause(1500);
  });
  it(`Проверка необходимости подтверждения старшим экспертом перед заполнением`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.waitForLoad(false);
    kronaFooter.$link_sendMail.scrollIntoView();
    if (kronaExpertRequestCard.$button_approveResponse.isDisplayedInViewport() === true) {
      kronaExpertRequestCard.$button_approveResponse.scrollIntoView();
      kronaExpertRequestCard.$button_approveResponse.click();
      kronaExpertRequestCard.$approveResponseModalRoot.waitForDisplayed({
        timeout: 5000,
        reverse: false,
      });
      kronaExpertRequestCard.$approveResponseModalButtonYes.click();
      browser.pause(500);
    }
  });
  it(`Назначить заявку на себя`, function () {
    allureReporter.generateReport();
    browser.refresh();
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.waitForLoad(false);
  });
  it(`Посмотреть историю по дому`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.checkHouseHistory();
  });
  it(`Посмотреть дубли`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.checkDoubles();
  });
  it(`Заполнить аналоги из другой заявки`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.$input_autoFillComparables.scrollIntoView();
    kronaExpertRequestCard.$input_autoFillComparables.setValue("251518");
    kronaExpertRequestCard.$button_fillComparables.click();
    browser.pause(1000);

    let autofillCheck = kronaExpertRequestCard
      .comparables(1, KronaExpertResponseComparableFieldNames.HYPERLINK)
      .$(`//a`)
      .getAttribute("href");
    // console.log(autofillCheck);
    expect(autofillCheck).to.be.not.empty;
  });
  it(`Изменить стоимость аналогов`, function () {
    allureReporter.generateReport();

    let appraisalObjectPrice: string = kronaExpertRequestCard.$info_objectPriceInReport.getText();

    // Проставляем стоимость (шаг аналогов = 1)
    for (let comparable = 1; comparable < 4; comparable++) {
      let target = kronaExpertRequestCard.comparables(
        comparable,
        KronaExpertResponseComparableFieldNames.PRICE
      );
      target.scrollIntoView();
      target.waitForClickable({
        timeout: 2000,
        timeoutMsg: `Не получается изменить данные поля ${KronaExpertResponseComparableFieldNames.PRICE} у аналога ${comparable}`,
      });
      target.clearValue();
      target.setValue(appraisalObjectPrice);
    }
    for (let comparable = 1; comparable < 6; comparable += 2) {
      let target = kronaExpertRequestCard.comparables(
        comparable,
        KronaExpertResponseComparableFieldNames.REPAIRS_TYPE
      );
      target.scrollIntoView();
      target.waitForClickable({
        timeout: 2000,
        timeoutMsg: `Не получается изменить данные поля ${KronaExpertResponseComparableFieldNames.REPAIRS_TYPE} у аналога ${comparable}`,
      });
      // target.clearValue()
      target.selectByIndex(3);
    }
  });
  it(`Подтвердить заявку`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.commitJuniorAnalystResponse();
    kronaExpertRequestCard.commitSeniorAnalystResponse();
  });
  it(`Проверка изменения статуса`, function () {
    allureReporter.generateReport();
    let temp = getIdFromUrl();
    browser.url(options.krona.host + kronaRequestCard.path + temp);
    browser.pause(5000);
    console.log("Test URL => ", browser.getUrl());
    // kronaRequestCard.$table_requestSourceInfo.waitForDisplayed({ timeout: 5000});
    makeScreenshot("SMOKE_оценкаЭксперта_расчёт");
    kronaFooter.$link_sendMail.scrollIntoView();
    makeScreenshot("SMOKE_оценкаЭксперта_таблицаАналогов");
  });
});
