import { expect } from "chai";
import { getIdFromUrl } from "modules";
import options from "options";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
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
  KronaResidentialReportStatusesTranslated,
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
    expect(browser.getUrl()).to.include(`/requests`);
  });
  it(`Фильтрация по отчётам"`, function () {
    allureReporter.generateReport();
    kronaRequestsRegistry.select_status(KronaResidentialRequestStatus.AWAITS_EXPERT_VALUATION);
    kronaRequestsRegistry.select_objectType(KronaRequestObjectType.FLAT);
    // kronaRequestsRegistry.$filter_User.setValue("new_test");
    // kronaRequestsRegistry.$filter_dataFrom.clearValue()
    kronaRequestsRegistry.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Переход в карточку заявки`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).waitForDisplayed();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).click();
    kronaRequestCard.waitForLoad();
  });
  it(`Перейти в карточку эксперта`, function () {
    allureReporter.generateReport();
    let temp = getIdFromUrl();
    browser.url(options.krona.host + kronaExpertRequestCard.path + temp);
    kronaExpertRequestCard.waitForLoad(false);
  });
  it(`Проверка необходимости подтверждения старшим экспертом перед заполнением`, function () {
    allureReporter.generateReport();
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
    kronaExpertRequestCard.fillDataFromAnotherRequest("251518");
    console.log(`Тестовый расчёт эксперта => `, browser.getUrl());

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
    let appraisalObjectTotalSpace: string = kronaExpertRequestCard.$info_objectTotalSpace.getText();

    // Проставляем площадь - потому что шаг между полями аналогов = 2 (из-за корректировок)
    for (let comparable = 1; comparable < 6; comparable += 2) {
      let target = kronaExpertRequestCard.comparables(
        comparable,
        KronaExpertResponseComparableFieldNames.TOTAL_SPACE
      );
      target.scrollIntoView();
      target.waitForClickable({
        timeout: 2000,
        timeoutMsg: `Не получается изменить данные поля ${KronaExpertResponseComparableFieldNames.TOTAL_SPACE} у аналога ${comparable}`,
      });
      target.clearValue();
      target.setValue(appraisalObjectTotalSpace);
    }
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

    // kronaExpertRequestCard.comparables(1, KronaExpertResponseComparableFieldNames.PRICE).click()
  });
  it(`Подтвердить заявку`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.commitExpertResponse();
  });
  it(`Проверка изменения статуса`, function () {
    allureReporter.generateReport();
    let temp = getIdFromUrl();
    browser.url(options.krona.host + kronaRequestCard.path + temp);

    kronaRequestCard.waitForLoad();
    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.be.equal(
      KronaResidentialReportStatusesTranslated.ACCEPTED_EXPERT_VALUATION
    );
    // makeScreenshot("SMOKE_оценкаЭксперта_расчёт");
    // kronaFooter.$link_sendMail.scrollIntoView();
    // makeScreenshot("SMOKE_оценкаЭксперта_таблицаАналогов");
  });
});
