import deepmerge = require("deepmerge");
import { mathTestDataDistributor } from "modules/math/math.distributor";
import { FaEnvTestUsersData } from "./fa/testData/fa.testData.users.test";

/** Тестовые данные для Экспресс Оценки */
export const TestDataFa = deepmerge(
  process.env.ENVIRONMENT === "PROD" ? FaEnvTestUsersData : FaEnvTestUsersData,
  {
    sgb: {
      city: "г Москва",
      street: "пр-кт Вернадского, д 2",
      flat: "5",
    },
    CustomerFIO: {
           name: "ТутИмяЗаказчика",
           lastname: "ТутФамилияЗаказчика",
           patronymic: "ТутОтчествоЗаказчика",
         },
      
         BorrowerFIO: {
           name: "ТутИмяЗаемщика",
           lastname: "ТутИмяЗаемщика",
            patronymic: "ТутИмяЗаемщика",
          },
      
    romashka: {
      Online: {
        UFA: {
          region: "Респ Башкортостан, г Уфа",
          street: "Октября 1",
          flat: "12",
          floor: "1",
          bankManager: "Кус",
          buySellPrice: "350000",
        },
        MOSCOW: {
          region: "г Москва",
          street_house: "ул Нерис Саломеи, д 4 к 2",
          flat: "99",
        },

        OMSK: {
          region: "Омская обл, г Омск",
          street: `Омская ${mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
            10,
            1
          )}`,
          flat: "11",
          floor: "2",
          bankManager: "Кус",
          buySellPrice: "6500000",
        },
      },
      Offline: {},
    },
  }
);
