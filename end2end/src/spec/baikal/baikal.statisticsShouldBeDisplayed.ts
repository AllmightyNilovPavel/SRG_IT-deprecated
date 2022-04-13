import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { KronaRequestForBaikal } from "pages/Krona/index";

import {
  baikalAuth,
  baikalCalculationBetaCalculation,
  baikalCalculationBetaStatistics,
  BaikalEnumCalculationLeftMenu,
  baikalRequestPageBeta,
} from "pages/baikal/index";

import { expect } from "chai";

import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";

import { baikalGoToCalculation } from "pages/baikal/supportMethods";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Проверка отображения РАЗДЕЛА статистики (сама статистика построчно не проверяется).
Статистика должна отображаться.`;

let testDescription = `Назначить заявку на аналитика,у которого есть право на просмотр статистики ("Может использовать новый шаблон расчетника").\n
 Проверить статистику в Байкале под этим аналитиком. \n
 Раздел "Статистики" должен отображаться.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-711",
    description: testDescription,
  });
  it(`Создание запроса стоимости и открытие этого запроса в Байкале.`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Создание в КРОНЕ нового запроса стоимости по квартире под пользователем банка ALFABANK. 
      Логин:${TestDataKrona.Users.login.alfa.autotest_baikal},
      Пароль:${TestDataKrona.Users.password.alfa.autotest_baikal}.
      После этого совершается логаут на младшего аналитика SRG.
      Логин: ${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst},
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst}
      Под младшим аналитиком SRG осуществляется переход в карточку эксперта.
      Младший аналитик SRG назначает заявку на себя и потом открывает заявку в Байкале
      с помощью кнопки "Открыть в Байкале".`,
    });
    new KronaRequestForBaikal(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal,
      TestDataKrona.Users.login.srg.autotest_baikal_senior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_senior_analyst,
      TestDataKrona.Request.Flat.RANDOM_PARAMS_FOR_GPB
    ).newRequest();
  });
  it(`Авторизоваться в Байкал beta`, function () {
    allureReporter.generateReport();
    baikalAuth.loginInBeta(
      TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataBaikal.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalRequestPageBeta.waitForLoad();
  });
  it(`Перейти в Байкальский расчетник`, function () {
    allureReporter.generateReport();
    baikalGoToCalculation();
  });
  it(`Проверить наличие раздела "Статистики" под пользователем С правом`, function () {
    allureReporter.generateReport();

    let errorMessageDontDisplayedSection: string = `В расчетнике Байкала НЕ отображается РАЗДЕЛ со статистикой`;

    let errorMessageDontDisplayedTable: string = `Таблица со статистикой не отображается на экране`;

    baikalCalculationBetaCalculation.waitForLoad();
    expect(
      baikalCalculationBetaStatistics
        .section(BaikalEnumCalculationLeftMenu.STATISTICS)
        .isDisplayed(),
      errorMessageDontDisplayedSection
    ).to.be.true;
    baikalCalculationBetaStatistics.goToSection(BaikalEnumCalculationLeftMenu.STATISTICS);
    expect(
      baikalCalculationBetaStatistics.$calculation_table.isDisplayed(),
      errorMessageDontDisplayedTable
    ).to.be.true;
    makeScreenshot(`1`);
  });
});
