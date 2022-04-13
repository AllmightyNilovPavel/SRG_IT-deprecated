import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { kronaExpertRequestCard, requestsCreateFlat } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { baikalRequestPageBeta, baikalRightPanelBetaComment } from "pages/baikal/beta";
import {
  kronaLogoutFromCurrentAndLoginUnderAnother,
  kronaGoToBaikalFromExpertRequest,
  kronaLoginAndLoad,
  kronaNewRequestPriceForFlat,
} from "pages/Krona/supportMethods";
import { expect } from "chai";
import { baikalAuth } from "pages/baikal";
import { makeScreenshot } from "modules/screenshotsMaker";

let rfvId: string; // Id создаваемого запроса стоимости
let testName: string = `Байкал. Заявку открывает НЕ исполнитель. Поле комментария недоступно для редактирования.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-711",
  });
  it(`Авторизоваться в КРОНЕ`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport();
    kronaLoginAndLoad(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal
    );
  });
  it(`Создание запроса стоимости`, function () {
    allureReporter.generateReport();
    kronaNewRequestPriceForFlat(TestDataKrona.Request.Flat.RANDOM_PARAMS_FOR_GPB);
    rfvId = requestsCreateFlat.getRfvId();
  });
  it(`Сделать логаут из КРОНЫ и авторизоваться под младшим аналитиком SRG`, function () {
    kronaLogoutFromCurrentAndLoginUnderAnother(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
  });
  it(`Перейти в карточку эксперта и назначить заявку на себя`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.goToExpertRequestCard(rfvId);
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.waitForLoad(false);
  });
  it(`Открыть заявку в Байкале НЕ под исполнителем, а под другим младшим аналитиком SRG.`, function () {
    allureReporter.generateReport();
    kronaLogoutFromCurrentAndLoginUnderAnother(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst_2,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst_2
    );
    kronaGoToBaikalFromExpertRequest(rfvId);
    baikalAuth.loginInBeta(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst_2,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst_2
    );
  });
  it(`Проверка, что поля для ввода комментария не кликабельны`, function () {
    allureReporter.generateReport();

    let errorMessageRightPanelComment: string = `Поле с комментарием из правой панели Байкала кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    let errorMessageRequestPageComment: string = `Поле с комментарием из карточки заявки кликабельно.
    Хотя оно не должно быть кликабельно после того как заявка отправлена на проверку старшему аналитику`;

    baikalRequestPageBeta.waitForLoad();
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
