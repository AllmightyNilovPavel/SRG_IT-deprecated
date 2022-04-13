import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaVehicleValuationOrdersRegistry,
  KronaVehicleBzoStatus,
  KronaNavigationButtons,
  kronaResultTable,
  KronaDataType,
  kronaVehicleValuationOrdersOrderCardver2,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. ОТКРЫТИЕ. Клонирование заказа авто БЗО.ТС.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });

  let testVinNum: string;
  it(`Зайти под юзером ОТКРЫТИЕ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_vehicle,
      TestDataKrona.Users.password.openbank.autotest_vehicle
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Перейти в реестр заказов БЗО`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_BZO);
    kronaResultTable.waitForLoad();
  });
  it(`Отфильтровать по статусу /БЗО.Готово/`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.select_status(KronaVehicleBzoStatus.APPROVED);
    kronaVehicleValuationOrdersRegistry.$filterDate_dateBegin.clearValue();
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    kronaResultTable.waitForLoad();
    expect(kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).isDisplayed()).to.be.true;
  });
  it(`Перейти на страницу первого заказа в списке`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).click();
    kronaVehicleValuationOrdersOrderCardver2.$button_clone.waitForExist();
    expect(browser.getUrl()).to.include(kronaVehicleValuationOrdersOrderCardver2.path);
  });
  it(`Определить что заказ можно клонировать и сделать это.`, function () {
    allureReporter.generateReport();
    expect(kronaVehicleValuationOrdersOrderCardver2.$button_clone.isClickable()).to.be.true;
    kronaVehicleValuationOrdersOrderCardver2.$button_clone.scrollIntoView();
    kronaVehicleValuationOrdersOrderCardver2.$button_clone.click();
  });
  it(`Дозаполнить заказ`, function () {
    allureReporter.generateReport();
    testVinNum = TestDataKrona.Vehicle.VIN;

    kronaVehicleValuationOrdersOrderCardver2.$input_Vin.waitForDisplayed({
      timeout: 5000,
      reverse: false,
    });
    kronaVehicleValuationOrdersOrderCardver2.$input_Vin.setValue(testVinNum);
    kronaVehicleValuationOrdersOrderCardver2.$checkbox_nonStandartVin.click();
    kronaVehicleValuationOrdersOrderCardver2.selectAppraiser(
      TestDataKrona.Vehicle.Appraiser.openbank
    );
  });
  it(`Отправить заказ`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.scrollIntoView();
    expect(kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.isClickable()).to.be.true;
    kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.click();
  });
  it(`Проверка возврата в реестр`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.waitForLoad();
    kronaResultTable.waitForLoad();
    expect(browser.getUrl()).to.include(kronaVehicleValuationOrdersRegistry.path);
  });
  it(`Проверка корректности статуса заказа`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.$filterInput_Vin.setValue(testVinNum);
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    expect(
      kronaResultTable.resultTableGetData(KronaDataType.VEHICLE_status_openbank).getText()
    ).to.equal("Отправлено");
  });
});
