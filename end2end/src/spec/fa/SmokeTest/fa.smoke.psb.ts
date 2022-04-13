import {psbOcenka} from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
import { expect } from "chai";

describe(`FA. SMOKE. ПСБ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    psbOcenka.open();
    psbOcenka.$HeaderTitle.waitForDisplayed({timeout: 5000});
    makeScreenshot(`SMOKE_ПСБ`);
  });

  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    let checkLogin :string;
    let errorMsgLogin :string ='Пустое значение в поле Логин';
    let errorMsgLoginElement : string ='Поле ввода логина не доступно';

    psbOcenka.$ButtonUserCabinet.click();
    expect(psbOcenka.$InputLogin.isClickable(),errorMsgLoginElement).to.be.true;
    psbOcenka.InputLogin(TestDataFa.Users.login.roman);
    checkLogin = psbOcenka.$InputLogin.getValue();
     expect(checkLogin,errorMsgLogin).to.be.not.empty;

    let checkPassword :string;
    let errorMsgPassword :string ='Пустое значение в поле пароль';
    let errorMsgPasswordElement : string ='Поле ввода пароля не доступно';

    expect(psbOcenka.$InputPassword.isClickable(),errorMsgPasswordElement).to.be.true;
    psbOcenka.InputPassword(TestDataFa.Users.password.roman);
    checkPassword = psbOcenka.$InputPassword.getValue();
     expect(checkPassword,errorMsgPassword).to.be.not.empty;
     psbOcenka.$ButtonSend.click();
  });

  it(`Список заказов по новому кредиту`, function () {
    allureReporter.generateReport();
    let errorMsgOrderListMortgage :string = 'Не загружается список заказов по новому кредиту';
    psbOcenka.$ButtonTableCredit.waitForClickable();
    psbOcenka.$ButtonTableCredit.click();
    psbOcenka.$NumerOrder.waitForDisplayed();
    expect(psbOcenka.$NumerOrder.isDisplayed(),errorMsgOrderListMortgage).to.be.true;
  });

  it(`Список заказов по Рефину`, function () {
    allureReporter.generateReport();
    let errorMsgOrderListRefin :string = 'Не загружается список заказов по рефину';
    psbOcenka.$ButtonTableRefin.waitForClickable();
    psbOcenka.$ButtonTableRefin.click();
    psbOcenka.$NumerOrder.waitForDisplayed();
    expect(psbOcenka.$NumerOrder.isDisplayed(),errorMsgOrderListRefin).to.be.true;
  });

});