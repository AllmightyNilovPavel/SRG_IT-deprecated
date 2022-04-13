import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  kronaRequestCard,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe.skip(`КРОНА. СМОК. Реестр СБД Экспресс-анализ.`, function () {
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
  it(`Открыть реестр`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.EXPRESS_ANALYTICS);
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_SbdOrdersExpress_OK");
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.SBD_EXPRESS).click();
    kronaNavigationBar.waitForLoad();
    kronaRequestCard.$requestCard_yandexMap.waitForDisplayed({ timeout: 10000, reverse: false });
    makeScreenshot("SMOKE_sbdOrderCardExpress_openedSuccessfully");
  });
});
