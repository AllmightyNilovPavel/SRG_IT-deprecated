import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialBanks,
  BaDocumentVersionForLoading,
  BaEnumResidentialReportPricesByBank,
  residentialReportPage,
  BaReportResidentialMapType,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";

describe(`BA. CLASSIC. RESIDENTIAL. Отчёт. Квартира. Проверка оплаты. Все банки.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let UniqueReportNumber = "Autotest_payCheck_" + String(Date.now());
  let moneyCountAtStart: number;
  let moneyCountAfterPay: number;
  let PRICE_CHECKER: number;

  it(`Логин в БО под Зарницей`, function () {
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin2,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });

  Object.values(BaResidentialBanks).forEach((BANK, index) => {
    let CURRENT_BANK_NAME = Object.keys(BaResidentialBanks)[index];

    it(`Проверка для банка ${CURRENT_BANK_NAME}`, function () {
      allureReporter.generateReport();
      baMainPage.open();

      moneyCountAtStart = baMainPage.getCompanyMoneyData();

      baMainPage.$button_newReportToModal.click();
      baMainPage.$modal_reportSelection.waitForDisplayed({});
      baMainPage.$button_CreateNewReport.click();
      baReportPage.waitForLoad();

      baReportPage.select_bank(Object.values(BaResidentialBanks)[index]);
      baReportPage.setAgreementDate();
      baReportPage.input_reportNumber(true, UniqueReportNumber);
      residentialReportPage.AssesmentTaskActions.selectMapType(BaReportResidentialMapType.NO_MAP);
      baReportPage.saveReport();

      browser.refresh();
      baReportPage.waitForLoad();

      baReportPage.payReport();
      baReportPage.saveReport();
      browser.refresh();
      baReportPage.waitForLoad(BaDocumentVersionForLoading.SERVER);

      moneyCountAfterPay = baMainPage.getCompanyMoneyData();

      if (Object.keys(BaEnumResidentialReportPricesByBank).includes(CURRENT_BANK_NAME))
        PRICE_CHECKER = BaEnumResidentialReportPricesByBank[CURRENT_BANK_NAME];
      else PRICE_CHECKER = BaEnumResidentialReportPricesByBank.DEFAULT;

      allureReporter.generateReport({
        additionalArguments: [
          { argName: "Колво средств на счёте ДО оплаты", argValue: moneyCountAtStart },
          { argName: "Колво денег ПОСЛЕ оплаты", argValue: moneyCountAfterPay },
        ],
      });

      let errorMsg: string = `Стоимость отчёта для банка ${CURRENT_BANK_NAME} не соответствует таблице цен.`;
      expect(moneyCountAtStart - moneyCountAfterPay, errorMsg).to.be.equal(PRICE_CHECKER);
    });
  });
});
