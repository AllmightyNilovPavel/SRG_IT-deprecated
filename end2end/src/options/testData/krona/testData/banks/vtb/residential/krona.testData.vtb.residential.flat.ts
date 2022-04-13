import { toNumber } from "lodash";
import { mathTestDataDistributor } from "modules/math/math.distributor";

const storeys = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(25, 1);
const houseNumber = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 1);
const totalSpaceForExpensive = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
  100,
  30
);
const totalSpaceForAverage = mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
  50,
  30
);

export const KronaTestDataVtbResidentialFlat = {
  Request: {
    Flat: {
      AVERAGE: {
        address: `г Москва, Свободы, д 29`,
        houseNumber: 29,
        buildDate: 1987,
        storeys: 17,
        floor: 13,
        roomsCount: 2,
        total_space: 60.7,
        living_space: 36.5,
        kitchen_space: 11,
        price: 15000000,
        wallsType_index: 3,
        flatRepairs_index: 4,
      },
      AVERAGE_RANDOM: {
        address: `г Москва, Свободы, д ${houseNumber}`,
        houseNumber: houseNumber,
        buildDate: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 1919),
        storeys: storeys,
        floor: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(storeys, 0),
        roomsCount: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(2, 1),
        total_space: totalSpaceForAverage,
        living_space: totalSpaceForAverage / 1.5,
        kitchen_space: totalSpaceForAverage / 5,
        price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
          1000000,
          15000000
        ),
        wallsType_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
        flatRepairs_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
          4,
          1
        ),
      },
      VERY_EXPENSIVE_BUT_LOWER_PRICE: {
        address: `г Москва, Проспект Мира, д 13 стр 1`,
        addressWithFlatNumber:
          `г Москва, Проспект Мира, д 13 стр 1, кв. ` +
          mathTestDataDistributor.RANDOM.getRandomNumberBetween(1, 99),
        houseNumber: 13,
        buildDate: 1963,
        storeys: 13,
        floor: 3,
        roomsCount: 4,
        total_space: 117.77,
        living_space: 74.25,
        kitchen_space: 22.44,
        price: "29000000",
        wallsType_index: 1,
        flatRepairs_index: 2,
      },
      VERY_EXPENSIVE: {
        address: `г Москва, Проспект Мира, д 13 стр 1`,
        houseNumber: 13,
        buildDate: 1963,
        storeys: 13,
        floor: 3,
        roomsCount: 4,
        total_space: 117.77,
        living_space: 74.25,
        kitchen_space: 22.44,
        price: "41000000",
        wallsType_index: 1,
        flatRepairs_index: 2,
      },
      VERY_EXPENSIVE_RANDOM: {
        address: `г Москва, Проспект Мира, д ${houseNumber}`,
        houseNumber: houseNumber,
        buildDate: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(100, 1919),
        storeys: storeys,
        floor: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(storeys, 0),
        roomsCount: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
        total_space: totalSpaceForExpensive,
        living_space: totalSpaceForExpensive / 1.5,
        kitchen_space: totalSpaceForExpensive / 5,
        price: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
          1000000,
          40000000
        ),
        wallsType_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(4, 1),
        flatRepairs_index: mathTestDataDistributor.RANDOM.getMinIntFromRandomWithMinStartingNum(
          4,
          1
        ),
      },
    },
  },
};
