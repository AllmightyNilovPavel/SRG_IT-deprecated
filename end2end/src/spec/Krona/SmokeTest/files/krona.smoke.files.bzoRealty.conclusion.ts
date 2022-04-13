import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureReporterSeverity,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
  KronaFileType,
  kronaErrorPage,
  kronaFiltersBox,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. VTB. БЗО. Недвижимость. Файлы. Заключение. `, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_bzo,
      TestDataKrona.Users.password.vtb.autotest_bzo
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр БЗО Недвижимость`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_ORDERS_DPA);
    kronaFiltersBox.waitForLoad();
  });
  it(`Фильтрация реестра`, function () {
    allureReporter.generateReport();
    kronaFiltersBox.$select_status.selectByVisibleText("Готово");
    kronaFiltersBox.$button_filterReestr.click();
    kronaResultTable.waitForLoad();
  });
  it(`Проверка скачивания заключения`, function () {
    allureReporter.generateReport({ severity: AllureReporterSeverity.CRITICAL });
    let target = kronaResultTable.resultTable_download(KronaFileType.BZO_REALTY_CONCLUSION);
    target.scrollIntoView({ block: "center", inline: "center" });
    target.click();
    browser.pause(250);
    expect(
      kronaErrorPage.$errorBody.isDisplayed(),
      `Ошибка при скачивании файла заключения!. На странице ${browser.getUrl()}`
    ).to.be.false;
    makeScreenshot("Krona_smoke_БзоНедвижимость-заключение");
  });
});
