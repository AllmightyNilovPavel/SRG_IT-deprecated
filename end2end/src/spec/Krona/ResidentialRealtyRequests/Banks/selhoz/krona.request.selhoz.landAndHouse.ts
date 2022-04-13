import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  requestsCreateFlat,
  RealtyType,
  requestCreateLandAndTownhouse,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { kronaSelhozRequestsCreation } from "pages/Krona/Requests/Banks/selhoz";
import { KronaTestDataSelhoz } from "options/testData/krona/testData/banks/selhoz";

describe(`КРОНА. SELHOZ. ДРПА. Реестр объектов. ЗЕМЕЛЬНЫЙ УЧАСТОК С ДОМОМ. Новый запрос на оценку.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
  });
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.selhoz.drpa,
      TestDataKrona.Users.password.selhoz.drpa
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();
    expect(requestsCreateFlat.$map.isExisting()).to.be.true;
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    // expect(browser.getUrl()).to.include(`request/flat/new`);
    kronaSelhozRequestsCreation.fullfillSelhozRequest(
      RealtyType.LAND_AND_HOUSE,
      KronaTestDataSelhoz.REQUEST
    );
    this.retries(3);
  });
  it(`Заполнение полей по проблемным активам`, function () {
    allureReporter.generateReport();
    let target: WebdriverIO.Element;
    // доступ в помещение
    target = $(`#propertyAccess`);
    expect(target.getValue()).to.be.not.null;
    // цель проводимой оценки
    target = $(`#valuationPurpose`);
    expect(target.getValue()).to.be.not.null;
    // наличие имущества
    target = $(`#thirdPartyBurdening`);
    expect(target.getValue()).to.be.not.null;
    // срок экспозиции
    target = $(`#exposition`);
    expect(target.getValue()).to.be.not.null;
    target = requestsCreateFlat.$input_customField1;
    expect(target.getValue()).to.be.not.null;
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport();
    let valuationCheck: string | null;
    requestCreateLandAndTownhouse.$button_buttonSend.scrollIntoView();
    requestCreateLandAndTownhouse.$button_buttonSend.click();

    browser.waitUntil(
      () => requestCreateLandAndTownhouse.$input_addressAutocomplete.isDisplayedInViewport(),
      { timeout: 50000, timeoutMsg: "Сообщение о некорректном кадастровом номере не появилось." }
    );

    requestCreateLandAndTownhouse.$button_buttonSend.scrollIntoView();
    requestCreateLandAndTownhouse.$button_buttonSend.waitForClickable();
    requestCreateLandAndTownhouse.$button_buttonSend.click();
    valuationCheck = requestCreateLandAndTownhouse.waitForResult();

    expect(
      valuationCheck,
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия."
    ).to.be.not.null;
    makeScreenshot(screenshotName);
  });
});
