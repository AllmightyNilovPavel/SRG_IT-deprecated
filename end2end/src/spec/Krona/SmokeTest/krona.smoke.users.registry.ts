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
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестр пользователей.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под СУПЕРАДМИНОМ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    expect(
      kronaLoginPage.$checkbox_rememberMe.isDisplayed(),
      `Галочка "запомнить меня" недоступна на странице ${browser.getUrl()}`
    ).to.be.true;
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    expect(
      kronaLoginPage.$checkbox_rememberMe.isDisplayed(),
      `Не произошло перехода со страницы логина. Текущая страница ${browser.getUrl()}`
    ).to.be.false;
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в Реестр ПОЛЬЗОВАТЕЛЕЙ`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.USER_REESTR);
    kronaResultTable.waitForLoad();
  });
  it(`Проверка что реестр открылся и не пустой.`, function () {
    allureReporter.generateReport();
    let data = kronaResultTable.$result_table_allData;

    expect(data).to.be.not.null;
    makeScreenshot("SMOKE_РеестрПользователей_OK");
  });
});
