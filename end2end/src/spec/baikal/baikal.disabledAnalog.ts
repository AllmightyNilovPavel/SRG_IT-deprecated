import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { KronaEnumResidentialRequestsStatusTranslated, KronaRequestForBaikal } from "pages/Krona";
import {
  baikalAuth,
  baikalCalculationBeta,
  baikalCalculationBetaCalculation,
  baikalRequestPageBeta,
} from "pages/baikal/index";

import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";

import { BaikalFillComparable } from "pages/baikal/supportClasses/baikal.fillComparable";

import {
  baikalAddComparablesToCalculation,
  baikalConfirmCalculationAndGoToKrona,
  baikalGoToCalculation,
  baikalResetDataInFilter,
} from "pages/baikal/supportMethods";

import { kronaFilterTableById } from "pages/Krona/supportMethods";
import { makeScreenshot } from "modules/screenshotsMaker";

import { expect } from "chai";

let rfvId: string;

let testName: string = `Байкал. Если в расчетнике отключить аналог, с суммой относительных корректировок > 25,
  то такой расчетник НЕ должен падать на руки старшему, т.к. аналог ОТКЛЮЧЕН.`;

let testDescription = `В автотесте создается запрос стоимости, у которого превышение относительно робота в диапазоне 15-20%.
  Сейчас граница при которой заявки падают на руки аналитикам для ВТБ 15%, поэтому лучше указывать где-то 17%
  в запросе стоимости, чтобы был небольшой запас.
  Далее в Байкале подбирается 4 аналога и они редактируются таким образом, чтобы после верификации младшим аналитиком
  заявка НЕ упала на руки старшему (подбирается цена, которая в диапазоне ~10% от стоимости, указанной в запросе стоимости +
  которая в диапазоне ~10% от оценки робота). При этом 4ому аналогу выставляется сумма корректировок по модулю более 25, а
  это является причиной отправки заявки на старшего аналатика. Но сам 4ый аналог при этом отключаем из расчета.
  Проверяем в автотесте, что хоть у 4ого аналога сумма корректировок превышает 25, но старшему такая заявка НЕ уйдет,
  т.к. аналог ОТКЛЮЧЕН.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `WEB-32039`,
    description: testDescription,
  });
  it(`Создание запроса стоимости и открытие этого запроса в Байкале`, function () {
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
    browser.maximizeWindow();
    const newRequestPrice = new KronaRequestForBaikal(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal,
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Request.Flat.FOR_DISABLED_ANALOG
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
  it(`Добавить аналоги в расчетник`, function () {
    allureReporter.generateReport();
    baikalAddComparablesToCalculation(4);
  });
  it(`Перейти в Байкальский расчетник`, function () {
    allureReporter.generateReport();
    baikalGoToCalculation();
  });
  it(`Заполнить первый аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      1,
      TestDataBaikal.Residential.comparable_fill.default_comparable_for_disabled_test
    ).fillComparable();
  });
  it(`Заполнить второй аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      2,
      TestDataBaikal.Residential.comparable_fill.default_comparable_for_disabled_test
    ).fillComparable();
  });
  it(`Заполнить третий аналог в расчетнике`, function () {
    allureReporter.generateReport();
    new BaikalFillComparable(
      3,
      TestDataBaikal.Residential.comparable_fill.default_comparable_for_disabled_test
    ).fillComparable();
  });
  it(`Заполнить четвертый аналог в расчетнике`, function () {
    let testStepDescription = `Для четвертого аналога устанавливается большее значение цены, чтобы в дальнейшем при добавлении корректировки
     на торг в > -25% цена объекта оценки не изменилась в случае добавления 4ого аналога в расчет.
     Т.е. цена объекта оценки в расчетнике с 3мя аналогами и отключенным 4ым,
     практически такая же, как при включении 4ого аналога в расчетник.`;
    allureReporter.generateReport({ description: testStepDescription });
    new BaikalFillComparable(
      4,
      TestDataBaikal.Residential.comparable_fill.disabled_analog
    ).fillComparable();
  });
  it(`Проверить, что значение внутри расчетника сохранились`, function () {
    allureReporter.generateReport();
    const number_of_comparables = 4;

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
  it(`Отфильтровать "Реестр объектов" по id заявки. Проверить статус заявки`, function () {
    allureReporter.generateReport({
      description: `Заявка не должна улетать на руки старшему аналитику. Она должна автоматичски закрываться,
      т.к. не должно быть никаких причин по которым она падает на руки.`,
    });
    let status = kronaFilterTableById(rfvId);
    let errorMessage: string = `Статус заявки = ${status}, но он не соответствует ожидаемому`;
    expect(status, errorMessage).to.be.oneOf([
      KronaEnumResidentialRequestsStatusTranslated.ACCEPTED_EXPERT_VALUATION,
      KronaEnumResidentialRequestsStatusTranslated.OVERVALUATION,
    ]);
    makeScreenshot(`1`);
  });
});
