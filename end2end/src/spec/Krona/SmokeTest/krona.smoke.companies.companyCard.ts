import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { kronaLoginPage, kronaNavigationBar, kronaCompanyCard } from "pages/Krona";
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
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в карточку компании SRG`, function () {
    allureReporter.generateReport();
    kronaCompanyCard.FUNCTIONS.OpenCompanyCard("1");
  });
  it(`Проверка что карточка открылась и не пуста`, function () {
    allureReporter.generateReport();
    expect(kronaCompanyCard.BASE.$root_infoBox.isDisplayed()).to.be.true;
    expect(kronaCompanyCard.BASE.$root_tabs.isDisplayed()).to.be.true;
  });
});
