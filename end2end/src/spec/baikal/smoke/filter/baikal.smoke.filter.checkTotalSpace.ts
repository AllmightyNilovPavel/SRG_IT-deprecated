import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import {
  baikalDemoBeta,
  baikalHeaderBeta,
  baikalLeftPanelBetaFilter,
  baikalMapBeta,
  baikalOffersBeta,
  baikalRightPanelBetaStatistics,
} from "pages/baikal/beta/index";
import {
  BaikalEnumDemoModeHousingType,
  BaikalEnumFilterFields,
  BaikalEnumHeader,
  BaikalEnumNumberElementsOnPage,
  BaikalEnumOffersClassNamesInTable,
  BaikalEnumRightPanelButtons,
} from "pages/baikal/enums";
import { expect } from "chai";
import { debugLogging } from "modules";

let testName: string = `Байкал. Проверка работоспобности поля "Площадь" из фильтра Байкала.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-883`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Данные для авторизации. \n
      Логин:${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst}
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst}`,
    });
    baikalDemoBeta.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalDemoBeta.waitForLoad(TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst);
  });
  it(`Из демо режима перейти в сам Байкал на раздел "Карта"`, function () {
    allureReporter.generateReport({
      description: `Выбрать критерии для поиска аналогов и перейти к поиску аналогов на карту Байкала. \n
      Критерии: ${JSON.stringify(TestDataBaikal.Residential.address.only_moscow, void 0, 2)}`,
    });
    baikalDemoBeta.search_for_realty(
      TestDataBaikal.Residential.address.only_moscow,
      BaikalEnumDemoModeHousingType.FLAT
    );
    baikalMapBeta.waitForLoad();
  });
  it(`Проверка поля ${BaikalEnumFilterFields.TOTAL_SPACE} из фильтра Байкала.`, function () {
    allureReporter.generateReport({
      description: `Адрес = ${TestDataBaikal.Residential.address.only_moscow} \n
      В поле ${BaikalEnumFilterFields.TOTAL_SPACE} устанавливаем диапазон значений
      "От" = ${TestDataBaikal.Residential.filter.totalSpace.moscow.space_from},
      "До" = ${TestDataBaikal.Residential.filter.totalSpace.moscow.space_to} \n
      Потом в разделе "Список объектов" проверяем, что все объекты, которые попали туда имеют
      ${BaikalEnumFilterFields.TOTAL_SPACE} из диапазона, указанного в фильтре.`,
    });

    baikalLeftPanelBetaFilter.waitForLoad();
    baikalLeftPanelBetaFilter.setValueInField(
      BaikalEnumFilterFields.TOTAL_SPACE,
      TestDataBaikal.Residential.filter.totalSpace.moscow.space_from,
      TestDataBaikal.Residential.filter.totalSpace.moscow.space_to
    );

    baikalHeaderBeta.goToSection(BaikalEnumHeader.LIST_OF_OBJECTS);
    baikalOffersBeta.waitForLoad();
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.STATISTICS
    );

    expect(
      baikalOffersBeta.$$table_rows.length,
      `Длина списка объектов по данным настройкам фильтра равна нулю.
    При возникновении ошибки надо проверить работоспособность фильтра руками.`
    ).greaterThan(0);
    baikalOffersBeta.selectNumberOfElementsOnPage(
      BaikalEnumNumberElementsOnPage.ONE_HUNDRED_NINETY
    );

    debugLogging(`Проверяем, что в "Списке объектов" отображаются только те аналоги, которые попадают под
    ранее выставленные настройки фильтра.`);
    for (let row of baikalOffersBeta.$$table_rows) {
      let objectTotalSpace: number = parseInt(
        baikalOffersBeta
          .getTextFromTable(row, BaikalEnumOffersClassNamesInTable.TOTAL_SPACE)
          .split(" ")
          .join("")
      );

      expect(
        objectTotalSpace,
        `${BaikalEnumFilterFields.TOTAL_SPACE} у аналога из таблицы равен = ${objectTotalSpace},
        а должен быть в диапазоне
        ОТ ${TestDataBaikal.Residential.filter.totalSpace.moscow.space_from}
        ДО ${TestDataBaikal.Residential.filter.totalSpace.moscow.space_to}`
      ).to.be.within(
        parseInt(TestDataBaikal.Residential.filter.totalSpace.moscow.space_from),
        parseInt(TestDataBaikal.Residential.filter.totalSpace.moscow.space_to)
      );
    }
  });
});
