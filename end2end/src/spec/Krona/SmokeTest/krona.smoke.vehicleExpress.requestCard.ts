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
  kronaVehicleExpressOrderCard,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Реестр Экспресс ТС.`, function () {
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
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_EXPRESS);
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_ЭкспрессТС_реестр_ОК");
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.VEHICLE_EXPRESS).click();
    kronaVehicleExpressOrderCard.$table_Result.waitForDisplayed({ timeout: 5000 });

    expect(kronaVehicleExpressOrderCard.$table_Result).to.be.not.null;
  });
});
