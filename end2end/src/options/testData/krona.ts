import { mathTestDataDistributor } from "modules/math/math.distributor";
import { KronaEnvProdUsersData } from "./krona/testData/krona.testData.users.prod";
import { KronaEnvTestUsersData } from "./krona/testData/krona.testData.users.test";

const deepmerge = require(`deepmerge`);
const today = new Date().toDateString();
const time = new Date().getTime();

//------------------------------------------- Рандомные параметры для запроса стоимости --------------------------------

const storeys = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(25, 1);
const total_space = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 30);
const houseNumber = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 1);

const RANDOM_PARAMS: IRequestFlat = {
  address: `г Москва, Свободы, д ${houseNumber}`,
  houseNumber: houseNumber,
  buildDate: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 1919),
  storeys: storeys,
  floor: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(storeys, 0),
  roomsCount: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
  total_space: total_space,
  living_space: total_space / 1.5,
  kitchen_space: total_space / 5,
  price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(1000000, 4000000),
  wallsType_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
  flatRepairs_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
};

//----------------------------------------------------------------------------------------------------------------------

/** Тестовые Данные для Кроны */
export const TestDataKrona = deepmerge(
  process.env.ENVIRONMENT === "PROD" ? KronaEnvProdUsersData : KronaEnvTestUsersData,
  {
    Expert: {
      finishiedExpertRequests: {
        flat: "247515",
        apartment: 247516,
        newFlat: 247517,
      },
      comparables: {
        price: "10000000",
      },
    },
    /** Запрос на оценку */
    Request: {
      Flat: {
        IDEAL: {
          // стоимость в пределах допуска (10%)
          address: "г Москва, ул Полярная, д 1",
          houseNumber: 1,
          buildDate: 1979,
          storeys: 5,
          floor: 5,
          roomsCount: 1,
          total_space: 30,
          living_space: 17,
          kitchen_space: 5,
          price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            1000000,
            7000000
          ),
          wallsType_index: 1,
          flatRepairs_index: 2,
        },
        GPB_TEST: {
          address: "г Москва, ул Полярная, д 1",
          houseNumber: 1,
          buildDate: 1979,
          storeys: 5,
          floor: 5,
          roomsCount: 1,
          total_space: 30,
          living_space: 17,
          kitchen_space: 5,
          price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            100000,
            100000
          ),
          wallsType_index: 1,
          flatRepairs_index: 2,
        },
        LOWCOST: {
          // заниженная стоимость - автоодобрение
          address: "г Москва, Петровка, д 1",
          buildDate: 1999,
          storeys: 0,
          floor: 0,
          roomsCount: 0,
          total_space: 0,
          living_space: 0,
          kitchen_space: 0,
          price: 1,
          wallsType_index: 2,
          flatRepairs_index: 3,
        },
        HIGHCOST: {
          // завышенная стоимость - проверка эксперта
          address: "г Москва, Проспект мира, д 121",
          houseNumber: 121,
          buildDate: 1999,
          storeys: 9,
          floor: 3,
          roomsCount: 5,
          total_space: 160,
          living_space: 100,
          kitchen_space: 15,
          price: 45000000,
          wallsType_index: 2,
          flatRepairs_index: 4,
        },
        HIGHCOST_ANOTHER: {
          // завышенная стоимость - проверка эксперта
          address: "г Москва, Свободы, д 49",
          houseNumber: 49,
          buildDate: 1999,
          storeys: 9,
          floor: 1,
          roomsCount: 1,
          total_space: 30,
          living_space: 15,
          kitchen_space: 5,
          price: 25000000,
          wallsType_index: 2,
          flatRepairs_index: 4,
        },
        FOR_DISABLED_ANALOG: {
          // для автотеста Байкала baikal.disabledAnalog.ts
          address: "г Москва, ул Свободы д 11",
          houseNumber: 2,
          buildDate: 2000,
          storeys: 15,
          floor: 5,
          roomsCount: 1,
          total_space: 40,
          living_space: 25,
          kitchen_space: 8,
          price: 11000000,
          wallsType_index: 2,
          flatRepairs_index: 4,
          custom1: "test_gpb" + time,
        },
        TEST_RANDOM: {
          address: `г Москва, Свободы, д ${houseNumber}`,
          houseNumber: houseNumber,
          buildDate: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            100,
            1919
          ),
          storeys: storeys,
          floor: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(storeys, 0),
          roomsCount: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
          total_space: total_space,
          living_space: total_space / 1.5,
          kitchen_space: total_space / 5,
          price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            1000000,
            4000000
          ),
          wallsType_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            4,
            1
          ),
          flatRepairs_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            4,
            1
          ),
        },
        FOR_SELHOZ: {
          address: "г Москва, Волоколамское шоссе, д 11",
          houseNumber: 49,
          buildDate: 1999,
          storeys: Math.ceil(Math.random() * 100) + 1,
          floor: 1,
          roomsCount: 1,
          total_space: 30,
          living_space: 15,
          kitchen_space: 5,
          price: 25000000,
          wallsType_index: 2,
          flatRepairs_index: 4,
          customField1: "Test Selhoz" + today,
          propertyAccess: 1,
          valuationPurpose: 1,
          thirdPartyBurdening: 1,
          exposition: 1,
        },
        FOR_GPB: {
          address: "г Москва, ул Свободы д 11",
          houseNumber: 2,
          buildDate: 2000,
          storeys: 15,
          floor: 5,
          roomsCount: 1,
          total_space: 40,
          living_space: 25,
          kitchen_space: 8,
          price: 14000000,
          wallsType_index: 1,
          flatRepairs_index: 4,
          custom1: "test_gpb" + time,
        },
        RANDOM_PARAMS: {
          ...RANDOM_PARAMS,
        },
        RANDOM_PARAMS_FOR_GPB: {
          ...RANDOM_PARAMS,
          custom1: "test_gpb" + time,
        },
      },
      /** Новостройка */
      NewFlat: {
        /** Адрес по документам */
        documentAddress: "г Москва, ул Полярная, д 31",
        address: "г Москва, ул Полярная, д 1",
        housingComplexName: "test.srg-it.ru/9r",
        houseNumber: 2,
        buildQuarter: 3,
        buildYear: 2026,
        storeys: 25,
        wallsType_index: 2,
        floor: 16,
        roomsCount: 2,
        total_space: 55,
        flatRepairs_index: 1,
        price: 7500555,
      },
      Apartment: {
        address: "г Москва, ул Полярная, д 1",
        houseNumber: 1,
        buildDate: 1979,
        storeys: 5,
        floor: 5,
        roomsCount: 1,
        total_space: 30,
        living_space: 17,
        kitchen_space: 5,
        price: 6000000,
        wallsType_index: 1,
        flatRepairs_index: 2,
      },
      NewApartment: {
        /** Адрес по документам */
        documentAddress: "г Москва, ул Полярная, д 31",
        address: "г Москва, ул Полярная, д 1",
        housingComplexName: "test.srg-it.ru/9r",
        houseNumber: 2,
        buildQuarter: 3,
        buildYear: 2026,
        storeys: 25,
        wallsType_index: 2,
        floor: 16,
        roomsCount: 2,
        total_space: 55,
        flatRepairs_index: 1,
        price: 7500555,
      },
      /** Земельный участок */
      Land: {
        address: "Москва, Ярославское шоссе, д. 1",
        landNumber: 1,
        associationName: "СНТ Аина",
        cadastralNumber: "55:66:666666:654",
        landSpace: 1000,
        landCategoryIndex: 1,
        landPurpose: "Тестовое назначение",
        landElectrycityIndex: 0,
        landGasupplyIndex: 1,
        landWaterSupplyIndex: 2,
        landSewerageIndex: 1,
        landPrice: 16587323,
        filePath: "./src/test_files/test.jpg",
      },
      LandAndHouse: {
        address: "Москва, Ярославское шоссе, д. 1",
        houseNumber: 12,
        landNumber: 1,
        associationName: "СНТ Аина",
        houseCadastralNumber: "тра-та-та",
        cadastralNumber: "55:66:666666:654",
        landSpace: 1000,
        landCategoryIndex: 1,
        landPurpose: "Тестовое назначение",
        landElectrycityIndex: 0,
        landGasupplyIndex: 1,
        landWaterSupplyIndex: 2,
        landSewerageIndex: 1,
        houseSpace: 57.9,
        houseBuildDate: 2020,
        houseWallsMaterial: "Кирпичонок",
        houseRepairStateIndex: 2,
        totalPrice: 2500000,
        landPrice: 1658732,
        filePath: "./src/test_files/test.jpg",
      },
    },
    Report: {
      Flat: {
        reportNumber: `autotest_report_FLAT_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_FLAT",
        reportAppraiserName: "AutotestCompany_FLAT",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      Apartment: {
        reportNumber: `autotest_report_APARTMENT_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_APARTMENT",
        reportAppraiserName: "AutotestCompany_APARTMENT",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      NewFlat: {
        reportNumber: `autotest_report_NEW_FLAT_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_NEW_FLAT",
        reportAppraiserName: "AutotestCompany_NEW_FLAT",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      NewApartment: {
        reportNumber: `autotest_report_NEW_APARTMENT_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_NEW_APARTMENT",
        reportAppraiserName: "AutotestCompany_NEW_APARTMENT",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      Land: {
        reportNumber: `autotest_report_LAND_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_LAND",
        reportAppraiserName: "AutotestCompany_LAND",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      LandAndHouse: {
        reportNumber: `autotest_report_LAND_AND_HOUSE_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_LAND_AND_HOUSE",
        reportAppraiserName: "AutotestCompany_LAND_AND_HOUSE",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      Townhouse: {
        reportNumber: `autotest_report_TOWNHOUSE_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_TOWNHOUSE",
        reportAppraiserName: "AutotestCompany_TOWNHOUSE",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
      LandAndTownhouse: {
        reportNumber: `autotest_report_LAND_AND_TOWNHOUSE_${today}`,
        reportCustomerFullName: "autotest_reportCustomer_LAND_AND_TOWNHOUSE",
        reportAppraiserName: "AutotestCompany_LAND_AND_TOWNHOUSE",
        reportAppraiserInn: "5902300019",
        reportFilePath: "./src/test_files/test.docx",
      },
    },
    /** Автомобили */
    Vehicle: {
      /** Вин номер */
      VIN: `autotest_vin_${new Date().toDateString()}`,
      /** Производитель */
      Vendor: "Porsche",
      /** Дата выпуска: Месяц */
      releaseMonth: "01",
      /** Дата выпуска: Год  */
      releaseYear: "2015",
      /** Модель */
      Model: "Panamera",
      /** КПП */
      Transmission: "Автоматическая",
      /** Модификация */
      Modification: 1,
      /** Мощность двигателя */
      EnginePower: "300",
      /** Пробег */
      Mileage: "163254",
      /** Владельцы */
      OwnersCount: "ONE",
      /** Аварии */
      Accident: "NO",
      /** Состояние шин */
      TireState: "GOOD",
      /** Состояние автомобиля */
      ReductionFactor: "GOOD",
      /** Цена */
      Price: "3000000",
      // -----------------------------------------------------------------------
      // Поля для отчётов (Только для БЗО)
      // -----------------------------------------------------------------------
      Reason: "FOR_COURT", // причина оценки - "для суда"
      Burdening: "1", // Обременения
      OwnerType: "PHYSICAL_PERSON", // Владелец
      CreditAgreement: "vehicle_auto_test_nilov", // input
      MortgageContract: "vehicle_auto_test_nilov", // input
      BankBranch: "00000", // select by value
      InspectInt: "IMPOSSIBLE", // select by value
      InspectExt: "IMPOSSIBLE", // select by value
      CaseDefects: "INSPECTION_IMPOSSIBLE", // select by value
      SingleVisit: "2", // select by id
      EngineStart: "IMPOSSIBLE", // Запуск двигателя
      /** Диагностика "Без диагностики" */
      Diagnostic: "WITHOUT_DIAGNOSTIC",
      /** Оценщик - Зарница */
      Appraiser: { vtb: "19859", openbank: "1540" },
    },
    /** Аккредитация */
    Accreditation: {
      name: `SmokeTestAccred_${new Date().toDateString()}`,
      inn: "5902300019",
      kpp: "1",
      baCompanyId: "1500001776196",
      startDate: "01.01.2019",
    },
    rbRequest: {
      office: "https://test.srg-it.ru/9r/rbRequest/office/1798",
      shop: "https://test.srg-it.ru/9r/rbRequest/shop/1782",
      storage: "https://test.srg-it.ru/9r/rbRequest/storage/1803",
      ground: "https://test.srg-it.ru/9r/rbRequest/ground/1799",
      building: "https://test.srg-it.ru/9r/rbRequest/building/1819",
    },
    DpaOrder: {
      ValuableObjectDescription: "test val object description",
      CadastralNumber: `77:55:${mathTestDataDistributor.RANDOM.getRandomNumberBetween(
        1000000,
        9999999
      )}:${mathTestDataDistributor.RANDOM.getRandomNumberBetween(10000, 99999)}`,
      ObjectAddress: "г Москва, ул Полярная, д 10",
      InspectionContactFIO: "autotest Nilov",
      InspectionContactPhone: "autotest Nilov Phone",
      InspectioncontactEmail: "autotest Nilov Email",
      Appraiser: "19859",
    },
    FederalAppraiser: {
      testOrderCardNew: "/fa/order/3828",
      testOrderCardOld: "/fa/order/16522",
      testPublicOrderCard: "/fa/public/order/4361",
    },
  }
);
export interface IRequestFlat {
  address: string;
  houseNumber: number;
  buildDate: number;
  storeys: number;
  floor: number;
  roomsCount: number;
  total_space: number;
  living_space: number;
  kitchen_space: number;
  price: number;
  /** Индекс параметра из ЕНАМа с материалом стен
   *
   * @see KronaRequestsWallsType
   */
  wallsType_index: number;
  /** Индекс параметра из ЕНАМа с состояниями отделки
   *
   * @see KronaRequestsQualifiedRepairsState
   */
  flatRepairs_index: number;
  custom1?: string;
}
export interface IRequestNewFlat {
  documentAddress: string;
  address: string;
  houseNumber: number;
  housingComplexName: string;
  /** Индекс параметра из ЕНАМа с кварталами
   *
   * @see KronaBuildingQarter
   */
  buildQuarter: number;
  buildYear: number;
  storeys: number;
  /** Индекс параметра из ЕНАМа с материалом стен
   *
   * @see KronaRequestsWallsType
   */
  wallsType_index: number;
  floor: number;
  roomsCount: number;
  total_space: number;
  /** Индекс параметра из ЕНАМа с состояниями отделки
   *
   * @see KronaRequestsQualifiedRepairsState
   */
  flatRepairs_index: number;
  price: number;
}
export interface IRequestApartment {
  address: string;
  houseNumber: number;
  buildDate: number;
  storeys: number;
  floor: number;
  roomsCount: number;
  total_space: number;
  living_space: number;
  kitchen_space: number;
  price: number;
  /** Индекс параметра из ЕНАМа с материалом стен
   *
   * @see KronaRequestsWallsType
   */
  wallsType_index: number;
  /** Индекс параметра из ЕНАМа с состояниями отделки
   *
   * @see KronaRequestsQualifiedRepairsState
   */
  flatRepairs_index: number;
  custom1?: string;
}
export interface IRequestNewApartment {
  documentAddress: string;
  address: string;
  houseNumber: number;
  housingComplexName: string;
  /** Индекс параметра из ЕНАМа с кварталами
   *
   * @see KronaBuildingQarter
   */
  buildQuarter: number;
  buildYear: number;
  storeys: number;
  /** Индекс параметра из ЕНАМа с материалом стен
   *
   * @see KronaRequestsWallsType
   */
  wallsType_index: number;
  floor: number;
  roomsCount: number;
  total_space: number;
  /** Индекс параметра из ЕНАМа с состояниями отделки
   *
   * @see KronaRequestsQualifiedRepairsState
   */
  flatRepairs_index: number;
  price: number;
}
export interface IRequestLand {
  address: string;
  landNumber: number;
  associationName: string;
  cadastralNumber: string;
  landSpace: number;
  /** Индекс параметра из ЕНАМа с Категориями земельного участка
   *
   * @see KronaRequestLandCategory
   */
  landCategoryIndex: number;
  landPurpose: string;

  landElectrycityIndex: number;
  landGasupplyIndex: number;
  landWaterSupplyIndex: number;
  landSewerageIndex: number;
  landPrice: number;
  filePath: string;
}
export interface IRequestLandAndHouse {
  address: string;
  houseNumber: number;
  landNumber: number;
  associationName: string;
  cadastralNumber: string;
  landSpace: number;
  /** Индекс параметра из ЕНАМа с Категориями земельного участка
   *
   * @see KronaRequestLandCategory
   */
  landCategoryIndex: number;
  landPurpose: string;
  landElectrycityIndex: number;
  landGasupplyIndex: number;
  landWaterSupplyIndex: number;
  landSewerageIndex: number;
  houseCadastralNumber: string;
  houseSpace: number;
  houseBuildDate: number;
  houseWallsMaterial: string;
  /** Индекс параметра из ЕНАМа с состояниями отделки
   *
   * @see KronaRequestsQualifiedRepairsState
   */
  houseRepairStateIndex: number;
  totalPrice: number;
  landPrice: number;
  filePath: string;
}

export interface IReportData {
  reportNumber: string;
  reportCustomerFullName: string;
  reportAppraiserName: string;
  reportAppraiserInn: string;
  reportFilePath: string;
}
