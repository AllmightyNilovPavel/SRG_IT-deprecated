import { expect } from "chai";
import {
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialObjectType,
  BuildingStage,
  BaResidentialValuationPart,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { debugLogging, makeScreenshot } from "modules";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "../../../modules/allureReportGenerator/index";

describe(`БО. СМОК. Проверка сохранения данных.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let UniqueReportNumber = String(Date.now());
  let ValuationObjectData: string[] = ["", "", ""];

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
  it(`Создание черновика`, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    baMainPage.$modal_reportSelection.waitForDisplayed({});
    baMainPage.$button_CreateNewReport.click();
    baReportPage.waitForLoad();
  });
  it(`Заполнение полей для проверки и сохранение`, function () {
    allureReporter.generateReport();
    baReportPage.selectObjectType(BaResidentialObjectType.FLAT);
    ValuationObjectData[0] = baReportPage.$selector_objectType.getValue();

    baReportPage.selectObjectBuildingStage(BuildingStage.FLAT);
    ValuationObjectData[1] = baReportPage.$selector_buildingStage.getValue();

    baReportPage.selectObjectValuationPart(BaResidentialValuationPart.ENTIRELY);
    ValuationObjectData[2] = baReportPage.$selector_objectSharePart.getValue();

    baReportPage.$input_reportNumber.scrollIntoView();
    baReportPage.$input_reportNumber.setValue(UniqueReportNumber);
    baReportPage.saveReport();

    debugLogging(ValuationObjectData);
  });
  it(`Проверка соответствия сохранённых полей - введённым.`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();
    expect(baReportPage.$input_reportNumber.getValue()).to.be.equal(UniqueReportNumber);
    expect(baReportPage.$selector_objectType.getValue()).to.be.equal(ValuationObjectData[0]);
    expect(baReportPage.$selector_buildingStage.getValue()).to.be.equal(ValuationObjectData[1]);
    expect(baReportPage.$selector_objectSharePart.getValue()).to.be.equal(ValuationObjectData[2]);
  });
  it(`Изменение данных в полях для повторной проверки и сохранение`, function () {
    allureReporter.generateReport();
    baReportPage.selectObjectType(BaResidentialObjectType.APARTMENT);
    ValuationObjectData[0] = baReportPage.$selector_objectType.getValue();

    baReportPage.selectObjectBuildingStage(BuildingStage.NEW_FLAT);
    ValuationObjectData[1] = baReportPage.$selector_buildingStage.getValue();

    baReportPage.selectObjectValuationPart(BaResidentialValuationPart.SHARE);
    ValuationObjectData[2] = baReportPage.$selector_objectSharePart.getValue();

    baReportPage.saveReport();

    console.log(ValuationObjectData);
  });
  it(`Проверка соответствия изменённых полей - введённым.`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();
    expect(baReportPage.$input_reportNumber.getValue()).to.be.equal(UniqueReportNumber);
    expect(baReportPage.$selector_objectType.getValue()).to.be.equal(ValuationObjectData[0]);
    expect(baReportPage.$selector_buildingStage.getValue()).to.be.equal(ValuationObjectData[1]);
    expect(baReportPage.$selector_objectSharePart.getValue()).to.be.equal(ValuationObjectData[2]);
    // makeScreenshot("SMOKE_NewReport_Draft");
  });
  it(`Удаление тестового отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.deleteReport();
    baMainPage.waitForLoad();
  });
});
