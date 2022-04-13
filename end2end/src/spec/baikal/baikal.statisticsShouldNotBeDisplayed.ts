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

import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";

import { baikalGoToCalculation } from "pages/baikal/supportMethods";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Проверка отображения РАЗДЕЛА статистики. Статистика НЕ должна отображаться.`;

let testDescription = `Назначить заявку на аналитика, у которого нет права ("Может использовать новый шаблон расчетника") \n
 * Проверить, что раздел статистики в Байкале НЕ отображается. \n`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `WEB-31901`,
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
      TestDataKrona.Users.login.srg.autotest_baikal_without_statistic,
      TestDataKrona.Users.password.srg.autotest_baikal_without_statistic,
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
  it(`Проверить наличие раздела "Статистики" под пользователем БЕЗ права`, function () {
    allureReporter.generateReport();

    let errorMessageSectionDisplayed: string = `В расчетнике Байкала отображается РАЗДЕЛ со статистикой`;

    baikalCalculationBetaCalculation.waitForLoad();
    expect(
      baikalCalculationBetaStatistics
        .section(BaikalEnumCalculationLeftMenu.STATISTICS)
        .isDisplayed(),
      errorMessageSectionDisplayed
    ).to.be.false;
    makeScreenshot(`1`);
  });
});
