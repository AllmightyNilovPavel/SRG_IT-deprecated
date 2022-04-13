import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  KronaDataType,
  KronaNavigationButtons,
  kronaVehicleValuationOrdersOrderCardver2,
  kronaVehicleValuationOrdersRegistry,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. БЗО ТС. Карточка заказа.`, function () {
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
      TestDataKrona.Users.login.srg.vehicle_valuationOrders,
      TestDataKrona.Users.password.srg.vehicle_valuationOrders
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть реестр`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_BZO);
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.waitForLoad();
    kronaVehicleValuationOrdersRegistry.$filterDate_dateBegin.clearValue();
    kronaVehicleValuationOrdersRegistry.$button_showResults.scrollIntoView();
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    let tmp = kronaResultTable.resultTableGetData(KronaDataType.VEHICLE);
    // browser.debug();
    tmp.waitForDisplayed({
      timeout: 10000,
      reverse: false,
      timeoutMsg: `Данные таблицы реестра ${browser.getUrl()} не загрузились за 10 сек`,
    });
    tmp.click();
    kronaVehicleValuationOrdersOrderCardver2.waitForLoad();
    console.log("Ссылка на заказ: ", browser.getUrl());

    expect(
      kronaVehicleValuationOrdersOrderCardver2.$tabs_order.isDisplayed(),
      `Карточка заказа авто ${browser.getUrl()} не загрузилась.`
    ).to.be.true;
    makeScreenshot("KRONA_SMOKE_Машинки_БЗО-ТС_карточкаЗаказа");
  });
});
