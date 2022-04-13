import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baCompanyAccountAddMoney, baLoginPage, baMainPage, baReportPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { toNumber } from "lodash";
import { mathTestDataDistributor } from "modules/math/math.distributor";

describe(`БО. СМОК. Пополнение счёта. Карта.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });
  let testPaymentAmount = mathTestDataDistributor.RANDOM.getRandomNumberBetween(1000, 9999);

  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );

    baMainPage.waitForLoad();
    expect(baMainPage.$buttonCompanyAccountAddMoney.isClickable()).to.be.true;
  });
  it(`Проверка окна оплаты`, function () {
    allureReporter.generateReport();
    baMainPage.$buttonCompanyAccountAddMoney.click();
    baCompanyAccountAddMoney.$addMoneyModalRoot.waitForDisplayed();
    expect(baCompanyAccountAddMoney.$inputMoneyAmmount.isEnabled()).to.be.true;
    expect(baCompanyAccountAddMoney.$buttonPayByInvoice.isClickable()).to.be.false;
    expect(baCompanyAccountAddMoney.$buttonPayByCard.isClickable()).to.be.false;
    makeScreenshot(`Проверка окна оплаты`);
  });
  it(`Проверяем что кнопки всё ещё не доступны если сумма меньше 4 символов`, function () {
    allureReporter.generateReport();
    baCompanyAccountAddMoney.$inputMoneyAmmount.setValue("999");
    expect(baCompanyAccountAddMoney.$buttonPayByInvoice.isClickable()).to.be.false;
    expect(baCompanyAccountAddMoney.$buttonPayByCard.isClickable()).to.be.false;
    makeScreenshot(`Проверяем что кнопки всё ещё не доступны если сумма меньше 4 символов`);
  });
  it(`Проверка доступности кнопок после корректного заполнения`, function () {
    allureReporter.generateReport();
    baCompanyAccountAddMoney.$inputMoneyAmmount.setValue(testPaymentAmount);
    expect(baCompanyAccountAddMoney.$buttonPayByInvoice.isClickable()).to.be.true;
    expect(baCompanyAccountAddMoney.$buttonPayByCard.isClickable()).to.be.true;
    makeScreenshot(`Проверка доступности кнопок после корректного заполнения`);
  });
  it(`Проверка оплаты картой`, function () {
    allureReporter.generateReport();
    baCompanyAccountAddMoney.$buttonPayByCard.waitForClickable();
    baCompanyAccountAddMoney.$buttonPayByCard.click();
    baCompanyAccountAddMoney.$addMoneyModalRoot.waitForDisplayed({
      reverse: true,
      timeoutMsg: `Окно выбора типа оплаты не исчезло.`,
    });
    browser.waitUntil(
      () =>
        browser.getUrl().match("3dsec.sberbank.ru") !== null &&
        $(`//div[contains(@class,'styles_mainInner')]`).isDisplayed()
    );

    let secSberbankMerchantName = $(`//div[contains(@class,'styles_merchantName')]`).getText();
    let secSberbankPaymentAmount = $(`//div[contains(@class,'styles_amount')]/div`)
      .getText()
      .replace(/\s/, "")
      .match(/\d+/)![0];
    console.log(`Цена до обработки: ${secSberbankPaymentAmount}`);

    expect(secSberbankMerchantName).to.be.equal("ООО ЭсАрДжи-Технологии");
    expect(toNumber(secSberbankPaymentAmount)).to.be.equal(testPaymentAmount);
    makeScreenshot(`Проверка оплаты картой`);
  });
});
