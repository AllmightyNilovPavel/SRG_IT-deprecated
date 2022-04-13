import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baikalAuth,
  baikalCalculationBeta,
  baikalCalculationBetaCalculation,
  baikalRequestPageBeta,
} from "pages/baikal/index";
import {
  baikalResetDataInFilter,
  baikalAddComparablesToCalculation,
  baikalGoToCalculation,
  baikalConfirmCalculationAndGoToKrona,
} from "pages/baikal/supportMethods";
import {
  kronaFilterTableById,
  kronaConfirmBySenior,
  kronaLogoutFromCurrentAndLoginUnderAnother,
} from "pages/Krona/supportMethods";

import { KronaEnumResidentialRequestsStatusTranslated, KronaRequestForBaikal } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { BaikalFillComparable } from "pages/baikal/supportClasses";
import { makeScreenshot } from "modules/screenshotsMaker";
import { expect } from "chai";

let rfvId: string;
let testName: string = `Байкал. End2end сценарий через новую карточку аналитика.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "WEB-32039",
  });
  it(`Создание запроса стоимости и открытие этого запроса в Байкале`, function () {
    allureReporter.generateReport({
      description: `Создание в КРОНЕ нового запроса стоимости по квартире под пользователем банка ALFABANK. \n
      Логин:${TestDataKrona.Users.login.alfa.autotest_baikal},
      Пароль:${TestDataKrona.Users.password.alfa.autotest_baikal}. \n
      После этого совершается логаут на младшего аналитика SRG. \n
      Логин: ${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst},
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst} \n
      Под младшим аналитиком SRG осуществляется переход в карточку эксперта.\n
      Младший аналитик SRG назначает заявку на себя и потом открывает заявку в Байкале
      с помощью кнопки "Открыть в Байкале".`,
    });
    browser.maximizeWindow();
    const newRequestPrice = new KronaRequestForBaikal(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal,
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Request.Flat.RANDOM_PARAMS_FOR_GPB
    ).newRequest();
    rfvId = newRequestPrice[0];
  });
  it(`Авторизоваться в Байкал beta`, function () {
    allureReporter.generateReport();
    baikalAuth.loginInBeta(
      TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataBaikal.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalRequestPageBeta.waitForLoad();
  });
  it(`Сбросить дату в фильтре`, function () {
    allureReporter.generateReport();
    baikalResetDataInFilter();
  });
  it(`Добавить аналоги в расчетник из "Списка объектов"`, function () {
    allureReporter.generateReport();
    baikalAddComparablesToCalculation(3);
  });
  it(`Перейти в Байкальский расчетник`, function () {
    allureReporter.generateReport();
    baikalGoToCalculation();
  });
  it(`Заполнить первый аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      1,
      TestDataBaikal.Residential.comparable_fill.default_comparable
    ).fillComparable();
  });
  it(`Заполнить второй аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      2,
      TestDataBaikal.Residential.comparable_fill.default_comparable
    ).fillComparable();
  });
  it(`Заполнить третий аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      3,
      TestDataBaikal.Residential.comparable_fill.default_comparable
    ).fillComparable();
  });
  it(`Проверить, что значения внутри расчетника сохранились`, function () {
    allureReporter.generateReport();
    const number_of_comparables = 3;

    let array_before_refresh =
      baikalCalculationBetaCalculation.collectValues(number_of_comparables);

    browser.refresh();
    baikalCalculationBetaCalculation.waitForLoad();

    let array_after_refresh = baikalCalculationBetaCalculation.collectValues(number_of_comparables);
    let errorMsgArraysDiff = `Данные после перезагрузки отличаются от данных до перезагрузки. \n Данные ДО: [${array_before_refresh}] \n Данные ПОСЛЕ: [${array_after_refresh}] \n`;
    expect(array_before_refresh, errorMsgArraysDiff).to.deep.equal(array_after_refresh);
  });
  it(`Отправить расчетник в крону`, function () {
    allureReporter.generateReport();
    baikalCalculationBeta.sendCalculationToKrona();
  });
  it(`Подтвердить заявку в Байкале и после этого перейти в КРОНУ`, function () {
    allureReporter.generateReport();
    baikalConfirmCalculationAndGoToKrona();
  });
  it(`Перелогиниться на старшего аналитика`, function () {
    allureReporter.generateReport();
    kronaLogoutFromCurrentAndLoginUnderAnother(
      TestDataKrona.Users.login.srg.autotest_baikal_senior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_senior_analyst
    );
  });
  it(`Подтвердить заявку за старшего аналитика`, function () {
    allureReporter.generateReport();
    kronaConfirmBySenior(rfvId);
  });
  it(`Отфильтровать "Реестр объектов" по id заявки. Проверить статус заявки`, function () {
    allureReporter.generateReport();
    let status = kronaFilterTableById(rfvId);
    let errorMessage: string = `Статус заявки = ${status}, но он не соответствует ожидаемому`;
    expect(status, errorMessage).to.be.oneOf([
      KronaEnumResidentialRequestsStatusTranslated.ACCEPTED_EXPERT_VALUATION,
      KronaEnumResidentialRequestsStatusTranslated.OVERVALUATION,
    ]);
    makeScreenshot(`1`);
  });
});
