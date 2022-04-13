import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { KronaRequestForBaikal } from "pages/Krona";
import { baikalAuth, baikalRequestPageBeta, baikalRightPanelBetaComment } from "pages/baikal/index";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";
import { debugLogging } from "modules";

let testName = `Байкал. Заявку открывает исполнитель. Поле комментария доступно для редактирования.`;

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
    new KronaRequestForBaikal(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal,
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst,
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
  it(`Проверям, что под исполнителем заявки поля для ввода комментария редактируемы`, function () {
    allureReporter.generateReport();

    let commentary: string = TestDataBaikal.Residential.commentary.default_commentary;

    let errorMessageCommentDontClickable = `Поле с комментарием НЕ кликабельно. Хотя оно должно быть кликабельно
    под пользоваталем, который является исполнителем по заявке.`;

    let errorMessageRightPanelComment: string = `В форме заполнения комментария из правой панели Байкала должно было
    засетиться значение = ${commentary}. Но сейчас там по факту значение = ${baikalRightPanelBetaComment.$commentary_form.getText()}`;

    let errorMessageRequestPageComment: string = `В форме заполнения коммертария в заявке должно было засетиться
    значение = ${commentary}. Но сейчас там по факту значение = ${baikalRequestPageBeta.$commentary_form.getText()}`;

    // Здесь проверим, что комментарий редактируется и сохраняется
    expect(
      baikalRightPanelBetaComment.$commentary_form.isClickable(),
      errorMessageCommentDontClickable
    ).to.be.true;
    baikalRightPanelBetaComment.$commentary_form.click();
    debugLogging(`Клик по форме заполнения комментария из правой панели Байкала`);
    baikalRightPanelBetaComment.$commentary_form.setValue(commentary);
    debugLogging(`Маленькая пауза для того, чтобы запрос /multi отправился на сервер`);
    browser.pause(1000);
    expect(
      baikalRightPanelBetaComment.$commentary_form.getText() === commentary,
      errorMessageRightPanelComment
    ).to.be.true;
    debugLogging(
      `В форму заполнения коммертария из правой панели Байкала засетилось значение = ${commentary}`
    );
    expect(
      baikalRequestPageBeta.$commentary_form.getText() === commentary,
      errorMessageRequestPageComment
    ).to.be.true;
    makeScreenshot(`1`);
    debugLogging(
      `В форму заполнения комментария в заявке Байкала засетилось значение = ${commentary}`
    );
    debugLogging(`Обновление страницы в браузере`);
    browser.refresh();
    expect(
      baikalRightPanelBetaComment.$commentary_form.getText() === commentary,
      errorMessageRightPanelComment
    ).to.be.true;
    debugLogging(
      `После обновления страницы значение комментария в правой панели Байкала сохранилось и оно = ${commentary}`
    );
    expect(
      baikalRequestPageBeta.$commentary_form.getText() === commentary,
      errorMessageRequestPageComment
    ).to.be.true;
    makeScreenshot(`2`);
    debugLogging(
      `После обновления страницы значение комментария в заявке Байкала сохранилось и оно = ${commentary}`
    );
  });
});
