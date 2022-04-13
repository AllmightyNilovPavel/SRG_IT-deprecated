import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { getIdFromUrl } from "modules";
import options from "../../options";
import {
  kronaExpertRequestCard,
  kronaFooter,
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  kronaRequestCard,
  kronaReports,
  KronaCompanyName,
  KronaDataType,
  KronaResidentialRequestStatus,
  KronaReportObjectType,
  KronaNavigationButtons,
  KronaExpertResponseComparableFieldNames,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe.skip(`КРОНА. Оценка экспертом заявки из БО с фотками`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
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
  it(`Открыть реестр отчётов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Отфильтровать отчёты по статусу`, function () {
    allureReporter.generateReport();
    kronaReports.select_status(KronaResidentialRequestStatus.AWAITS_EXPERT_VALUATION);
    kronaReports.select_objectType(KronaReportObjectType.FLAT);
    // kronaReports.select_bank(KronaCompanyName.URALSIB);
    kronaReports.$filter_dataFrom.clearValue();
    kronaReports.$filter_Customer.setValue("Иванов");
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Перейти в карточку эксперта`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.EXPERT).scrollIntoView();
    kronaResultTable.resultTableGetData(KronaDataType.EXPERT).click();
    kronaExpertRequestCard.$map.waitForDisplayed({ timeout: 10000, reverse: false });

    console.log(`Тестовый расчёт => `, browser.getUrl());
  });
  it(`Назначить заявку себе`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
  });
  it(`Посмотреть фотки`, function () {
    allureReporter.generateReport();
    browser.refresh();
    kronaExpertRequestCard.waitForLoad(true);
  });
  it(`Проверка необходимости подтверждения старшим экспертом`, function () {
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
  it(`Посмотреть историю по дому`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.$modal_houseHistory.scrollIntoView();
    kronaExpertRequestCard.$button_houseHistory.click();
    kronaExpertRequestCard.$table_houseHistory.waitForDisplayed({ timeout: 10000, reverse: false });
    kronaExpertRequestCard.$button_closeHouseHistory.scrollIntoView();
    kronaExpertRequestCard.$button_closeHouseHistory.click();
    kronaExpertRequestCard.$modal_houseHistory.waitForDisplayed({ timeout: 5000, reverse: true });
  });
  it(`Посмотреть дубли`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.$button_duplicateHistory.click();
    kronaExpertRequestCard.$table_duplicateHistory.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    kronaExpertRequestCard.$button_closeDuplicateHistory.scrollIntoView();
    kronaExpertRequestCard.$button_closeDuplicateHistory.click();
    kronaExpertRequestCard.$modal_duplicateHistory.waitForDisplayed({
      timeout: 5000,
      reverse: true,
    });
  });
  it(`Заполнить аналоги из другой заявки`, function () {
    allureReporter.generateReport();
    // browser.debug();
    kronaExpertRequestCard.$input_autoFillComparables.scrollIntoView();
    kronaExpertRequestCard.$input_autoFillComparables.setValue(`251518`);
    kronaExpertRequestCard.$button_fillComparables.click();
    browser.pause(500);
  });
  it(`Сохранить черновик после заполнения данных из другой заявки.`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.$button_saveResponse.scrollIntoView();
    kronaExpertRequestCard.$button_saveResponse.click();
    kronaExpertRequestCard.$modal_succesfullDraftSave.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    browser.refresh();
    kronaExpertRequestCard.waitForLoad(true);
  });
  it(`Изменить стоимость аналогов`, function () {
    allureReporter.generateReport();
    let appraisalObjectPrice: string = kronaExpertRequestCard.$info_objectPriceInReport.getText();
    console.log(`Цена Объекта Оценки = `, appraisalObjectPrice);

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
      target.click();
      target.clearValue();
      target.setValue(appraisalObjectPrice);
    }
    browser.keys("TAB");
  });
  it(`Сохранить черновик перед подтверждением расчёта.`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.$button_saveResponse.scrollIntoView();
    kronaExpertRequestCard.$button_saveResponse.click();
    kronaExpertRequestCard.$modal_succesfullDraftSave.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    browser.refresh();
  });
  it(`Подтвердить заявку`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.waitForLoad(true);
    // browser.debug()
    kronaExpertRequestCard.commitExpertResponse();
    // kronaExpertRequestCard.$button_sendResponse.click();
  });
  // it(`Обработать всплывающее окно с торгом`, function () {
  //   allureReporter.generateReport();
  //   kronaExpertRequestCard.$modal_checkPrice.isDisplayed();
  //   kronaExpertRequestCard.$button_checkPriceOk.click();
  //   kronaExpertRequestCard.$modal_checkPrice.waitForDisplayed({ timeout: 10000, reverse: true });
  //   // browser.pause(1000);
  // });
  // it(`Обработать вплывающее окно с подтверждением`, function () {
  //   allureReporter.generateReport();
  //   kronaExpertRequestCard.$modal_submitExpertResponse.waitForExist({
  //     timeout: 5000,
  //     reverse: false,
  //   });
  //   kronaExpertRequestCard.$input_submitExpertComment.waitForClickable();
  //   kronaExpertRequestCard.$input_submitExpertComment.setValue(
  //     `Эта заявка обработана автотестом ${new Date().toString()}`
  //   );
  //   kronaExpertRequestCard.$button_submitExpertResponseOk.click();
  //   // browser.pause(1000);
  // });
  // it(`Обработка смены окна подтверждения на окно уведомления`, function () {
  //   allureReporter.generateReport();
  //   kronaExpertRequestCard.$modal_succesfullSave.waitForDisplayed({
  //     timeout: 10000,
  //     reverse: false,
  //   });
  //   browser.refresh();
  //   kronaExpertRequestCard.$table_requestSourceInfo.waitForDisplayed({
  //     timeout: 5000,
  //     reverse: false,
  //   });
  // });
  // it(`Проверка необходимости подтверждения старшим экспертом`, function () {
  //   allureReporter.generateReport();
  //   if (kronaExpertRequestCard.$button_approveResponse.isDisplayedInViewport() === true) {
  //     kronaExpertRequestCard.$button_approveResponse.scrollIntoView();
  //     kronaExpertRequestCard.$button_approveResponse.click();
  //     kronaExpertRequestCard.$approveResponseModalRoot.waitForDisplayed({
  //       timeout: 5000,
  //       reverse: false,
  //     });
  //     kronaExpertRequestCard.$approveResponseModalButtonYes.click();
  //     browser.pause(750);
  //   }
  // });
  it(`Проверка изменения статуса`, function () {
    allureReporter.generateReport();
    let temp = getIdFromUrl();
    browser.url(options.krona.host + kronaRequestCard.path + temp);
    browser.pause(3000);
    // kronaRequestCard.$table_requestSourceInfo.waitForDisplayed({ timeout: 5000});
    makeScreenshot("SMOKE_оценкаЭксперта_расчёт");
    kronaFooter.$link_sendMail.scrollIntoView();
    makeScreenshot("SMOKE_оценкаЭксперта_таблицаАналогов");
  });
});
//
