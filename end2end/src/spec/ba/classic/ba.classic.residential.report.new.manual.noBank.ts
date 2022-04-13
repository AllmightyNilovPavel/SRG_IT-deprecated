import { options } from "../../../options/index";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  baLoginPage,
  baMainPage,
  BaQualifiedRepairState,
  BaReportNavigationPanels,
  BaReportResidentialCalculationAlgorithm,
  BaReportResidentialLiquidity,
  BaReportResidentialMapType,
  BaReportResidentialPrintForm,
  BaReportResidentialRenovation,
  BaReportResidentialRoundValueVariants,
  BaReportResidentialSpaceToChoose,
  BaReportResidentialWearoutAlgorithm,
  BaResidentialBuildingOuterWallsMaterial,
  BaResidentialIntendedUse,
  BaResidentialIsTownhouse,
  BaResidentialNewReportTypes,
  BaResidentialObjectType,
  BaResidentialValuationPart,
  BuildingStage,
  residentialReportPage,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

const DEBUG = 0;
// const testReportURL = "/report.html?id=1500020274755";
const testReportURL = "/report.html?id=1500020388923";

describe(`БО. Жилая недвижимость. Отчёт. Ручное заполнение.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });

  let ReportTestData = TestDataBa.ResidentialReport.default;

  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;

    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });
  it(`Создание отчёта`, function () {
    allureReporter.generateReport();
    if (DEBUG && testReportURL) {
      console.log("+   DEBUG  +");
      browser.url(options.ba.host + testReportURL);
      residentialReportPage.BasicActions.waitForLoad();
    } else {
      baMainPage.createNewReport(BaResidentialNewReportTypes.RESIDENTIAL);
      residentialReportPage.BasicActions.waitForLoad();
    }
  });
  describe(`Заполнение отчёта`, function () {
    it(`Задание на оценку`, function () {
      allureReporter.generateReport();

      let page = residentialReportPage.AssesmentTaskActions;
      // Заполнение блока "Договор на оценку"
      page.setBlockData_AppraisalContract(
        ReportTestData.AssesmentTask.AppraisalContract.reportNumber,
        ReportTestData.AssesmentTask.AppraisalContract.appraisalPurpose,
        BaResidentialIntendedUse.FOR_COURT,
        ReportTestData.AssesmentTask.AppraisalContract.appraisalOwnership,
        ReportTestData.AssesmentTask.AppraisalContract.encumbrances
      );
      //  residentialReportPage.BasicActions.saveReport();
      // Заполнение блока "Сведения о заказчике"
      page.setBlockData_CustomerInfo(
        ReportTestData.AssesmentTask.CustomerInfo.customerFullName,
        ReportTestData.AssesmentTask.CustomerInfo.customerAddress,
        ReportTestData.AssesmentTask.CustomerInfo.customerPassportSerial,
        ReportTestData.AssesmentTask.CustomerInfo.customerPassportNumber,
        ReportTestData.AssesmentTask.CustomerInfo.customerPassportIssueDate,
        ReportTestData.AssesmentTask.CustomerInfo.customerPassportIssuer
      );
      // Заполнение блока "Подписанты по отчёту"
      // Заполнение блока "Тип Объекта оценки"
      page.setBlockData_valuationObjectType(
        BaResidentialObjectType.FLAT,
        BuildingStage.TITLE,
        BaResidentialIsTownhouse.YES,
        BaResidentialValuationPart.ENTIRELY,
        ReportTestData.AssesmentTask.ValuationObjectType.currentUse
      );
      //  residentialReportPage.BasicActions.saveReport();
      // Заполнение блока "Адрес Объекта оценки"
      page.setBlockData_appraisalObjectAddress(
        ReportTestData.AssesmentTask.AppraisalObjectAddress.address
      );
      //  residentialReportPage.BasicActions.saveReport();
      // Заполнение блока "Банк и форма отчёта"
      page.setBlockData_bankAndReportForm(
        BaReportResidentialPrintForm.COMMON,
        "Пустая глава",
        BaReportResidentialWearoutAlgorithm.NO,
        BaReportResidentialCalculationAlgorithm.EQUAL,
        BaReportResidentialSpaceToChoose.LIVING,
        BaReportResidentialMapType.IMAGE,
        BaReportResidentialRoundValueVariants.RUBLES
      );
      // Заполнение блока "Реквизиты отчёта"
      page.setBlockData_reportDetails(true, true);
      residentialReportPage.BasicActions.saveReport();
    });
    it(`Объект оценки`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ASSESMENT_OBJECT);

      let page = residentialReportPage.AssesmentObjectActions;
      page.waitForLoad();

      page.setBlockData_RoomsAndSpaceOfAssesmentObject(
        "test",
        2,
        55.6,
        35.7,
        7.23,
        6.67,
        70.11,
        "kykycuku",
        5,
        false,
        "test window view",
        "topchik toilet",
        "normik"
      );
      page.setBlockData_ArrangementAndRedevelopment(BaQualifiedRepairState.GOOD);
      residentialReportPage.BasicActions.saveReport();
    });
    it(`Здание и подъезд`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.BUILDING_INFO);

      let page = residentialReportPage.BuildingInfo;
      page.waitForLoad();

      page.setBlockData_BuildingAndNearbyTerritory(
        16,
        BaResidentialBuildingOuterWallsMaterial.BRICK,
        "Метан-Кирпич",
        "Кирпично-железо-бетонные",
        1990,
        "Нармальны",
        "уехала",
        4,
        BaReportResidentialRenovation.INVOLVED
      );
      residentialReportPage.BasicActions.saveReport();
    });
    it(`Местоположение и карта`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.LOCATION_AND_MAP);

      let page = residentialReportPage.LocationAndMap;
      residentialReportPage.BasicActions.checkReport();

      page.deleteField("administrativeRegion");
      page.setBlockData_districtAndLocationOfAssesmentObject(
        "1234",
        BaReportResidentialLiquidity.AVERAGE,
        "test description"
      );

      residentialReportPage.BasicActions.saveReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ANALOGS);
    });
    it(`Аналоги`, function () {
      allureReporter.generateReport();
      let page = residentialReportPage.AnalogData;
      page.waitForLoad();

      page.copyAnalogData(1);
      // console.log(page.getAnalogTextData(1, BaAnalogDataField.CITY));
      page.copyAnalogData(2);
      page.copyAnalogData(3);

      residentialReportPage.BasicActions.saveReport();
    });
    it(`Корректировки`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ADJUSTMENTS);
      let page = residentialReportPage.Adjustments;

      page.waitForLoad();
      page.setPriceRange(1, 1000000);
      residentialReportPage.BasicActions.saveReport();
    });
    it(`Ликвидационная стоимость`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.LIQUIDITION_PRICE);
      let page = residentialReportPage.LiquidationPrice;

      page.waitForLoad();
      page.setRiskFreeRate();
    });
    it(`Изображения и документы`, function () {
      allureReporter.generateReport();
      residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.DOCS_AND_PHOTOS);
      let page;
    });
  });
  describe(`Проверка корректного заполнения отчёта`, function () {
    it(`Задание на оценку`, function () {});
    it(`Объект оценки`, function () {});
    it(`Здание и подъезд`, function () {});
    it(`Местоположение и карта`, function () {});
    it(`Аналоги`, function () {});
    it(`Корректировки`, function () {});
    it(`Ликвидационная стоимость`, function () {});
    it(`Изображения и документы`, function () {});
  });
});
