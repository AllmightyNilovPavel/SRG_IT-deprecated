import { BaResidentialBuildingOuterWallsMaterial } from "pages/ba/classic";

export interface IResidentialReportVtb {
  AssesmentTask: {
    AppraisalContract: {
      reportNumber: string;
      reportDate: string;
      appraisalServicePrice: number;
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
      outerWallsMaterial: BaResidentialBuildingOuterWallsMaterial;
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
