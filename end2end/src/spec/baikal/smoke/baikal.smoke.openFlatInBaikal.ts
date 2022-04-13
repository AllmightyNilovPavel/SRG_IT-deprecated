import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { KronaRequestForBaikal } from "pages/Krona";

import { baikalAuth, baikalRequestPageBeta } from "pages/baikal/index";

import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";

import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let rfvId: string;
let testName = `Байкал. Открытие запроса стоимости из карточки эксперта по кнопке "Открыть в Байкале".`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-811`,
  });
  it(`Создание запроса стоимости и открытие этого запроса стоимости в Байкале`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Создание в КРОНЕ нового запроса стоимости по квартире под пользователем банка ALFABANK. \n
      Логин:${TestDataKrona.Users.login.alfa.autotest_baikal},
      Пароль:${TestDataKrona.Users.password.alfa.autotest_baikal}. \n
      После этого совершается логаут на младшего аналитика SRG. \n
      Логин: ${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst},
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst}\n
      Под младшим аналитиком SRG осуществляется переход в карточку эксперта.\n
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
  it(`Проверка что переход в Байкал действительно осуществлен и заявка открылась в Байкале`, function () {
    allureReporter.generateReport({
      description: `В случаях когда Байкал запрашивает авторизацию, то авторизуемся под младшим аналитиком SRG. \n
      Логин:${TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst},
      Пароль:${TestDataBaikal.Users.password.srg.autotest_baikal_junior_analyst} \n
      После этого дожидаемся загрузки страницы с заявкой. Проверяем, что мы действительно находимся в Байкале
      на странице заявки.`,
    });
    baikalAuth.loginInBeta(
      TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataBaikal.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalRequestPageBeta.waitForLoad();
    let errorMsgWrongUrl: string = `Текущий URL должен содержать /baikal/request, так как предполагается, что автотест
  находится на странице заявки. Но на самом деле текущий URL = ${browser.getUrl()}`;
    expect(browser.getUrl(), errorMsgWrongUrl).include(baikalRequestPageBeta.path);
    let errorMsgBaikalRequestPageError = `При переходе на страницу заявки проверяем, что
  корневой элемент ${baikalRequestPageBeta.$center_block} отображается на экране. Сейчас элемент не отображается.`;

    expect(
      baikalRequestPageBeta.$center_block.isDisplayed(),
      errorMsgBaikalRequestPageError
    ).to.be.true;

    makeScreenshot(`1`);
  });
});
