import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialBanks,
  BA_reportPrice,
  BaActionsWorkJournal,
  baClassicNavMenu,
  BaNavigationButtons,
  baClassicPayHistory,
  BaDocumentVersionForLoading,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`BA. CLASSIC. VTB. RESIDENTIAL. Отчёт. Квартира. Проверка оплаты.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let UniqueReportNumber = "Autotest_payCheck_" + String(Date.now());
  let testReportUrl = "";
  let moneyCountAtStart;
  let moneyCountAfterPay;
  // ------------------------------- Начало выполнения предусловий -----------------------------------------
  it(`Логин в БО под Зарницей`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });
  it(`Сохранение количества средств ОК в начале теста`, function () {
    allureReporter.generateReport();
    moneyCountAtStart = baMainPage.getCompanyMoneyData();
  });
  it(`Создать новый отчёт по квартире`, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    baMainPage.$modal_reportSelection.waitForDisplayed({});
    baMainPage.$button_CreateNewReport.click();
    baReportPage.waitForLoad();
  });
  it(`Выбор банка ВТБ`, function () {
    allureReporter.generateReport();
    baReportPage.setReportData(BaResidentialBanks.VTB, UniqueReportNumber);
    baReportPage.$button_saveReport.scrollIntoView();
    baReportPage.saveReport();
  });
  it(`Обновить страницу`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();

    testReportUrl = browser.getUrl();
    console.log(`Ссылка на тестовый отчёт: `, testReportUrl);
  });
  // ---------------------------- Окончание выполнения предусловий -------------------------------------
  it(`Нажатие кнопки "оплатить"`, function () {
    allureReporter.generateReport();
    baReportPage.$button_payReport.scrollIntoView();
    baReportPage.$button_payReport.isDisplayed();
    baReportPage.$button_payReport.click();
    // Ожидаем появления окна подтверждения
    baReportPage.$overlay_confirm.waitForDisplayed({});
    expect(baReportPage.$overlay_confirm.isDisplayed()).to.be.true;
    expect(baReportPage.$text_overlayConfirmHeader).to.be.equal(baReportPage.header_payConfirm);
  });
  it(`Подтверждение оплаты`, function () {
    allureReporter.generateReport();
    // Нажали кнопку "оплатить" в окне
    baReportPage.$button_payConfirm.waitForClickable({ reverse: false });
    baReportPage.$button_payConfirm.click();
    //  Ждём появление окна подтверждения оплаты
    baReportPage.$overlay_confirm.waitForDisplayed({});
    expect(baReportPage.$text_overlayConfirmHeader).to.be.equal(baReportPage.header_paySuccess);
    // Нажимаем кнопку "ОК"
    baReportPage.$button_deleteConfirm.waitForClickable({ reverse: false });
    baReportPage.$button_deleteConfirm.click();
    // Сохраняем отчёт после оплаты
    baReportPage.saveReport();
    browser.refresh();
  });
  it(`Проверка записи в журнале работы`, function () {
    allureReporter.generateReport();
    baReportPage.waitForLoad(BaDocumentVersionForLoading.SERVER);
    baReportPage.$button_workJournal.waitForClickable();
    baReportPage.$button_workJournal.click();
    baReportPage.waitForWorkjournalLoad();
    expect(baReportPage.workjournal_findAction(BaActionsWorkJournal.PAY).isDisplayed()).to.be.true;
  });
  it(`Переход на страницу "Лицевой счёт"`, function () {
    allureReporter.generateReport();
    baReportPage.$button_closeWorkJournal.scrollIntoView();
    baReportPage.$button_closeWorkJournal.waitForClickable();
    baReportPage.$button_closeWorkJournal.click();
    baReportPage.$button_saveReport.waitForClickable();
    // baClassicNavMenu.waitForEnabled();
    baClassicNavMenu.navigateTo(BaNavigationButtons.PAY_HISTORY);
  });
  it(`Проверка совпадения УРЛов оплаченного и тестового отчёта`, function () {
    allureReporter.generateReport();
    baClassicPayHistory.waitForLoad();
    expect(baClassicPayHistory.$text_paymentsHistoryLastReportUrl).to.be.equal(testReportUrl);
  });
  it(`Проверка кол-ва средств ОК после оплаты`, function () {
    allureReporter.generateReport();
    moneyCountAfterPay = baMainPage.getCompanyMoneyData();
    console.log("Средства ОК до подписи: ", moneyCountAtStart);
    console.log("Средства ОК после подписи: ", moneyCountAfterPay);
    expect(moneyCountAtStart - moneyCountAfterPay).to.be.equal(BA_reportPrice.REPORT_RESIDENTIAL);
  });
});
