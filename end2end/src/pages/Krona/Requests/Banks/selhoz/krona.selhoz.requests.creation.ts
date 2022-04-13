import { IRequestDataSelhoz } from "options/testData/krona/interfaces";
import {
  KronaBuildingQarter,
  KronaRequestHouseCommunications,
  KronaRequestLandCategory,
  KronaRequestLandCommunications,
  KronaRequestsQualifiedRepairsState,
  KronaRequestsWallsType,
  RealtyType,
  ValuationResultData,
} from "pages/Krona/Enums";
import { KronaRequestsSelhozExposition } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.exposition";
import { KronaRequestsSelhozProperttyAccess } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.propertyAccess";
import { KronaRequestsSelhozThirdPartyBurdening } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.thirdPartyBurdening";
import { KronaRequestsSelhozValuationPurpose } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.valuationPurpose";
import { KronaSelhozRequestsBase } from "./krona.selhoz.requests.base";

class KronaSelhozRequestsCreation extends KronaSelhozRequestsBase {
  /**
   * Метод для полного заполнения запросов на оценку для банка Россельхоз
   * по департаменту ДРПА (@see https://srgroup.atlassian.net/browse/WEB-29744)
   * по всем типам недвиги. Достаточно подготовить тестовые данные
   * и указать тип недвиги по которому надо сделать запрос
   * @param requestType  - тип недвижимости
   * @param data - тестовые данные
   *
   */
  fullfillSelhozRequest(requestType: RealtyType, data: IRequestDataSelhoz) {
    // Весь закоментированный код в этом блоке нужно раскомментировать
    // когда при создании заказа по ТОМУ типу надвиги где он есть
    // добавят поля для СЕЛЬХОЗ ДРПА
    let valuationResultRealtyType: RealtyType;

    switch (requestType) {
      case RealtyType.FLAT:
        valuationResultRealtyType = RealtyType.FLAT;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.FLAT.address);
        this.inputHouseNumber(data.FLAT.houseNumber);
        this.inputBuildYear(data.FLAT.buildDate);
        this.inputStoreys(data.FLAT.storeys);
        this.selectWallsType(Object.values(KronaRequestsWallsType)[data.FLAT.wallsType_index]);
        this.inputFloor(data.FLAT.floor);
        this.inputRoomsCount(data.FLAT.roomsCount);
        this.inputTotalSpace(data.FLAT.total_space);
        this.inputLivingSpace(data.FLAT.living_space);
        this.inputKitchenSpace(data.FLAT.kitchen_space);
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[data.FLAT.flatRepairs_index]
        );
        this.inputPrice(data.FLAT.price);
        this.inputCustomField(data.FLAT.customFieldData, 1);
        this.selectPropertyAccess(
          Object.values(KronaRequestsSelhozProperttyAccess)[data.FLAT.propertyAccess]
        );
        this.selectThirdPartyBurdening(
          Object.values(KronaRequestsSelhozThirdPartyBurdening)[data.FLAT.thirdPartyBurdening]
        );
        this.selectValuationPurpose(
          Object.values(KronaRequestsSelhozValuationPurpose)[data.FLAT.valuationPurpose]
        );
        this.selectexposition(Object.values(KronaRequestsSelhozExposition)[data.FLAT.exposition]);
        break;
      case RealtyType.NEW_FLAT:
        valuationResultRealtyType = RealtyType.NEW_FLAT;
        this.select_realtyType(valuationResultRealtyType);
        this.inputDocumentAddress(data.NEW_FLAT.documentAddress);
        this.InputAddress(data.NEW_FLAT.address);
        this.inputHouseNumber(data.NEW_FLAT.houseNumber);
        this.inputBuildYear(data.NEW_FLAT.buildYear);
        this.selectBuildQuarter(Object.values(KronaBuildingQarter)[data.NEW_FLAT.buildQuarter]);
        this.inputStoreys(data.NEW_FLAT.storeys);
        this.selectWallsType(Object.values(KronaRequestsWallsType)[data.NEW_FLAT.wallsType_index]);
        this.inputFloor(data.NEW_FLAT.floor);
        this.inputRoomsCount(data.NEW_FLAT.roomsCount);
        this.inputTotalSpace(data.NEW_FLAT.total_space);
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[data.NEW_FLAT.flatRepairs_index]
        );
        this.inputPrice(data.NEW_FLAT.price);
        this.inputCustomField(data.NEW_FLAT.customFieldData, 1);
        this.selectPropertyAccess(
          Object.values(KronaRequestsSelhozProperttyAccess)[data.NEW_FLAT.propertyAccess]
        );
        this.selectThirdPartyBurdening(
          Object.values(KronaRequestsSelhozThirdPartyBurdening)[data.NEW_FLAT.thirdPartyBurdening]
        );
        this.selectValuationPurpose(
          Object.values(KronaRequestsSelhozValuationPurpose)[data.NEW_FLAT.valuationPurpose]
        );
        this.selectexposition(
          Object.values(KronaRequestsSelhozExposition)[data.NEW_FLAT.exposition]
        );
        break;
      case RealtyType.APARTMENT:
        valuationResultRealtyType = RealtyType.APARTMENT;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.APARTMENT.address);
        this.inputHouseNumber(data.APARTMENT.houseNumber);
        this.inputBuildYear(data.APARTMENT.buildDate);
        this.inputStoreys(data.APARTMENT.storeys);
        this.selectWallsType(Object.values(KronaRequestsWallsType)[data.APARTMENT.wallsType_index]);
        this.inputFloor(data.APARTMENT.floor);
        this.inputRoomsCount(data.APARTMENT.roomsCount);
        this.inputTotalSpace(data.APARTMENT.total_space);
        this.inputLivingSpace(data.APARTMENT.living_space);
        this.inputKitchenSpace(data.APARTMENT.kitchen_space);
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[data.APARTMENT.flatRepairs_index]
        );
        this.inputPrice(data.APARTMENT.price);
        this.inputCustomField(data.APARTMENT.customFieldData, 1);
        // this.selectPropertyAccess(
        //   Object.values(KronaRequestsSelhozProperttyAccess)[data.APARTMENT.propertyAccess]
        // );
        // this.selectThirdPartyBurdening(
        //   Object.values(KronaRequestsSelhozThirdPartyBurdening)[data.APARTMENT.thirdPartyBurdening]
        // );
        // this.selectValuationPurpose(
        //   Object.values(KronaRequestsSelhozValuationPurpose)[data.APARTMENT.valuationPurpose]
        // );
        // this.selectexposition(
        //   Object.values(KronaRequestsSelhozExposition)[data.APARTMENT.exposition]
        // );
        break;
      case RealtyType.NEW_APARTMENT:
        valuationResultRealtyType = RealtyType.NEW_APARTMENT;
        this.select_realtyType(valuationResultRealtyType);
        this.inputDocumentAddress(data.NEW_APARTMENT.documentAddress);
        this.InputAddress(data.NEW_APARTMENT.address);
        this.inputHouseNumber(data.NEW_APARTMENT.houseNumber);
        this.inputHousingComplexName(data.NEW_APARTMENT.housingComplexName);
        this.selectBuildQuarter(
          Object.values(KronaBuildingQarter)[data.NEW_APARTMENT.buildQuarter]
        );
        this.inputBuildYear(data.NEW_APARTMENT.buildYear);
        this.inputStoreys(data.NEW_APARTMENT.storeys);
        this.selectWallsType(
          Object.values(KronaRequestsWallsType)[data.NEW_APARTMENT.wallsType_index]
        );
        this.inputFloor(data.NEW_APARTMENT.floor);
        this.inputRoomsCount(data.NEW_APARTMENT.roomsCount);
        this.inputTotalSpace(data.NEW_APARTMENT.total_space);
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[data.NEW_APARTMENT.flatRepairs_index]
        );
        this.inputPrice(data.NEW_APARTMENT.price);
        this.inputCustomField(data.NEW_APARTMENT.customFieldData, 1);
        // this.selectPropertyAccess(
        //   Object.values(KronaRequestsSelhozProperttyAccess)[data.NEW_APARTMENT.propertyAccess]
        // );
        // this.selectThirdPartyBurdening(
        //   Object.values(KronaRequestsSelhozThirdPartyBurdening)[
        //     data.NEW_APARTMENT.thirdPartyBurdening
        //   ]
        // );
        // this.selectValuationPurpose(
        //   Object.values(KronaRequestsSelhozValuationPurpose)[data.NEW_APARTMENT.valuationPurpose]
        // );
        // this.selectexposition(
        //   Object.values(KronaRequestsSelhozExposition)[data.NEW_APARTMENT.exposition]
        // );
        break;
      case RealtyType.LAND:
        valuationResultRealtyType = RealtyType.LAND;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.LAND.address);
        this.inputLandNumber(data.LAND.landNumber);
        this.inputAssociationName(data.LAND.associationName);
        this.inputCadastralNumber(data.LAND.cadastralNumber);
        this.inputLandSpace(data.LAND.landSpace);
        this.selectLandCategory(
          Object.values(KronaRequestLandCategory)[data.LAND.landCategoryIndex]
        );
        this.inputLandPurpose(data.LAND.landPurpose);
        this.selectLandElectricity(
          Object.values(KronaRequestLandCommunications)[data.LAND.landElectrycityIndex]
        );
        this.selectLandGasSupply(
          Object.values(KronaRequestLandCommunications)[data.LAND.landGasSupplyIndex]
        );
        this.selectLandWaterSupply(
          Object.values(KronaRequestLandCommunications)[data.LAND.landWaterSupplyIndex]
        );
        this.selectLandSewerage(
          Object.values(KronaRequestLandCommunications)[data.LAND.landSewerageIndex]
        );
        this.inputLandPrice(data.LAND.landPrice);
        this.inputFile(data.LAND_AND_HOUSE.filePath);
        this.inputCustomField(data.LAND.customFieldData, 1);
        // this.selectPropertyAccess(
        //   Object.values(KronaRequestsSelhozProperttyAccess)[data.LAND.propertyAccess]
        // );
        // this.selectThirdPartyBurdening(
        //   Object.values(KronaRequestsSelhozThirdPartyBurdening)[data.LAND.thirdPartyBurdening]
        // );
        this.selectValuationPurpose(
          Object.values(KronaRequestsSelhozValuationPurpose)[data.LAND.valuationPurpose]
        );
        this.selectexposition(Object.values(KronaRequestsSelhozExposition)[data.LAND.exposition]);
        break;
      case RealtyType.LAND_AND_HOUSE:
        valuationResultRealtyType = RealtyType.LAND_AND_HOUSE;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.LAND_AND_HOUSE.address);
        this.inputHouseNumber(data.LAND_AND_HOUSE.houseNumber);
        this.inputLandNumber(data.LAND_AND_HOUSE.landNumber);
        this.inputAssociationName(data.LAND_AND_HOUSE.associationName);
        this.inputCadastralNumber(data.LAND_AND_HOUSE.cadastralNumber);
        this.inputLandSpace(data.LAND_AND_HOUSE.landSpace);
        this.selectLandCategory(
          Object.values(KronaRequestLandCategory)[data.LAND_AND_HOUSE.landCategoryIndex]
        );
        this.inputLandPurpose(data.LAND_AND_HOUSE.landPurpose);
        this.selectLandElectricity(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_HOUSE.landElectrycityIndex]
        );
        this.selectLandGasSupply(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_HOUSE.landGasSupplyIndex]
        );
        this.selectLandWaterSupply(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_HOUSE.landWaterSupplyIndex]
        );
        this.selectLandSewerage(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_HOUSE.landSewerageIndex]
        );
        this.inputHouseCadastralNumber(data.LAND_AND_HOUSE.houseCadastralNumber);
        this.inputHouseSpace(data.LAND_AND_HOUSE.houseSpace);
        this.inputHouseBuildDate(data.LAND_AND_HOUSE.houseBuildDate);
        this.inputHouseWalls(data.LAND_AND_HOUSE.houseWallsMaterial);
        this.selectHouseElectricity(
          Object.values(KronaRequestHouseCommunications)[
            data.LAND_AND_TOWNHOUSE.houseElectrycityIndex
          ]
        );
        this.selectHouseHeating(
          Object.values(KronaRequestHouseCommunications)[data.LAND_AND_TOWNHOUSE.houseHeatingIndex]
        );
        this.selectHouseSewerage(
          Object.values(KronaRequestHouseCommunications)[data.LAND_AND_TOWNHOUSE.houseSewerageIndex]
        );
        this.selectHouseWaterSupply(
          Object.values(KronaRequestHouseCommunications)[
            data.LAND_AND_TOWNHOUSE.houseWaterSupplyIndex
          ]
        );
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[
            data.LAND_AND_HOUSE.houseRepairStateIndex
          ]
        );
        // this.selectHouseRepairState(
        //   Object.values(KronaRequestsQualifiedRepairsState)[
        //     data.LAND_AND_HOUSE.houseRepairStateIndex
        //   ]
        // );
        this.inputTotalPrice(data.LAND_AND_HOUSE.totalPrice);
        this.inputLandPrice(data.LAND_AND_HOUSE.landPrice);
        this.inputFile(data.LAND_AND_HOUSE.filePath);
        this.inputCustomField(data.LAND_AND_HOUSE.customFieldData, 1);
        this.selectPropertyAccess(
          Object.values(KronaRequestsSelhozProperttyAccess)[data.LAND_AND_HOUSE.propertyAccess]
        );
        this.selectThirdPartyBurdening(
          Object.values(KronaRequestsSelhozThirdPartyBurdening)[
            data.LAND_AND_HOUSE.thirdPartyBurdening
          ]
        );
        this.selectValuationPurpose(
          Object.values(KronaRequestsSelhozValuationPurpose)[data.LAND_AND_HOUSE.valuationPurpose]
        );
        this.selectexposition(
          Object.values(KronaRequestsSelhozExposition)[data.LAND_AND_HOUSE.exposition]
        );
        break;
      case RealtyType.LAND_AND_TOWNHOUSE:
        valuationResultRealtyType = RealtyType.LAND_AND_TOWNHOUSE;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.LAND_AND_TOWNHOUSE.address);
        this.inputHouseNumber(data.LAND_AND_TOWNHOUSE.houseNumber);
        this.inputLandNumber(data.LAND_AND_TOWNHOUSE.landNumber);
        this.inputAssociationName(data.LAND_AND_TOWNHOUSE.associationName);
        this.inputCadastralNumber(data.LAND_AND_TOWNHOUSE.cadastralNumber);
        this.inputLandSpace(data.LAND_AND_TOWNHOUSE.landSpace);
        this.selectLandCategory(
          Object.values(KronaRequestLandCategory)[data.LAND_AND_TOWNHOUSE.landCategoryIndex]
        );
        this.inputLandPurpose(data.LAND_AND_TOWNHOUSE.landPurpose);
        this.selectLandElectricity(
          Object.values(KronaRequestLandCommunications)[
            data.LAND_AND_TOWNHOUSE.landElectrycityIndex
          ]
        );
        this.selectLandGasSupply(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_TOWNHOUSE.landGasSupplyIndex]
        );
        this.selectLandWaterSupply(
          Object.values(KronaRequestLandCommunications)[
            data.LAND_AND_TOWNHOUSE.landWaterSupplyIndex
          ]
        );
        this.selectLandSewerage(
          Object.values(KronaRequestLandCommunications)[data.LAND_AND_TOWNHOUSE.landSewerageIndex]
        );
        this.inputHouseCadastralNumber(data.LAND_AND_TOWNHOUSE.houseCadastralNumber);
        this.inputHouseSpace(data.LAND_AND_TOWNHOUSE.houseSpace);
        this.inputHouseBuildDate(data.LAND_AND_TOWNHOUSE.houseBuildDate);
        this.inputHouseWalls(data.LAND_AND_TOWNHOUSE.houseWallsMaterial);
        this.selectHouseElectricity(
          Object.values(KronaRequestHouseCommunications)[
            data.LAND_AND_TOWNHOUSE.houseElectrycityIndex
          ]
        );
        this.selectHouseHeating(
          Object.values(KronaRequestHouseCommunications)[data.LAND_AND_TOWNHOUSE.houseHeatingIndex]
        );
        this.selectHouseSewerage(
          Object.values(KronaRequestHouseCommunications)[data.LAND_AND_TOWNHOUSE.houseSewerageIndex]
        );
        this.selectHouseWaterSupply(
          Object.values(KronaRequestHouseCommunications)[
            data.LAND_AND_TOWNHOUSE.houseWaterSupplyIndex
          ]
        );
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[
            data.LAND_AND_TOWNHOUSE.houseRepairStateIndex
          ]
        );
        // this.selectHouseRepairState(
        //   Object.values(KronaRequestsQualifiedRepairsState)[
        //     data.LAND_AND_TOWNHOUSE.houseRepairStateIndex
        //   ]
        // );
        this.inputTotalPrice(data.LAND_AND_TOWNHOUSE.totalPrice);
        // this.inputHousePrice(data.totalPrice - data.landPrice);
        this.inputLandPrice(data.LAND_AND_TOWNHOUSE.landPrice);
        this.inputFile(data.LAND_AND_TOWNHOUSE.filePath);
        this.inputCustomField(data.LAND_AND_TOWNHOUSE.customFieldData, 1);
        this.selectPropertyAccess(
          Object.values(KronaRequestsSelhozProperttyAccess)[data.LAND_AND_TOWNHOUSE.propertyAccess]
        );
        this.selectThirdPartyBurdening(
          Object.values(KronaRequestsSelhozThirdPartyBurdening)[
            data.LAND_AND_TOWNHOUSE.thirdPartyBurdening
          ]
        );
        this.selectValuationPurpose(
          Object.values(KronaRequestsSelhozValuationPurpose)[
            data.LAND_AND_TOWNHOUSE.valuationPurpose
          ]
        );
        this.selectexposition(
          Object.values(KronaRequestsSelhozExposition)[data.LAND_AND_TOWNHOUSE.exposition]
        );
        break;
      case RealtyType.TOWNHOUSE:
        valuationResultRealtyType = RealtyType.TOWNHOUSE;
        this.select_realtyType(valuationResultRealtyType);
        this.InputAddress(data.TOWNHOUSE.address);
        this.inputHouseNumber(data.TOWNHOUSE.houseNumber);
        this.inputBuildYear(data.TOWNHOUSE.buildDate);
        this.inputStoreys(data.TOWNHOUSE.storeys);
        this.selectWallsType(Object.values(KronaRequestsWallsType)[data.TOWNHOUSE.wallsType_index]);
        this.inputFloor(data.TOWNHOUSE.floor);
        this.inputRoomsCount(data.TOWNHOUSE.roomsCount);
        this.inputTotalSpace(data.TOWNHOUSE.total_space);
        this.inputLivingSpace(data.TOWNHOUSE.living_space);
        this.inputKitchenSpace(data.TOWNHOUSE.kitchen_space);
        this.selectRepairState(
          Object.values(KronaRequestsQualifiedRepairsState)[data.TOWNHOUSE.flatRepairs_index]
        );
        this.inputPrice(data.TOWNHOUSE.price);
        this.inputCustomField(data.TOWNHOUSE.customFieldData, 1);
        // this.selectPropertyAccess(
        //   Object.values(KronaRequestsSelhozProperttyAccess)[data.TOWNHOUSE.propertyAccess]
        // );
        // this.selectThirdPartyBurdening(
        //   Object.values(KronaRequestsSelhozThirdPartyBurdening)[data.TOWNHOUSE.thirdPartyBurdening]
        // );
        // this.selectValuationPurpose(
        //   Object.values(KronaRequestsSelhozValuationPurpose)[data.TOWNHOUSE.valuationPurpose]
        // );
        // this.selectexposition(
        //   Object.values(KronaRequestsSelhozExposition)[data.TOWNHOUSE.exposition]
        // );
        break;
      default:
        throw new Error("Ошибка при заполнении запроса на оценку");
    }
  }
}

/** Класс с описанием функции(-ий) заполнения и отправки запросов на оценку для банка Россельхоз */
export const kronaSelhozRequestsCreation = new KronaSelhozRequestsCreation();
