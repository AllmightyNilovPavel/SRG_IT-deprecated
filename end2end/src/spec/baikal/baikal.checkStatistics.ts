import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baikalAuth,
  baikalCalculationBetaCalculation,
  baikalCalculationBetaStatistics,
  BaikalEnumCalculationLeftMenu,
  BaikalEnumEmptyStatisticsCheckValues,
  BaikalEnumHeader,
  BaikalEnumRightPanelButtons,
  BaikalEnumRightPanelStatisticVersion,
  BaikalEnumSectionsFromRightPanelStatistic,
  BaikalEnumStatisticsFromCalculation,
  BaikalEnumStatisticsFromRightPanelLong,
  BaikalEnumStatisticsFromRightPanelShort,
  baikalHeaderBeta,
  baikalMapBeta,
  baikalRequestPageBeta,
  baikalRightPanelBetaComparables,
  baikalRightPanelBetaStatistics,
} from "pages/baikal/index";
import {
  baikalResetDataInFilter,
  baikalGoToCalculation,
  baikalAddComparablesToCalculation,
} from "pages/baikal/supportMethods";

import { KronaRequestForBaikal } from "pages/Krona/index";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { BaikalFillComparable } from "pages/baikal/supportClasses/baikal.fillComparable";
import { makeScreenshot } from "modules/screenshotsMaker";
import { debugLogging } from "modules";
import { expect } from "chai";

let testName: string = `Байкал. Проверка наличия статистики в поиске/аналогах/избранном и самом расчетнике.
Скроллит статистику в таблице построчно.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-711",
  });
  it(`Создание запроса стоимости и открытие этого запроса в Байкале.`, function () {
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
    browser.maximizeWindow();
    new KronaRequestForBaikal(
      TestDataKrona.Users.login.alfa.autotest_baikal,
      TestDataKrona.Users.password.alfa.autotest_baikal,
      TestDataKrona.Users.login.srg.autotest_baikal_senior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_senior_analyst,
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
  it.skip("Проверить статистику из правой панели Байкала когда аналоги НЕ добавлены", function () {
    // Этот шаг пропускается из-за того, что есть баг https://srgroup.atlassian.net/browse/BL-718.
    // После фикса бага можно убрать skip
    allureReporter.generateReport({
      description: `Проверить статистику во вкладке "Аналоги", когда аналогов НЕТ.
        Вкладку "Поиск" нет смысла проверять пока не настроен фильтр по дате,
        т.к. Байкал открывается на "максимальном зуме",
        то может быть ситуация, что НЕТ аналогов в зоне видимости экрана.`,
    });
    baikalRightPanelBetaStatistics.goToSectionFromRightMenu(BaikalEnumRightPanelButtons.STATISTICS);
    baikalRightPanelBetaStatistics.statsPanelSection(
      BaikalEnumSectionsFromRightPanelStatistic.COMPARABLES
    );

    // Проверяем краткую версию статистики
    baikalRightPanelBetaStatistics.statsPanelVersion(BaikalEnumRightPanelStatisticVersion.SHORT);

    // Итерируемся по енаму. Проверяем, что значение каждой из строк входит в енам с пустыми значениями.
    // Значения статистики пустые, т.к. аналоги еще не добавлены.
    Object.keys(BaikalEnumStatisticsFromRightPanelShort).forEach((enumKey) => {
      let enumValue = BaikalEnumStatisticsFromRightPanelLong[enumKey];
      debugLogging(`Проверяем статистику в строке ${enumKey}`);
      let statValue = baikalRightPanelBetaStatistics.getStatValue(enumValue);
      debugLogging(`В строке ${enumKey} значение = ${statValue}`);
      let errorMessage: string = `Статистика в строке заполнена, а должна быть пустой,
      т.к. аналоги не добавлены. ${enumKey} = ${statValue}`;
      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v === statValue),
        errorMessage
      ).to.be.true;
    });

    // Проверяем длинную версию статистики
    baikalRightPanelBetaStatistics.statsPanelVersion(BaikalEnumRightPanelStatisticVersion.LONG);
    Object.keys(BaikalEnumStatisticsFromRightPanelLong).forEach((enumKey) => {
      let enumValue = BaikalEnumStatisticsFromRightPanelLong[enumKey];
      debugLogging(`Проверяем статистику в строке ${enumKey}`);
      let statValue = baikalRightPanelBetaStatistics.getStatValue(enumValue);
      debugLogging(`В строке ${enumKey} значение = ${statValue}`);
      let errorMessage: string = `Статистика в строке заполнена, а должна быть пустой,
      т.к. аналоги не добавлены. ${enumKey} = ${statValue}`;
      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v === statValue),
        errorMessage
      ).to.be.true;
    });

    /** Проверить статистику во вкладке "Избранное", когда аналогов НЕТ. */
    baikalRightPanelBetaStatistics.statsPanelSection(
      BaikalEnumSectionsFromRightPanelStatistic.FAVORITES
    );
    baikalRightPanelBetaStatistics.statsPanelVersion(BaikalEnumRightPanelStatisticVersion.SHORT);
    Object.keys(BaikalEnumStatisticsFromRightPanelShort).forEach((enumKey) => {
      let enumValue = BaikalEnumStatisticsFromRightPanelLong[enumKey];
      debugLogging(`Проверяем статистику в строке ${enumKey}`);
      let statValue = baikalRightPanelBetaStatistics.getStatValue(enumValue);
      debugLogging(`В строке ${enumKey} значение = ${statValue}`);
      let errorMessage: string = `Статистика в строке заполнена, а должна быть пустой,
      т.к. аналоги не добавлены. ${enumKey} = ${statValue}`;
      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v === statValue),
        errorMessage
      ).to.be.true;
    });

    baikalRightPanelBetaStatistics.statsPanelVersion(BaikalEnumRightPanelStatisticVersion.LONG);
    Object.keys(BaikalEnumStatisticsFromRightPanelLong).forEach((enumKey) => {
      let enumValue = BaikalEnumStatisticsFromRightPanelLong[enumKey];
      debugLogging(`Проверяем статистику в строке ${enumKey}`);
      let statValue = baikalRightPanelBetaStatistics.getStatValue(enumValue);
      debugLogging(`В строке ${enumKey} значение = ${statValue}`);
      let errorMessage: string = `Статистика в строке заполнена, а должна быть пустой,
      т.к. аналоги не добавлены. ${enumKey} = ${statValue}`;
      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v === statValue),
        errorMessage
      ).to.be.true;
    });
  });
  it("Проверить статистику в РАСЧЕТНИКЕ когда аналоги НЕ добавлены", function () {
    allureReporter.generateReport();
    baikalHeaderBeta.goToSection(BaikalEnumHeader.CALCULATION);
    baikalCalculationBetaCalculation.waitForLoad();
    baikalCalculationBetaStatistics.goToSection(BaikalEnumCalculationLeftMenu.STATISTICS);
    baikalCalculationBetaStatistics.waitForLoad();

    // Итерируемся по значениям енама. Значение енама - это имя параметра в таблице
    // С помощью метода getStatValue возвращаем значение параметра из таблицы
    // Проверяем, что возвращенное значение не входит в енам с пустыми значениями
    let CALC_STAT: String[] = [];
    Object.values(BaikalEnumStatisticsFromCalculation).forEach((value) => {
      let statValue = baikalCalculationBetaStatistics.getStatValue(value);
      let errorMessage: string = `Статистика в строке заполнена, а должна быть пустой,
      т.к. аналоги не добавлены. ${value} = ${statValue}`;

      debugLogging(`Проверяем статистику в строке ${value}`);
      debugLogging(`В строке ${value} значение = ${statValue}`);

      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v === statValue),
        errorMessage
      ).to.be.true;

      CALC_STAT.push(`${value ? value : "-"}: ${statValue ? statValue : "-"}`);
    });
    makeScreenshot(`1`);
    allureReporter.generateReport({
      additionalArguments: [
        { argName: `Статистика при отсутствии анлогов`, argValue: CALC_STAT!.join(" | ") },
      ],
    });
  });
  it(`Выставить дату для поиска аналогов`, function () {
    allureReporter.generateReport();
    baikalResetDataInFilter();
  });
  it(`Добавить аналоги в расчетник`, function () {
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
  it(`Добавить аналоги в избранное`, function () {
    allureReporter.generateReport();
    baikalHeaderBeta.goToSection(BaikalEnumHeader.MAP);
    baikalMapBeta.waitForLoad();
    baikalRightPanelBetaComparables.goToSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
    baikalRightPanelBetaComparables.addToFavorite();
    baikalRightPanelBetaComparables.closeSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
  });
  it(`Проверить статистику во всех вкладках и версиях из правой панели Байкала когда аналоги добавлены`, function () {
    allureReporter.generateReport();
    let CALC_STAT: String[];

    baikalRightPanelBetaStatistics.goToSectionFromRightMenu(BaikalEnumRightPanelButtons.STATISTICS);
    for (let section in BaikalEnumSectionsFromRightPanelStatistic) {
      let SECTION_NAME = BaikalEnumSectionsFromRightPanelStatistic[section];
      baikalRightPanelBetaStatistics.statsPanelSection(
        BaikalEnumSectionsFromRightPanelStatistic[section]
      );
      CALC_STAT = [];
      for (let version in BaikalEnumRightPanelStatisticVersion) {
        let STAT_VERSION = BaikalEnumRightPanelStatisticVersion[version];

        baikalRightPanelBetaStatistics.statsPanelVersion(
          BaikalEnumRightPanelStatisticVersion[version]
        );
        Object.keys(BaikalEnumStatisticsFromRightPanelShort).forEach((enumKey) => {
          let enumValue = BaikalEnumStatisticsFromRightPanelLong[enumKey];
          let statValue = baikalRightPanelBetaStatistics.getStatValue(enumValue);
          let errorMessage: string = `Статистика в строке пустая, а должна быть заполнена, т.к. дата выборки большая
           и поиск должен был найти объекты на карте. ${enumKey} = ${statValue}`;

          debugLogging(`Проверяем статистику в строке ${enumKey}`);
          debugLogging(`В строке ${enumKey} значение = ${statValue}`);
          if (
            enumKey != BaikalEnumStatisticsFromRightPanelLong.SHAPIRO_WILK_TEST &&
            enumKey != BaikalEnumStatisticsFromRightPanelLong.D_AGOSTINA_K_SQUARED
          ) {
            expect(
              Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v !== statValue),
              errorMessage
            ).to.be.true;
            CALC_STAT.push(`${enumKey}: ${statValue !== null ? statValue : "-"}`);
          }
        });
        allureReporter.generateReport({
          additionalArguments: [
            {
              argName: `Данные статистики ${SECTION_NAME}[${STAT_VERSION}]`,
              argValue: CALC_STAT!.join(" | "),
            },
          ],
        });
      }
    }
    makeScreenshot(`2`);
  });
  it("Проверить статистику в расчетнике когда аналоги добавлены", function () {
    allureReporter.generateReport();
    baikalHeaderBeta.goToSection(BaikalEnumHeader.CALCULATION);
    baikalCalculationBetaStatistics.goToSection(BaikalEnumCalculationLeftMenu.STATISTICS);
    baikalCalculationBetaStatistics.waitForLoad();

    let CALC_STAT: String[] = [];
    Object.values(BaikalEnumStatisticsFromCalculation).forEach((value, index) => {
      let statValue = baikalCalculationBetaStatistics.getStatValue(value);
      let errorMessage: string = `Статистика в строке пустая, а должна быть заполненной,
      т.к. аналоги добавлены в расчетник. ${value} = ${statValue}`;

      debugLogging(`Проверяем статистику в строке ${value}`);
      debugLogging(`В строке ${value} значение = ${statValue}`);

      expect(
        Object.values(BaikalEnumEmptyStatisticsCheckValues).some((v) => v !== statValue),
        errorMessage
      ).to.be.true;
      CALC_STAT.push(`${value}: ${statValue !== null ? statValue : "-"}`);
    });
    allureReporter.generateReport({
      additionalArguments: [
        {
          argName: `Статистика когда налоги добавлены`,
          argValue: CALC_STAT!.join(" | "),
        },
      ],
    });
    makeScreenshot(`3`);
  });
});
