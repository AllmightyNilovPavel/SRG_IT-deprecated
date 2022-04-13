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
  BaikalEnumColumnsInOffersList,
  BaikalEnumDemoModeHousingType,
  BaikalEnumFilterFields,
  BaikalEnumHeader,
  BaikalEnumNumberElementsOnPage,
  BaikalEnumOffersClassNamesInTable,
  BaikalEnumRightPanelButtons,
} from "pages/baikal/enums";
import { expect } from "chai";
import { debugLogging } from "modules";

let testName: string = `Байкал. Проверка работоспобности поля "Площадь кухни" из фильтра Байкала.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-886`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Данные для авторизации. \n
      Логин:${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst} \n
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
  it(`Проверка поля ${BaikalEnumFilterFields.KITCHEN_SPACE} из фильтра Байкала.`, function () {
    allureReporter.generateReport({
      description: `Адрес = ${TestDataBaikal.Residential.address.only_moscow} \n
      В поле ${BaikalEnumFilterFields.KITCHEN_SPACE} устанавливаем диапазон значений \n
      "От" = ${TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_from},
      "До" = ${TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_to} \n
      Потом в разделе "Список объектов" проверяем, что все объекты, которые попали туда имеют
      ${BaikalEnumFilterFields.KITCHEN_SPACE} из диапазона, указанного в фильтре.`,
    });

    baikalLeftPanelBetaFilter.waitForLoad();
    baikalLeftPanelBetaFilter.setValueInField(
      BaikalEnumFilterFields.KITCHEN_SPACE,
      TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_from,
      TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_to
    );

    baikalHeaderBeta.goToSection(BaikalEnumHeader.LIST_OF_OBJECTS);
    baikalOffersBeta.waitForLoad();
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.STATISTICS
    );

    baikalOffersBeta.selectColumns([BaikalEnumColumnsInOffersList.KITCHEN_SPACE]);

    let errorMsgWrongTableRowsCount = `Длина списка объектов по данным настройкам фильтра равна нулю.
    При возникновении ошибки надо проверить работоспособность фильтра руками.`;
    expect(baikalOffersBeta.$$table_rows.length, errorMsgWrongTableRowsCount).greaterThan(0);
    baikalOffersBeta.selectNumberOfElementsOnPage(
      BaikalEnumNumberElementsOnPage.ONE_HUNDRED_NINETY
    );

    debugLogging(`Проверяем, что в "Списке объектов" отображаются только те аналоги, которые попадают под
    ранее выставленные настройки фильтра.`);
    for (let row of baikalOffersBeta.$$table_rows) {
      // Для того, чтобы убрать пробелы между разрядами в конечном числе, то используем split + join
      let objectKitchenSpace: number = parseInt(
        baikalOffersBeta
          .getTextFromTable(row, BaikalEnumOffersClassNamesInTable.KITCHEN_SPACE)
          .split(" ")
          .join("")
      );

      let errorMsgWrongKitchenSpace = `${BaikalEnumFilterFields.KITCHEN_SPACE} у аналога из таблицы равен = ${objectKitchenSpace},
        а должен быть в диапазоне: 
        ОТ ${TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_from}
        ДО ${TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_to}`;

      expect(objectKitchenSpace, errorMsgWrongKitchenSpace).to.be.within(
        parseInt(TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_from),
        parseInt(TestDataBaikal.Residential.filter.kitchenSpace.moscow.space_to)
      );
    }
  });
});
