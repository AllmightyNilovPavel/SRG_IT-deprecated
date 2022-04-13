export interface IRequestDataSelhoz {
  FLAT: {
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
    wallsType_index: number;
    flatRepairs_index: number;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  NEW_FLAT: {
    documentAddress: string;
    address: string;
    housingComplexName: string;
    houseNumber: number;
    buildQuarter: number;
    buildYear: number;
    storeys: number;
    wallsType_index: number;
    floor: number;
    roomsCount: number;
    total_space: number;
    flatRepairs_index: number;
    price: number;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  APARTMENT: {
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
    wallsType_index: number;
    flatRepairs_index: number;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  NEW_APARTMENT: {
    documentAddress: string;
    address: string;
    housingComplexName: string;
    houseNumber: number;
    buildQuarter: number;
    buildYear: number;
    storeys: number;
    wallsType_index: number;
    floor: number;
    roomsCount: number;
    total_space: number;
    flatRepairs_index: number;
    price: number;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  TOWNHOUSE: {
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
    wallsType_index: number;
    flatRepairs_index: number;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  LAND: {
    address: string;
    landNumber: number;
    associationName: string;
    cadastralNumber: string;
    landSpace: number;
    landCategoryIndex: number;
    landPurpose: string;
    landElectrycityIndex: number;
    landWaterSupplyIndex: number;
    landGasSupplyIndex: number;
    landSewerageIndex: number;
    landPrice: number;
    filePath: string;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  LAND_AND_HOUSE: {
    address: string;
    houseNumber: number;
    landNumber: number;
    associationName: string;
    houseCadastralNumber: string;
    cadastralNumber: string;
    landSpace: number;
    /** Индекс параметра из ЕНАМа с Категориями земельного участка
     *
     * @see KronaRequestLandCategory
     */
    landCategoryIndex: number;
    landPurpose: string;
    landElectrycityIndex: number;
    landGasSupplyIndex: number;
    landWaterSupplyIndex: number;
    landSewerageIndex: number;
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
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
  LAND_AND_TOWNHOUSE: {
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
    landGasSupplyIndex: number;
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
    houseSewerageIndex: number;
    houseWaterSupplyIndex: number;
    houseHeatingIndex: number;
    houseElectrycityIndex: number;
    totalPrice: number;
    landPrice: number;
    filePath: string;
    // Уникальные поля для банка
    customFieldData: string;
    /**  */
    propertyAccess: number;
    valuationPurpose: number;
    thirdPartyBurdening: number;
    exposition: number;
  };
}
