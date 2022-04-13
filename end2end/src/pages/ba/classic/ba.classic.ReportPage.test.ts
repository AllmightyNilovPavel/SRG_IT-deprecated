import * as Func from "./residential/functions";
import * as Pages from "./residential/declarations";
import { BaReportNavigationPanels } from "./enums/ba.enum.report.navigationPanels";
import {
  BaReportResidentialCalculationAlgorithm,
  BaReportResidentialLiquidity,
  BaReportResidentialMapType,
  BaReportResidentialPrintForm,
  BaReportResidentialRenovation,
  BaReportResidentialRoundValueVariants,
  BaReportResidentialSpaceToChoose,
  BaReportResidentialWearoutAlgorithm,
  BuildingStage,
  BaResidentialIntendedUse,
  BaResidentialIsTownhouse,
  BaResidentialObjectType,
  BaQualifiedRepairState,
  BaResidentialValuationPart,
} from "./enums";
import { IResidentialReportVtb } from "options/testData/ba/interfaces/ba.interface.vtb.residentialReport";

export class BaResidentialReportPage {
  Base = new Pages.BaResidentialReportBase();
  Navigation = new Pages.BaResidentialReportNavBar();

  BasicActions = new Func.BaResidentialReportActions();
  /** Задание на оценку */
  AssesmentTaskActions = new Func.BaResidentialReportPartAssesmentTaskFunctions();
  /** Объект оценки */
  AssesmentObjectActions = new Func.BaResidentialReportPartAssesmentObjectFunctions();
  /** Здание и подъезд */
  BuildingInfo = new Func.BaResidentialReportPartBuildingInfoFunctions();
  /** Местоположение и карта */
  LocationAndMap = new Func.BaResidentialReportPartLocationAndMapFunctions();
  /** Аналоги */
  AnalogData = new Func.BaResidentialReportPartAnalogsFunctionsSetters();
  /** Корректировки */
  Adjustments = new Func.BaResidentialReportPartAdjustmentsFunctions();
  /** Ликвидационная стоимость */
  LiquidationPrice = new Func.BaResidentialReportPartLiquidationPriceFunctions();

  GenerateFullReport(TestData: IResidentialReportVtb) {
    // Задание на оценку
    // --- Заполнение блока "Договор на оценку"
    this.AssesmentTaskActions.setBlockData_AppraisalContract(
      TestData.AssesmentTask.AppraisalContract.reportNumber,
      TestData.AssesmentTask.AppraisalContract.appraisalPurpose,
      BaResidentialIntendedUse[TestData.AssesmentTask.AppraisalContract.intendedUse],
      TestData.AssesmentTask.AppraisalContract.appraisalOwnership,
      TestData.AssesmentTask.AppraisalContract.encumbrances
    );
    this.BasicActions.saveReport();
    // Заполнение блока "Сведения о заказчике"
    this.AssesmentTaskActions.setBlockData_CustomerInfo(
      TestData.AssesmentTask.CustomerInfo.customerFullName,
      TestData.AssesmentTask.CustomerInfo.customerAddress,
      TestData.AssesmentTask.CustomerInfo.customerPassportSerial,
      TestData.AssesmentTask.CustomerInfo.customerPassportNumber,
      TestData.AssesmentTask.CustomerInfo.customerPassportIssueDate,
      TestData.AssesmentTask.CustomerInfo.customerPassportIssuer
    );
    // Заполнение блока "Подписанты по отчёту"
    // Заполнение блока "Тип Объекта оценки"
    this.AssesmentTaskActions.setBlockData_valuationObjectType(
      BaResidentialObjectType[TestData.AssesmentTask.ValuationObjectType.objType],
      BuildingStage[TestData.AssesmentTask.ValuationObjectType.buildStage],
      BaResidentialIsTownhouse[TestData.AssesmentTask.ValuationObjectType.isTownhouse],
      BaResidentialValuationPart[TestData.AssesmentTask.ValuationObjectType.valPart],
      TestData.AssesmentTask.ValuationObjectType.currentUse
    );
    this.BasicActions.saveReport();
    // Заполнение блока "Адрес Объекта оценки"
    this.AssesmentTaskActions.setBlockData_appraisalObjectAddress(
      TestData.AssesmentTask.AppraisalObjectAddress.address
    );
    this.BasicActions.saveReport();
    // Заполнение блока "Банк и форма отчёта"
    this.AssesmentTaskActions.setBlockData_bankAndReportForm(
      BaReportResidentialPrintForm[TestData.AssesmentTask.BankAndReportForm.printForm],
      TestData.AssesmentTask.BankAndReportForm.marketResearchName,
      BaReportResidentialWearoutAlgorithm[TestData.AssesmentTask.BankAndReportForm.wearoutAlgoritm],
      BaReportResidentialCalculationAlgorithm[
        TestData.AssesmentTask.BankAndReportForm.calcAlgorithm
      ],
      BaReportResidentialSpaceToChoose[TestData.AssesmentTask.BankAndReportForm.spaceToChoose],
      BaReportResidentialMapType[TestData.AssesmentTask.BankAndReportForm.mapType],
      BaReportResidentialRoundValueVariants[
        TestData.AssesmentTask.BankAndReportForm.roundValueVariant
      ]
    );
    // Заполнение блока "Реквизиты отчёта"
    this.AssesmentTaskActions.setBlockData_reportDetails(
      TestData.AssesmentTask.ReportDetails.copyAgrDate,
      TestData.AssesmentTask.ReportDetails.useDollarPrice
    );
    this.BasicActions.saveReport();
    // Объект оценки
    this.Navigation.navigateTo(BaReportNavigationPanels.ASSESMENT_OBJECT);
    this.AssesmentObjectActions.waitForLoad();

    this.AssesmentObjectActions.setBlockData_RoomsAndSpaceOfAssesmentObject(
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.dataSource,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.roomsCount,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.spaceTotal,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.spaceLiving,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.spaceKitchen,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.spaceBalcony,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.spaceTotalWithBalcony,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.roomsTypeInfo,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.floorInfo,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.isMansard,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.windowView,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.wcInfo,
      TestData.AssesmentObject.roomsAndSpaceOfAssesmentObject.balconyInfo
    );
    this.AssesmentObjectActions.setBlockData_ArrangementAndRedevelopment(
      BaQualifiedRepairState[TestData.AssesmentObject.arrangementAndRedevelopment.repairState]
    );
    this.BasicActions.saveReport();
    // Здание и подъезд
    this.Navigation.navigateTo(BaReportNavigationPanels.BUILDING_INFO);
    this.BuildingInfo.waitForLoad();

    this.BuildingInfo.setBlockData_BuildingAndNearbyTerritory(
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.storeys,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.outerWallsMaterial,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.btiWallsMaterial,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.buildingCeilings,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.builtInYear,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.stateOfBuilding,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.stateOfRoof,
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.flatsCount,
      BaReportResidentialRenovation[
        TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.renovationData
      ],
      TestData.AssesmentObjectBuildingAndTerritory.buildingAndNearbyTerritory.renovationComment
    );
    this.BasicActions.saveReport();
    // Местоположение и карта
    this.Navigation.navigateTo(BaReportNavigationPanels.LOCATION_AND_MAP);
    this.BasicActions.checkReport();

    this.LocationAndMap.deleteField("administrativeRegion");
    this.LocationAndMap.setBlockData_districtAndLocationOfAssesmentObject(
      TestData.LocationAndMap.locationAndMap.averagePrice,
      BaReportResidentialLiquidity[TestData.LocationAndMap.locationAndMap.liquidity],
      TestData.LocationAndMap.locationAndMap.nearPlantsDesc
    );

    this.BasicActions.saveReport();
    // Заполнение аналогов
    this.Navigation.navigateTo(BaReportNavigationPanels.ANALOGS);
    this.AnalogData.waitForLoad();
    this.AnalogData.copyAnalogData(1);
    // console.log(page.getAnalogTextData(1, BaAnalogDataField.CITY));
    this.AnalogData.copyAnalogData(2);
    this.AnalogData.copyAnalogData(3);
    this.BasicActions.saveReport();
  }
}

export const residentialReportPage = new BaResidentialReportPage();
