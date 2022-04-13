import { baLoginPage, baMainPage, BaResidentialNewReportTypes } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { baCountryPropertyReportPage } from "pages/ba/CountryProperty/ba.countryProperty.report";

describe(`БО. ЖД. Создание отчёта.`, function () {
  it(`Логин в БО`, function () {
    baLoginPage.open();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });
  it(`Создать новый отчёт по ЖД`, function () {
    baMainPage.createNewReport(BaResidentialNewReportTypes.LIVING_HOUSE);
    baCountryPropertyReportPage.BASE.waitForLoad();
    browser.pause(1000);
    console.log(
      `Пробуем дёрнуть реактовый селектор: ${baCountryPropertyReportPage.BASE.$headerRoot}`
    );
  });
});
