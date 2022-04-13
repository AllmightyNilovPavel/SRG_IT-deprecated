import {
  BaikalEnumPresenceFurniture,
  BaikalEnumRepairs,
  BaikalEnumWallMaterial,
} from "../../pages/baikal/enums";

import { mathRandom } from "modules/math/math.random";

//----------------------------------------------------- Интерфейсы ----------------------------------------------------

/** Интерфейс по всем тестовым данным Байкала */
interface ITestDataBaikal {
  /** Пользователи */
  Users: IUsers;
  /** Жилая недвижимость */
  Residential: IResidential;
  /** Коммерческая недвижимость */
  Commercial: {
    oneBuildIn: IOneBuildIn;
  };
}

export interface IUsers {
  login: {
    srg: {
      autotest_baikal_without_statistic: string;
      autotest_baikal_senior_analyst: string;
      autotest_baikal_junior_analyst: string;
      autotest_baikal_invalid_auth: string;
    };
  };
  password: {
    srg: {
      autotest_baikal_without_statistic: string;
      autotest_baikal_senior_analyst: string;
      autotest_baikal_junior_analyst: string;
      autotest_baikal_invalid_auth: string;
    };
  };
}

export interface IResidential {
  address: {
    address_without_houseNumber: string;
    only_moscow: string;
  };
  commentary: {
    default_commentary: string;
  };
  filter: {
    price: {
      moscow: {
        price_from: string;
        price_to: string;
      };
    };
    pricePerMeter: {
      moscow: {
        price_from: string;
        price_to: string;
      };
    };
    builtYear: {
      moscow: {
        built_from: string;
        built_to: string;
      };
    };
    storeys: {
      moscow: {
        storeys_from: string;
        storeys_to: string;
      };
    };
    totalSpace: {
      moscow: {
        space_from: string;
        space_to: string;
      };
    };
    kitchenSpace: {
      moscow: {
        space_from: string;
        space_to: string;
      };
    };
  };
  comparable_fill: {
    default_comparable: IBaikalFillComparableProps;
    default_comparable_for_disabled_test: IBaikalFillComparableProps;
    disabled_analog: IBaikalFillComparableProps;
    all_fields: IBaikalFillComparableProps;
  };
}

export interface IOneBuildIn {
  offerDate: string;
  pricePerMeter: string;
  price: string;
  location: {
    address: string;
  };
  physical: {
    total: string;
    floorDetails: string;
    heatedStorageSpace: string;
  };
}

export interface IBaikalFillComparableProps {
  AdSource?: string;
  OfferPrice?: string;
  reselect_address: boolean;
  BidAdjustment?: string;
  WallMaterial?: BaikalEnumWallMaterial;
  HouseBuiltYear?: string;
  Storeys?: string;
  Floor?: string;
  Rooms?: string;
  Repairs?: BaikalEnumRepairs;
  SquareIncludingSummer?: string;
  SquareExcludingSummer?: string;
  LivingSquare?: string;
  KitchenSquare?: string;
  Furniture?: BaikalEnumPresenceFurniture;
  disable_analog: boolean;
}

const default_comparable: IBaikalFillComparableProps = {
  OfferPrice: "10000000",
  reselect_address: true,
  WallMaterial: BaikalEnumWallMaterial.PANEL,
  HouseBuiltYear: "2000",
  Storeys: "15",
  Floor: "2",
  Rooms: "1",
  Repairs: BaikalEnumRepairs.EXCELLENT,
  SquareIncludingSummer: "40",
  SquareExcludingSummer: "40",
  LivingSquare: "25",
  KitchenSquare: "8",
  Furniture: BaikalEnumPresenceFurniture.FURNITURE,
  disable_analog: false,
};

//----------------------------------------------- Тестовые данные Байкала ----------------------------------------------

/** Тестовые Данные для Байкала */
let today = new Date().toLocaleDateString();
export const TestDataBaikal: ITestDataBaikal = {
  /** Пользователи */
  Users: {
    login: {
      srg: {
        autotest_baikal_without_statistic: "autotest_baikal_without_statistic",
        autotest_baikal_senior_analyst: "autotest_baikal_senior_analyst",
        autotest_baikal_junior_analyst: "autotest_baikal_junior_analyst",
        autotest_baikal_invalid_auth: "autotest_baikal_invalid_auth",
      },
    },
    password: {
      srg: {
        autotest_baikal_without_statistic: "Qq123456~!",
        autotest_baikal_senior_analyst: "Qq123456~!",
        autotest_baikal_junior_analyst: "Qq123456~!",
        autotest_baikal_invalid_auth: "autotest_baikal_invalid_auth",
      },
    },
  },
  /** Жилая недвижимость */
  Residential: {
    address: {
      address_without_houseNumber: "г Москва ул Свободы",
      only_moscow: "г Москва",
    },
    commentary: {
      default_commentary: "Рандомный комментарий 123 ZXC ╝!",
    },
    filter: {
      price: {
        moscow: {
          price_from: mathRandom.getRandomNumberBetween(45000000, 50000000).toString(),
          price_to: mathRandom.getRandomNumberBetween(50000000, 55000000).toString(),
        },
      },
      pricePerMeter: {
        moscow: {
          price_from: mathRandom.getRandomNumberBetween(200000, 210000).toString(),
          price_to: mathRandom.getRandomNumberBetween(210000, 220000).toString(),
        },
      },
      builtYear: {
        moscow: {
          built_from: mathRandom.getRandomNumberBetween(1950, 1980).toString(),
          built_to: mathRandom.getRandomNumberBetween(1980, 2020).toString(),
        },
      },
      storeys: {
        moscow: {
          storeys_from: mathRandom.getRandomNumberBetween(5, 7).toString(),
          storeys_to: mathRandom.getRandomNumberBetween(15, 20).toString(),
        },
      },
      totalSpace: {
        moscow: {
          space_from: mathRandom.getRandomNumberBetween(35, 45).toString(),
          space_to: mathRandom.getRandomNumberBetween(55, 60).toString(),
        },
      },
      kitchenSpace: {
        moscow: {
          space_from: mathRandom.getRandomNumberBetween(7, 10).toString(),
          space_to: mathRandom.getRandomNumberBetween(10, 15).toString(),
        },
      },
    },
    comparable_fill: {
      default_comparable: default_comparable,
      default_comparable_for_disabled_test: {
        ...default_comparable,
        OfferPrice: "10800000",
      },
      disabled_analog: {
        ...default_comparable,
        OfferPrice: "15800000",
        BidAdjustment: "-26",
        disable_analog: true,
      },
      all_fields: {
        ...default_comparable,
        AdSource: "https://www.google.com/",
      },
    },
  },
  Commercial: {
    oneBuildIn: {
      offerDate: today,
      pricePerMeter: "100",
      price: "100",
      location: {
        address: "г Москва, ул Фридриха Энгельса",
      },
      physical: {
        total: "100",
        floorDetails: "100",
        heatedStorageSpace: "100",
      },
    },
  },
};
