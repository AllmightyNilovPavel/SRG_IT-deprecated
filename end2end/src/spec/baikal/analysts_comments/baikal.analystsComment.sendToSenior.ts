import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { KronaRequestForBaikal } from "pages/Krona";
import {
  baikalAuth,
  baikalCalculationBeta,
  baikalCalculationBetaCalculation,
  baikalRequestPageBeta,
  baikalRightPanelBetaComment,
} from "pages/baikal/index";
import {
  baikalResetDataInFilter,
  baikalAddComparablesToCalculation,
  baikalGoToCalculation,
  baikalWriteAndCheckComment,
} from "pages/baikal/supportMethods";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { BaikalFillComparable } from "pages/baikal/supportClasses";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let rfvId: string;
let testName: string = `Байкал. После отправки заявки на проверку старшему поле с комментарием НЕЛЬЗЯ редактировать даже исполнителю.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-711",
  });
  it(`Создание запроса стоимости и открытие этого запроса в Байкале`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Создание в КРОНЕ нового запроса стоимости по квартире под пользователем банка ALFABANK. \n
      Логин:${TestDataKrona.Users.login.alfa.autotest_baikal},
      Пароль:${TestDataKrona.Users.password.alfa.autotest_baikal}. \n
      После этого совершается логаут на младшего аналитика SRG. \n
      Логин: ${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst},
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst} \n
      Под младшим аналитиком SRG осуществляется переход в карточку эксперта. \n
      Младший аналитик SRG назначает заявку на себя и потом открывает заявку в Байкале
      с помощью кнопки "Открыть в Байкале".`,
    });
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
  it(`Проверить, что значение внутри расчетника сохранились`, function () {
    allureReporter.generateReport();
    baikalCalculationBetaCalculation.refreshPageAndCheckValues(3);
  });
  it(`Отправить расчетник в крону`, function () {
    allureReporter.generateReport();
    baikalCalculationBeta.sendCalculationToKrona();
  });
  it(`Написать комментарий к заявке`, function () {
    allureReporter.generateReport();
    baikalWriteAndCheckComment(TestDataBaikal.Residential.commentary.default_commentary);
  });
  it(`Подтвердить заявку в Байкале`, function () {
    allureReporter.generateReport();
    baikalRequestPageBeta.watchRequireTables();
    baikalRequestPageBeta.allowCalculation();
  });
  it(`Проверка, что после отправки заявки старшему комментарий не может изменять даже исполнитель`, function () {
    allureReporter.generateReport();

    let errorMessageRightPanelComment: string = `Поле с комментарием из правой панели Байкала кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    let errorMessageRequestPageComment: string = `Поле с комментарием из карточки заявки кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    expect(
      baikalRightPanelBetaComment.$commentary_form.isClickable(),
      errorMessageRightPanelComment
    ).to.be.false;
    expect(
      baikalRequestPageBeta.$commentary_form.isClickable(),
      errorMessageRequestPageComment
    ).to.be.false;
    makeScreenshot(`1`);
  });
});
