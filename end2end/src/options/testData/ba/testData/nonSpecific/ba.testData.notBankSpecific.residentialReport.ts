const today = new Date().toLocaleDateString();

export const BaTestDataNotBankSpecificResidential = {
  AssesmentTask: {
    AppraisalContract: {
      reportNumber: `residential_autotest_${today}`,
      appraisalPurpose: "Тестовая цель оценки",
      intendedUse: "FOR_COURT",
      appraisalOwnership: "Тестовые права",
      encumbrances: "Тестовые обременения",
    },
    CustomerInfo: {
      customerFullName: "Нилов Павел Automation Tester",
      customerAddress: "тестовый адрес",
      customerPassportSerial: "1234",
      customerPassportNumber: "123123",
      customerPassportIssueDate: "15.09.2020",
      customerPassportIssuer: "500-122",
    },
    ValuationObjectType: {
      objType: "FLAT",
      buildStage: "TITLE",
      isTownhouse: "YES",
      valPart: "ENTIRELY",
      currentUse: "Для автотестирования",
    },
    AppraisalObjectAddress: {
      address: "Москва, ул. Полярная, дом 31, кв 10",
    },
    BankAndReportForm: {
      printForm: "COMMON",
      marketResearchName: "Пустая глава",
      wearoutAlgoritm: "NO",
      calcAlgorithm: "EQUAL",
      spaceToChoose: "LIVING",
      mapType: "NO_MAP",
      roundValueVariant: "RUBLES",
    },
    ReportDetails: {
      copyAgrDate: true,
      useDollarPrice: true,
    },
  },
  AssesmentObject: {
    FieldsToDelete: {},
    RoomsAndSpaceOfAssesmentObject: {
      dataSource: "test",
      roomsCount: 2,
      spaceTotal: 55.6,
      spaceLiving: "35,7",
      spaceKitchen: 7.23,
      spaceBalcony: "6.67",
      spaceTotalWithBalcony: 70.11,
      roomsTypeInfo: "kykycuku",
      floorInfo: 5,
      isMansard: false,
      windowView: "test window view",
      wcInfo: "topchik toilet",
      balconyInfo: "normik",
    },
    ArrangementAndRedevelopment: {
      repairState: "GOOD",
    },
  },
  AssesmentObjectBuildingAndTerritory: {
    FieldsToDelete: {},
    BuildingAndNearbyTerritory: {
      storeys: 16,
      outerWallsMaterial: "Кирпичик",
      btiWallsMaterial: "Метан-Кирпич",
      buildingCeilings: "Кирпично-железо-бетонные",
      builtInYear: 1990,
      stateOfBuilding: "Нармальны",
      stateOfRoof: "уехала",
      flatsCount: 4,
      renovationData: "INVOLVED",
    },
  },
  LocationAndMap: {
    FieldsToDelete: {},
    LocationAndMap: {
      averagePrice: "2281488",
      liquidity: "AVERAGE",
      nearPlantsDesc: "test near plants description",
    },
  },
};
