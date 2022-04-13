import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
  kronaFiltersBox,
  KronaDataType,
  kronaOrderDpaResidentialOrderPage,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. VTB. БЗО. Недвижимость. Карточка заказа. `, function () {
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
  it(`Переход в реестр заказов БЗО Недвижимость`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_ORDERS_DPA);
    // kronaResultTable.waitForLoad();
    kronaFiltersBox.waitForLoad();
  });
  it(`Фильтрация реестра`, function () {
    allureReporter.generateReport();
    kronaFiltersBox.$select_status.selectByVisibleText("Готово");
    kronaFiltersBox.$button_filterReestr.click();
    kronaResultTable.waitForLoad();
  });
  it(`Переход в карточку`, function () {
    allureReporter.generateReport();
    let result = kronaResultTable.resultTableGetData(KronaDataType.BZO_ORDER_CARD);
    result.scrollIntoView({ block: "center", inline: "center" });
    result.click();
  });
  it(`Проверка карточки`, function () {
    allureReporter.generateReport();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
  });
});
