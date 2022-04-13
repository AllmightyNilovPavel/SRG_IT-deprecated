import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  baLoginPage,
  baMainPage,
  baReportPage,
  BuildingStage,
  BaResidentialBanks,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. Абсолютбанк. Выбор сотрудника на основе стадии строительства.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });

  let testBankUser = String(Date.now());
  let ValuationObjectData = "";
  const checkUser = "Выпуск закладной (otchet@absolutbank.ru) г. Москва";
  const printFormCheck = `Для АКБ "Абсолют Банк" (ОАО)`;

  it(`Логин в БО`, function () {
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
  it(`Создание черновика `, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    baMainPage.$modal_reportSelection.waitForDisplayed({});
    baMainPage.$button_CreateNewReport.click();
    baReportPage.waitForLoad();
  });
  it(`Выбор банка.`, function () {
    allureReporter.generateReport();
    baReportPage.select_bank(BaResidentialBanks.ABSOLUTEBANK);
    baReportPage.$selector_printForm.waitForEnabled({
      timeout: 10000,
      reverse: true,
      timeoutMsg: `Поле выбора печатной формы не заблокировано. Страница с ошибкой ${browser.getUrl()}`,
    });

    expect(baReportPage.$selector_printForm.getValue()).to.be.equal("aijk");
    expect(baReportPage.$selector_printForm.$(`option`).getText()).to.be.equal(printFormCheck);
  });
  it(`Заполнение полей для проверки и сохранение`, function () {
    allureReporter.generateReport();
    baReportPage.selectObjectBuildingStage(BuildingStage.TITLE);
    ValuationObjectData = baReportPage.$selector_buildingStage.getValue();
    console.log(ValuationObjectData);

    baReportPage.$input_bankUser.scrollIntoView();
    baReportPage.$input_bankUser.waitForDisplayed({});
    expect(baReportPage.$input_bankUser.getValue()).to.be.equal(checkUser);
    expect(baReportPage.$selector_registeredOwnership.isDisplayed()).to.be.true;

    baReportPage.saveReport();
  });
  it(`Проверка соответствия сохранённых полей - введённым.`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();

    expect(baReportPage.$selector_printForm.getValue()).to.be.equal("aijk");
    expect(baReportPage.$selector_printForm.$(`option`).getText()).to.be.equal(printFormCheck);
    expect(baReportPage.$selector_buildingStage.getValue()).to.be.equal(ValuationObjectData);
    // expect(baReportPage.$input_bankUser.getText()).to.be.equal(checkUser);
  });
  it(`Изменение данных в полях для повторной проверки и сохранение`, function () {
    allureReporter.generateReport();
    baReportPage.selectObjectBuildingStage(BuildingStage.NEW_FLAT);
    ValuationObjectData = baReportPage.$selector_buildingStage.getValue();

    expect(baReportPage.$input_bankUser.isEnabled(), "Поле ввода сотрудника банка недоступно").to.be
      .true;

    baReportPage.$input_bankUser.setValue(testBankUser);
    baReportPage.saveReport();

    console.log(ValuationObjectData);
  });
  it(`Проверка соответствия изменённых полей - введённым.`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();

    expect(baReportPage.$selector_buildingStage.getValue()).to.be.equal(ValuationObjectData);
    expect(baReportPage.$input_bankUser.getValue()).to.be.equal(testBankUser);
  });
  it(`Удаление тестового отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.deleteReport();
    baMainPage.waitForLoad();
  });
});
