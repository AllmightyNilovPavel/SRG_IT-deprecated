import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { kronaLoginPage, kronaNavigationBar, kronaRestMailCacheTable } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { debugLogging, makeScreenshot } from "modules";
import { KronaEnumEmailsMailTitle } from "pages/Krona/Enums/EmailsData/krona.emails.mailTitle";

describe(`Проверка сброса пароля`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Открытие страницы логина`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    expect(kronaLoginPage.$button_resetPassword.isDisplayed()).to.be.true;
    debugLogging(`Адрес страницы =  ${browser.getUrl()}`);
  });
  it(`Нажать кнопку сбросить пароль`, function () {
    allureReporter.generateReport();
    kronaLoginPage.$button_resetPassword.waitForClickable();
    expect(kronaLoginPage.$button_resetPassword.isClickable()).to.be.true;
    kronaLoginPage.$button_resetPassword.click();
  });
  it(`Сброс пароля тестового пользователя`, function () {
    allureReporter.generateReport({ description: `Сбрасываем пароль тестовому пользователю.` });
    kronaLoginPage.$base_resetPasswordModal.waitForDisplayed({ timeout: 1000, reverse: false });
    expect(kronaLoginPage.$resetPassword_userName.isClickable()).to.be.true;
    expect(kronaLoginPage.$resetPassword_userName.isEnabled()).to.be.true;
    kronaLoginPage.$resetPassword_userName.setValue("test");
    makeScreenshot("сбрасываем пароль");
  });
  it(`Проверка что пароль сброшен успешно`, function () {
    allureReporter.generateReport();
    let AlertTextCheck = "Email со временным паролем отправлен на вашу почту";
    let AlertTextCheck_new = "Email с ссылкой сброса пароля отправлен на вашу почту";

    kronaLoginPage.$resetPassword_buttonConfirm.click();
    browser.waitUntil(
      () => {
        return browser.isAlertOpen();
      },
      { timeout: 10000, timeoutMsg: "Нет алерта с инфой о сбросе пароля" }
    );

    expect(browser.getAlertText()).to.be.oneOf([AlertTextCheck, AlertTextCheck_new]);
    makeScreenshot(`Уведомление о сбросе пароля`);
    browser.acceptAlert();
    kronaLoginPage.$base_resetPasswordModal.waitForDisplayed({ timeout: 1000, reverse: true });
    kronaLoginPage.$button_resetPassword.waitForClickable();
  });
  it(`Проверка получения письма об успешном сбросе пароля`, function () {
    allureReporter.generateReport();
    browser.refresh();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
    kronaRestMailCacheTable.open();
    let emailCheck = kronaRestMailCacheTable.getEmailTitle(KronaEnumEmailsMailTitle.PASSWORD_RESET);
    expect(emailCheck).to.be.not.null;
    makeScreenshot(`Сброс пароля прошёл успешно`);
  });
});
