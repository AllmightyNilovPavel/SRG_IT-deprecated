import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { baLoginPage, baMainPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import {
  reactMainPage,
  reactNavMenu,
  reactReportsTable,
  react_NavMenuButtonsSecondary,
} from "pages/ba/react";

describe(`БО. РЕАКТ. СМОК. Реестр отчётов. Коммерческая недвижимость.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
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
  });
  it(`Перейти в режим реакта`, function () {
    allureReporter.generateReport();
    baMainPage.waitForLoad();
    baMainPage.$button_switchToReact.waitForDisplayed();
    baMainPage.$button_switchToReact.scrollIntoView();
    baMainPage.$button_switchToReact.click();
    reactMainPage.waitForLoad();
  });
  it(`Перейти на вкладку "Коммерческая недвижимость"`, function () {
    allureReporter.generateReport();
    reactNavMenu.navidateTo_secondary(react_NavMenuButtonsSecondary.COMMERCIAL);
    reactReportsTable.waitForLoad();
    expect(browser.getUrl()).to.include("/reports/commercial");
    // makeScreenshot("REACT_SMOKE_BA_КоммерческаяНедвига");
  });
});
