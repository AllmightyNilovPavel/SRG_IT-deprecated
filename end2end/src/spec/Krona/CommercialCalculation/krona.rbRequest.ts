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
  kronaRbRequestCard,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { baikalCalc, baikalFavorites, baikalHeader, baikalMap } from "pages/baikal";

describe(`КРОНА. СМОК. Реестр расчётов.`, function () {
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
      TestDataKrona.Users.login.vtb.autotest_baikal,
      TestDataKrona.Users.password.vtb.autotest_baikal
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Проверка реестра расчётов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_BAIKAL_REQUESTS);
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_РеестрРасчётов_OK");
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.BAIKAL).waitForExist({
      timeout: 10000,
      reverse: false,
    });
    kronaResultTable.resultTableGetData(KronaDataType.BAIKAL).click();
    kronaRbRequestCard.$rbRequestCard_Map.waitForDisplayed({ timeout: 20000, reverse: false });
    makeScreenshot("SMOKE_КарточкаРеестраРасчётов");
  });
  it(`Перейти в Байкал`, function () {
    allureReporter.generateReport();
    kronaRbRequestCard.$button_calculate.click();
    browser.switchWindow("База недвижимости");
    expect(browser.getUrl()).to.include("baikal/map");
    baikalMap.$map_addressInput.waitForExist({ timeout: 20000, reverse: false });
    makeScreenshot("SMOKE_Байкал");
  });
  it(`Открыть расчётник`, function () {
    allureReporter.generateReport();
    // browser.pause()
    baikalFavorites.$favorites_buttonOpenCalc.click();
    browser.pause(3000);
    expect(browser.getUrl()).to.include("baikal/calculations");
    expect(
      baikalCalc.$calcTableData_mainObjectLink.isDisplayed(),
      `Нужный объект не появился на странице ${browser.getUrl()}`
    ).to.be.true;
    makeScreenshot("SMOKE_Байкал_Расчётник");
  });
  // it(`Отправка расчётника в Крону`, function () {
  //   allureReporter.generateReport();
  //   baikalCalc.$button_sendCalculation.click();
  //   let notifMessage = $(`//p[@class='notification-message']`);
  //   notifMessage.waitForDisplayed();
  //   notifMessage.waitForDisplayed({ timeout: 10000, reverse: true });
  //   // baikalCalc.$notification_error.waitForDisplayed({ timeout: 10000 }) ||
  //   //   baikalCalc.$notification.waitForDisplayed({ timeout: 10000 });
  //   makeScreenshot("SMOKE_Байкал_Отправка расчётника");
  // });
  it(`Вернуться в в Крону`, function () {
    allureReporter.generateReport();
    baikalHeader.$button_backToRbRequests.click();
    browser.switchWindow("Реестр расчетов");
    expect(browser.getUrl()).to.include("9r/rbRequests");
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_BAIKAL_REQUESTS);
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_РеестрРасчётов_OK");
  });
});
