const today = new Date().toLocaleDateString();
// при добавлении полей не забыть поправить описание интерфейсов ниже.
export const TestDataBa = {
  Users: {
    ids: {
      Zarnitsa: {
        admin: "1500001776198",
        /** Нестеров Б. Е. */
        admin2: "1500019771523",
        /** Русаков М. Ю. */
        admin3: "1500003336326",
        /** Малых Е. С. */
        admin4: "1500019790989",
      },
    },
    login: {
      zarnitsa: {
        admin: "admin@zarnitsa.ru",
        admin2: "Admin23@zarnitsa.ru",
      },
      srg: {
        ipotechniyCenter: "abdullin@srgroup.ru",
        autotest_superadmin: "autotest_srg_superadmin@srg.ru",
        moderator: "moderator@test.ru",
        konsalting: "Terekhov_BA@mail.ru",
      },
    },
    password: {
      zarnitsa: {
        admin: "testtest",
        admin2: "29122020",
      },
      srg: {
        ipotechniyCenter: "testtest",
        autotest_superadmin: "autotest_srg_superadmin",
        moderator: "moderator",
        konsalting: "testtest",
      },
    },
  },
  Companies: {
    Zarnitsa: 1500020257261,
    IpotechniyCenter: 1,
  },
  ResidentialReport: {
    default: {
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
    },
    VTB: {
      appraisalServicePrice: "1234",
      appraisalOwnership: "Право собственности",
      encumbrances: "Без обременений",
      customerFullName: "Автотестов Автотест Автотестович",
      currentUse: "for Autotest",
      bankUser: "Якубов Александр (Yakubov.AV@bryansk.vtb24.ru)",
    },
    CheckPoints: {
      residential: {
        /** Текст в шапке модального окна подтверждения оплаты */
        payConfirm: "Подтверждение оплаты отчета",
        /** Текст в шапке модального окна успешной оплаты */
        paySuccess: "Оплата прошла успешно",
      },
    },
  },
  /** Создаем отчет КН для одного встроенного помещения без ЗУ */
  CommercialReportOneBuildIn: {
    /** Реквизиты отчёта */
    requisites: {
      reportNumber: `${today}-autotest`,
      creditNumber: "6561",
    },
    agreement: {
      /** Договор на оценку */
      agreementNumber: "1",
      appraisalPurpose: "Определение рыночной стоимости Объекта оценки",
      intendedUseComm: "Для залога прав собственности",
      appraisalOwnershipComm: "Право собственности",
      servicesPriceByContract: "10",
      nds_index: 1,
    },
    participant: {
      /** ФИО */
      fullName: "Иванов Иван иванович",
    },
    commercialObject: {
      /** Сведения об объекте оценки */
      commercialObjectType_index: 1, // Встроенное помещение
      commercialObjectContent_index: 2, // Одно встроенное помещение БЕЗ земельного участка
      approachComparativeNds: "10",
      approachIncomeNds: "10",
      approachExpensesNds: "10",
    },
    bankData: {
      bank: "ВТБ Учебный",
    },
    realty: {
      /** Результаты оценки */
      commercialType_index: 1,
      commercialSubType_index: 1,
    },
    location: {
      /** Сведения об объекте оценки */
      address: "г Москва, ул Фридриха Энгельса",
      cadastralNumber: "123456",
      localityStatus_index: 1,
      locationWithinLocality_index: 1,
      buildingLine_index: 1,
      objectAccess_index: 1,
    },
    totalSpace: {
      /** Общая площадь */
      spaceTotal: "100",
      spaceOffice: "100",
      condition: "100",
      heat: "100",
      floor: "100",
      buildingWalls_index: 1,
      objectClass_index: 1,
      parkingAvailable_index: 1,
    },
    leasableSpace: {
      /** Арендопригодная площадь */
      spaceTotal: "100",
      spaceOffice: "100",
      condition: "100",
      heat: "100",
      floor: "100",
    },
    addition: {
      /** Степень износа для вкладки "дополнительная информация" */
      depreciation: "10",
    },
  },
};
export interface IResidentialReport {
  AssesmentTask: {
    AppraisalContract: {
      reportNumber: string;
      appraisalPurpose: string;
      intendedUse: string;
      appraisalOwnership: string;
      encumbrances: string;
    };
    CustomerInfo: {
      customerFullName: string;
      customerAddress: string;
      customerPassportSerial: string;
      customerPassportNumber: string;
      customerPassportIssueDate: string;
      customerPassportIssuer: string;
    };
    ValuationObjectType: {
      objType: string;
      buildStage: string;
      isTownhouse: string;
      valPart: string;
      currentUse: string;
    };
    AppraisalObjectAddress: {
      address?: string;
      cadastrNum?: string;
    };
    BankAndReportForm: {
      printForm: string;
      marketResearchName: string;
      wearoutAlgoritm: string;
      calcAlgorithm: string;
      spaceToChoose: string;
      mapType: string;
      roundValueVariant: string;
      borrowerName?: string;
    };
    ReportDetails: {
      copyAgrDate: boolean;
      useDollarPrice: boolean;
      appraisalDate?: string;
      inspectionDate?: string;
      composeDate?: string;
    };
  };
  AssesmentObject: {
    FieldsToDelete: unknown;
    roomsAndSpaceOfAssesmentObject: {
      dataSource: string;
      roomsCount: string | number;
      spaceTotal: string | number;
      spaceLiving: string | number;
      spaceKitchen: string | number;
      spaceBalcony: string | number;
      spaceTotalWithBalcony: string | number;
      roomsTypeInfo: string;
      floorInfo: string | number;
      isMansard: boolean;
      windowView: string;
      wcInfo: string;
      balconyInfo: string;
    };
    arrangementAndRedevelopment: {
      repairState: string;
    };
  };
  AssesmentObjectBuildingAndTerritory: {
    FieldsToDelete: {
      field_1: string;
      field_2: string;
      field_3: string;
    };
    buildingAndNearbyTerritory: {
      storeys: string | number;
      outerWallsMaterial: string;
      btiWallsMaterial: string;
      buildingCeilings: string;
      builtInYear: string | number;
      stateOfBuilding: string;
      stateOfRoof: string;
      flatsCount: string | number;
      renovationData: string;
      renovationComment?: string;
    };
  };
  LocationAndMap: {
    fieldsToDelete: {
      field_1: string;
      field_2: string;
      field_3: string;
    };
    locationAndMap: {
      averagePrice: string;
      liquidity: string;
      nearPlantsDesc: string;
    };
  };
}
export interface ICommercialReport {
  /** Реквизиты отчёта */
  requisites: {
    reportNumber: string;
    creditNumber: string;
  };
  agreement: {
    /** Договор на оценку */
    agreementNumber: string;
    appraisalPurpose: string;
    intendedUseComm: string;
    appraisalOwnershipComm: string;
    servicesPriceByContract: string;
    nds_index: number;
  };
  participant: {
    /** ФИО */
    fullName: string;
  };
  commercialObject: {
    /** Сведения об объекте оценки */
    commercialObjectType_index: number; // Встроенное помещение
    commercialObjectContent_index: number; // Одно встроенное помещение БЕЗ земельного участка
    approachComparativeNds: string;
    approachIncomeNds: string;
    approachExpensesNds: string;
  };
  bankData: {
    bank: string;
  };
  realty: {
    /** Результаты оценки */
    commercialType_index: number;
    commercialSubType_index: number;
  };
  location: {
    /** Сведения об объекте оценки */
    address: string;
    cadastralNumber: string;
    localityStatus_index: number;
    locationWithinLocality_index: number;
    buildingLine_index: number;
    objectAccess_index: number;
  };
  totalSpace: {
    /** Общая площадь */
    spaceTotal: string;
    spaceOffice: string;
    condition: string;
    heat: string;
    floor: string;
    buildingWalls_index: number;
    objectClass_index: number;
    parkingAvailable_index: number;
  };
  leasableSpace: {
    /** Арендопригодная площадь */
    spaceTotal: string;
    spaceOffice: string;
    condition: string;
    heat: string;
    floor: string;
  };
  addition: {
    /** Степень износа для вкладки "дополнительная информация" */
    depreciation: string;
  };
}

export interface ICompanies {
  [CompanyName: string]: number;
}

export interface ITestDataBa {
  // Users: IUsers;
  Companies: ICompanies;
  CommercialReportOneBuildIn: ICommercialReport;
}
