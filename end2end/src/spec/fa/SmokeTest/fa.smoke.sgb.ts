import { bestToPay, makeScreenshot, sgbOcenka, sgbUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { TestDataPaySystems } from "../../../options/testData/paySystems";

describe(`FA. SMOKE. СеверГазБанк. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    sgbOcenka.open();
    // sgbOcenka.$header_title.waitForDisplayed({ timeout: 5000});
    makeScreenshot(`SMOKE_СГБ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    sgbOcenka.$button_userCabinet.click();
    sgbOcenka.$button_userOrderCabinet.click();
    sgbOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    sgbOcenka.$input_login.click();
    sgbOcenka.$input_login.clearValue();
    sgbOcenka.$input_login.setValue(TestDataFa.Users.login.roman);
    sgbOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    sgbOcenka.$input_password.click();
    sgbOcenka.$input_password.setValue(TestDataFa.Users.password.roman);
    sgbOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    sgbUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = sgbUserCabinet.$OrderList_tableContent;
    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_СГБ_КабинетЮзера");
  });
  it("Переход на форму заказа оценки(Самоосмотр)", function () {
    allureReporter.generateReport();
    sgbOcenka.$button_Order.click();
    sgbOcenka.$button_NewCredit.click();
    sgbOcenka.$button_Flat.click();
    sgbOcenka.$button_Finishing.click();
    sgbOcenka.$input_City.click();
    sgbOcenka.$input_City.waitForDisplayed({ timeout: 10000, reverse: false });
    sgbOcenka.$input_City.waitForClickable();
    sgbOcenka.$input_City.setValue(TestDataFa.sgb.city);
    sgbOcenka.$button_AutoCity.waitForClickable();
    sgbOcenka.$button_AutoCity.click();
    sgbOcenka.$input_Street.waitForDisplayed({ timeout: 10000, reverse: false });
    sgbOcenka.$input_Street.waitForClickable();
    sgbOcenka.$input_Street.click();
    sgbOcenka.$input_Street.setValue(TestDataFa.sgb.street);
    sgbOcenka.$input_Flat.waitForDisplayed({ timeout: 10000, reverse: false });
    sgbOcenka.$input_Flat.click();
    sgbOcenka.$input_Flat.setValue(TestDataFa.sgb.flat);
    sgbOcenka.$button_InputAddress.click();
    sgbOcenka.$button_SmalPrice.click();
    sgbOcenka.$button_Yes.click();
    makeScreenshot("Предложение СП Самоосмотр");
    sgbOcenka.$button_To_order.click();
  });
  it('Заполнение карточки ОО "Шаг оформление заказа" ', function () {
    allureReporter.generateReport();
    sgbOcenka.$button_YesOwn.click();
    sgbOcenka.$button_FieldBranch.click();
    sgbOcenka.$button_Branch.click();
    sgbOcenka.$button_borrower.click();
    sgbOcenka.$button_contracts.click();
    sgbOcenka.$button_contracts.click();
    sgbOcenka.$button_contracts.click();
    sgbOcenka.$button_Next.click();
    sgbOcenka.$button_Next.click();
    sgbOcenka.$input_PayCard.click();
    sgbOcenka.$button_PayCard.click();
    sgbOcenka.$button_Soglasen.click();
    sgbOcenka.$button_GoOK.click();
  });
  it('Оплата заказа на Best2pay" ', function () {
    allureReporter.generateReport();
    bestToPay.waitForLoad();
    bestToPay.fillPaymentData_new(TestDataPaySystems.best2payRoman);
    bestToPay.returnToOrder();
    sgbOcenka.$Back_Personal_Area.waitForDisplayed({ timeout: 100000, reverse: false });
    sgbOcenka.$Back_Personal_Area.waitForClickable();
    makeScreenshot("Заказ отправлен");
    sgbOcenka.$Back_Personal_Area.click();
  });
});
