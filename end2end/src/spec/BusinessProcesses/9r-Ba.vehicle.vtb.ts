import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { getIdFromUrl } from "modules";
import {
  KronaDataType,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
  kronaVehicleValuationOrdersOrderCardver2,
  kronaVehicleValuationOrdersRegistry,
  KronaVehicleBzoStatus,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { TestDataBa } from "options/testData/ba";
import {
  baClassicNavMenu,
  baLoginPage,
  baMainPage,
  BaNavigationButtons,
  BaNavigationButtonsOrders,
  valuationOrderList,
} from "pages/ba/classic";

describe.skip("Крона-Бо. ВТБ. Заказ в Кроне и подготовка отчёта в БО.", function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let vehicleOrderId;

  describe(`Клонирование заказа авто БЗО.ТС.`, function () {
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
    });
    it(`Перейти на страницу первого заказа в списке`, function () {
      allureReporter.generateReport();
      kronaResultTable.resultTableGetData(KronaDataType.VEHICLE).click();
      kronaVehicleValuationOrdersOrderCardver2.$button_clone.waitForExist();
    });
    it(`Определить что заказ можно клонировать и сделать это.`, function () {
      allureReporter.generateReport();
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
      kronaVehicleValuationOrdersOrderCardver2.selectAppraiser(TestDataKrona.Vehicle.Appraiser.vtb);
    });
    it(`Сохранить заказ`, function () {
      allureReporter.generateReport();
      kronaVehicleValuationOrdersOrderCardver2.$button_saveOrder.scrollIntoView();
      kronaVehicleValuationOrdersOrderCardver2.$button_saveOrder.click();
      kronaVehicleValuationOrdersOrderCardver2.$tabs_order.waitForDisplayed({});
    });
    it(`Получить АйДи заказа`, function () {
      allureReporter.generateReport();
      vehicleOrderId = getIdFromUrl();
      console.log("Номер заказа: ", vehicleOrderId);
    });
    it(`Отправить заказ`, function () {
      allureReporter.generateReport();
      kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.scrollIntoView();
      expect(kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.isClickable()).to.be.true;
      kronaVehicleValuationOrdersOrderCardver2.$button_sendOrder.click();
    });
    // it(`Проверка возврата в реестр`, function() {
    // allureReporter.generateReport();
    //   krona.navigationBar.waitForLoad();
    //   kronaResultTable.waitForLoad();
    //   expect(browser.getUrl()).to.include(krona.vehicleReqReestr.path);
    // });
    // it(`Проверка корректности статуса заказа`, function() {
    // allureReporter.generateReport();
    //   krona.vehicleReqReestr.$filterInput_Vin.setValue(testVinNum);
    //   krona.vehicleReqReestr.$button_showResults.click();
    //   expect(
    //     kronaResultTable.resultTableGetData(krona.KronaDataType.VEHICLE_status_vtb).getText()
    //   ).to.equal("Отправлено");
    // });
  });
  describe("Принятие заказа в БО и подготовка отчёта", function () {
    it(`Логин в БО`, function () {
      allureReporter.generateReport();
      baLoginPage.open();
      baLoginPage.waitForLoad();
      baLoginPage.login(
        TestDataBa.Users.login.zarnitsa.admin,
        TestDataBa.Users.password.zarnitsa.admin
      );
    });
    it(`Переход в реестр заказов Авто`, function () {
      allureReporter.generateReport();
      baMainPage.waitForLoad();
      baClassicNavMenu.navigateTo(BaNavigationButtons.ORDERS_VEHICLE);
      valuationOrderList.waitForLoad();
      valuationOrderList.orderAccept(vehicleOrderId);
    });
    it(``, function () {});
  });
  describe("Проверка отчёта на стороне Кроны", function () {
    it(`Возврат в Крону`, function () {
      browser.switchWindow("/9r");
    });
  });
});
