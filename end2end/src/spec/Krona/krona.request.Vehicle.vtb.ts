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

describe(`КРОНА. ВТБ. Клонирование заказа авто БЗО.ТС.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  let testVinNum: string;

  it(`Зайти под юзером ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_vehicle,
      TestDataKrona.Users.password.vtb.autotest_vehicle
    );
    kronaNavigationBar.waitForLoad();
    // expect(kronaNavigationBar.$button_vehicleBzoReports.isDisplayed()).to.be.true;
  });
  it(`Перейти в реестр заказов БЗО`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_BZO);
    kronaResultTable.waitForLoad();
    // expect(kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).isDisplayed()).to.be.true;
  });
  it(`Отфильтровать по статусу /БЗО.Готово/`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.$filterDate_dateBegin.clearValue();
    kronaVehicleValuationOrdersRegistry.select_status(KronaVehicleBzoStatus.APPROVED);
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    kronaResultTable.waitForLoad(25000);
    expect(kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).isDisplayed()).to.be.true;
  });
  it(`Перейти на страницу первого заказа в списке`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).click();
    kronaVehicleValuationOrdersOrderCardver2.$button_clone.waitForExist();
    expect(browser.getUrl())
      .to.include(kronaVehicleValuationOrdersOrderCardver2.path)
      .and.to.not.include(
        "message.result.order.error",
        `Ошибка при открытии ссылки ${browser.getUrl()}. Попробуйте выбрать другой заказ.`
      );
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

    kronaVehicleValuationOrdersOrderCardver2.setVinNumber(testVinNum);
    kronaVehicleValuationOrdersOrderCardver2.selectAppraiser(TestDataKrona.Vehicle.Appraiser.vtb);
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

    expect(browser.getUrl()).to.not.include(
      "message.result.order.error",
      `Ошибка при отправке заказа ${browser.getUrl()}`
    );
    kronaResultTable.waitForLoad(20000);
  });
  it(`Проверка корректности статуса заказа`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.$filterInput_Vin.setValue(testVinNum);
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    expect(
      kronaResultTable.resultTableGetData(KronaDataType.VEHICLE_status_vtb).getText()
    ).to.equal("Отправлено");
  });
});
