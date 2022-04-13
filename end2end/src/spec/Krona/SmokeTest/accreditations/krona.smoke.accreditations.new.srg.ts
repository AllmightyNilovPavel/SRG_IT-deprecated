import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  kronaAccreditationCard,
  KronaCompanyName,
  KronaAccreditationType,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Создание тестовой аккредитации.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под SRG`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Перейти на страницу создани яновой аккредитации`, function () {
    allureReporter.generateReport();
    kronaAccreditationCard.open_newAccreditationForm();
  });
  it(`Заполнить данные по Аккредитуемой компании`, function () {
    allureReporter.generateReport();
    kronaAccreditationCard.$input_Inn.setValue(TestDataKrona.Accreditation.inn);
    kronaAccreditationCard.$input_Kpp.setValue(TestDataKrona.Accreditation.kpp);
    kronaAccreditationCard.$input_BaCompanyId.setValue(TestDataKrona.Accreditation.baCompanyId);
    kronaAccreditationCard.$input_Name.setValue(TestDataKrona.Accreditation.name);
    kronaAccreditationCard.$checkbox_allRegions.scrollIntoView();
    kronaAccreditationCard.choose_bank(KronaCompanyName.SRG);
    kronaAccreditationCard.$checkbox_allRegions.waitForClickable();
    kronaAccreditationCard.$checkbox_allRegions.click();
  });
  it(`Добавить аккредитацию по квартирам`, function () {
    allureReporter.generateReport();
    kronaAccreditationCard.select_accreditationType(KronaAccreditationType.APARTMENT);
    // kronaAccreditationCard.select_accreditationType(KronaAccreditationType.APARTMENT);

    kronaAccreditationCard.$datapicker_borrower.waitForExist({ timeout: 5000, reverse: false });
  });
  it(`Заполнить данные по аккредитации`, function () {
    allureReporter.generateReport();
    kronaAccreditationCard.$datapicker_borrower.scrollIntoView();
    kronaAccreditationCard.$datapicker_borrower.setValue(TestDataKrona.Accreditation.startDate);
  });
  it(`Сохранить аккредитацию`, function () {
    allureReporter.generateReport();
    kronaAccreditationCard.$button_create.scrollIntoView();
    kronaAccreditationCard.$button_create.click();
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_НоваяАккредитация");
  });
});
