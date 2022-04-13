import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baikalAuth,
  baikalCalculationBeta,
  baikalCalculationBetaCalculation,
  BaikalEnumHeader,
  baikalHeaderBeta,
  baikalRequestPageBeta,
  baikalRightPanelBetaComment,
} from "pages/baikal/index";
import {
  baikalAddComparablesToCalculation,
  baikalConfirmCalculationAndGoToKrona,
  baikalGoToCalculation,
  baikalResetDataInFilter,
  baikalWriteAndCheckComment,
} from "pages/baikal/supportMethods";
import {
  kronaFilterTableById,
  kronaGoToBaikalFromExpertRequest,
  kronaLogoutFromCurrentAndLoginUnderAnother,
  kronaConfirmBySenior,
} from "pages/Krona/supportMethods";
import { KronaEnumResidentialRequestsStatusTranslated, KronaRequestForBaikal } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { browserCloseWindow, browserSwitchWindow } from "modules/supportMethodsForBrowserTabs";
import { BaikalFillComparable } from "pages/baikal/supportClasses/baikal.fillComparable";
import { EnumCloseWindow } from "shared/enums/enum.closeWindow";
import { EnumSwitchWindow } from "shared/enums/enum.switchWindow";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let rfvId: string;
let testName: string = `Байкал. В заявке, которая отправлена в банк проверяем, что поле с комментарием не может
редактировать не исполнитель, не старший аналитик.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-711",
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
    expect(status, `Статус заявки = ${status}, но он не соответствует ожидаемому`).to.be.oneOf([
      KronaEnumResidentialRequestsStatusTranslated.ACCEPTED_EXPERT_VALUATION,
      KronaEnumResidentialRequestsStatusTranslated.OVERVALUATION,
    ]);
    makeScreenshot(`1`);
  });
  it(`Перейти в карточку эксперта, а оттуда в Байкал`, function () {
    allureReporter.generateReport();
    kronaGoToBaikalFromExpertRequest(rfvId);
  });
  it(`Проверить, что под старшим аналитиком НЕЛЬЗЯ редактировать комментарий, т.к. заявка уже в банке`, function () {
    allureReporter.generateReport();

    let errorMessageRightPanelComment: string = `Поле с комментарием из правой панели Байкала кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    let errorMessageRequestPageComment: string = `Поле с комментарием из карточки заявки кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    baikalHeaderBeta.goToSection(BaikalEnumHeader.REQUEST);
    baikalRequestPageBeta.waitForLoad();
    expect(
      baikalRightPanelBetaComment.$commentary_form.isClickable(),
      errorMessageRightPanelComment
    ).to.be.false;
    expect(
      baikalRequestPageBeta.$commentary_form.isClickable(),
      errorMessageRequestPageComment
    ).to.be.false;
    makeScreenshot(`2`);
    browserCloseWindow(EnumCloseWindow.close_baikal);
  });
  it(`Перелогиниться в КРОНУ под исполнителем заявки`, function () {
    allureReporter.generateReport();
    browserSwitchWindow(`9r`, EnumSwitchWindow.switch_to_9r);
    kronaLogoutFromCurrentAndLoginUnderAnother(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
  });
  it(`Перейти в Байкал из карточки эксперта`, function () {
    allureReporter.generateReport();
    kronaGoToBaikalFromExpertRequest(rfvId);
  });
  it(`Проверить, что под исполнителем НЕЛЬЗЯ редактировать комментарий, т.к. заявка уже в банке`, function () {
    allureReporter.generateReport();

    let errorMessageRightPanelComment: string = `Поле с комментарием из правой панели Байкала кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    let errorMessageRequestPageComment: string = `Поле с комментарием из карточки заявки кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    baikalHeaderBeta.goToSection(BaikalEnumHeader.REQUEST);
    baikalRequestPageBeta.waitForLoad();
    expect(
      baikalRightPanelBetaComment.$commentary_form.isClickable(),
      errorMessageRightPanelComment
    ).to.be.false;
    expect(
      baikalRequestPageBeta.$commentary_form.isClickable(),
      errorMessageRequestPageComment
    ).to.be.false;
    makeScreenshot(`3`);
  });
});
