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

let testName: string = `Байкал. Проверка работоспобности поля "Цена" из фильтра Байкала.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-852`,
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
  it(`Проверка поля Проверка поля ${BaikalEnumFilterFields.PRICE} из фильтра Байкала.`, function () {
    allureReporter.generateReport({
      description: `Адрес = ${TestDataBaikal.Residential.address.only_moscow} \n
      В поле ${BaikalEnumFilterFields.PRICE} устанавливаем диапазон значений:
      "От" = ${TestDataBaikal.Residential.filter.price.moscow.price_from},
      "До" = ${TestDataBaikal.Residential.filter.price.moscow.price_to} \n
      Потом в разделе "Список объектов" проверяем, что все объекты, которые попали туда имеют цену из диапазона,
      указанного в фильтре.`,
    });

    baikalLeftPanelBetaFilter.waitForLoad();
    baikalLeftPanelBetaFilter.setValueInField(
      BaikalEnumFilterFields.PRICE,
      TestDataBaikal.Residential.filter.price.moscow.price_from,
      TestDataBaikal.Residential.filter.price.moscow.price_to
    );

    baikalHeaderBeta.goToSection(BaikalEnumHeader.LIST_OF_OBJECTS);
    baikalOffersBeta.waitForLoad();
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
    baikalRightPanelBetaStatistics.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.STATISTICS
    );

    let errorMsgWrongTableRowsCount = `Длина списка объектов по данным настройкам фильтра равна нулю.
    При возникновении ошибки надо проверить работоспособность фильтра руками.`;
    expect(baikalOffersBeta.$$table_rows.length, errorMsgWrongTableRowsCount).greaterThan(0);

    baikalOffersBeta.selectNumberOfElementsOnPage(
      BaikalEnumNumberElementsOnPage.ONE_HUNDRED_NINETY
    );

    // В цикле итерируемся построчно по таблице. В каждой строке ищем цену.
    // Удаляем из цены все пробелы и преобразуем к числу.
    // Проверяем входит ли полученная цена в тот диапазон, который указан в фильтре.
    debugLogging(`Проверяем, что в "Списке объектов" отображаются только те аналоги, которые попадают под
    ранее выставленные настройки фильтра.`);
    for (let row of baikalOffersBeta.$$table_rows) {
      let objectPrice: number = parseInt(
        baikalOffersBeta
          .getTextFromTable(row, BaikalEnumOffersClassNamesInTable.PRICE)
          .split(" ")
          .join("")
      );

      let errorMsgWrongPrice = `Цена объекта из таблицы = ${objectPrice}, а должна быть в диапазоне:
      ОТ ${TestDataBaikal.Residential.filter.price.moscow.price_from}
      ДО ${TestDataBaikal.Residential.filter.price.moscow.price_to}`;

      expect(objectPrice, errorMsgWrongPrice).to.be.within(
        parseInt(TestDataBaikal.Residential.filter.price.moscow.price_from),
        parseInt(TestDataBaikal.Residential.filter.price.moscow.price_to)
      );
    }
  });
});
