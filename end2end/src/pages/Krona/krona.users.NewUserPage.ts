export type KronaUserPermission =
  | "CAN_ADD_REPORT"
  | "CAN_EXPORT_REPORT"
  | "CAN_VIEW_REPORTS"
  | "CAN_VIEW_OTHER_REPORTS"
  | "CAN_VIEW_WHOLE_VTB_IM"
  | "CAN_ADD_VALUATION_REQUEST"
  | "CAN_EXPORT_VALUATION_REQUEST"
  | "CAN_VIEW_VALUATION_REQUESTS"
  | "CAN_VIEW_OTHER_VALUATION_REQUESTS"
  | "CAN_VIEW_INTERNAL_STATE_OF_VALUATION_REQUEST"
  | "CAN_CREATE_NEW_BUILDINGS_REQUEST"
  | "CAN_CREATE_COTTAGES_REQUEST"
  | "CAN_CORRECT_INCOMING_REPORT"
  | "CAN_MAKE_EXPERT_VALUATION"
  | "CAN_APPROVE_EXPERT_VALUATION"
  | "CAN_RETURN_EXPERT_REQUEST"
  | "CAN_ASSIGN_EXPERT"
  | "CAN_VIEW_ADDRESS_LIST"
  | "CAN_VIEW_NOT_PUBLIC_REQUEST_STATUS"
  | "SRG_DEV"
  | "CAN_CHANGE_USER"
  | "CAN_EDIT_OTHER_COMPANIES"
  | "CAN_ACCESS_OTHER_COMPANY"
  | "CAN_ADD_DIAGNOSTIC_CENTER"
  | "TELEPHONIST_BASIC_ACCESS"
  | "TELEPHONIST_FULL_ACCESS"
  | "BAIKAL_COMMERCIAL_ACCESS"
  | "BAIKAL_COMMERCIAL_CALCULATOR_ACCESS"
  | "BAIKAL_COMMERCIAL_CUSTOM_DB_ACCESS"
  | "BAIKAL_RESIDENTIAL_ACCESS"
  | "BAIKAL_RESIDENTIAL_CALCULATOR_ACCESS"
  | "BAIKAL_RESIDENTIAL_CUSTOM_DB_ACCESS"
  | "AIJK_BANK_ALL_REGIONS_ACCESS"
  | "AIJK_BANK_REGIONAL_ACCESS"
  | "AIJK_BANK_IM_ACCESS"
  | "AIJK_BANK_BASIC_ACCESS"
  | "AIJK_CAN_REASSIGN_ORDER"
  | "AIJK_SRG_ACCESS"
  | "CAN_ADD_VALUATION_ORDER"
  | "CAN_ADD_VALUATION_ORDER_CAR"
  | "CAN_EXPORT_VALUATION_ORDER"
  | "CAN_EXT_EXPORT_VALUATION_ORDER"
  | "CAN_VIEW_OTHER_VALUATION_ORDERS"
  | "CAN_SEND_VALUATION_ORDER_CAR_WO_INSPECTION"
  | "CAN_ACCESS_COMMERCIAL"
  | "ACCREDITATION_CAN_ADD"
  | "ACCREDITATION_CAN_VIEW"
  | "CAN_ACCESS_TEST_APPRAISER";

class KronaNewUserPage {
  get $selector_userCompany() {
    return browser.$("#company");
  }
  get $input_userLastname() {
    return browser.$("#lastName");
  }
  get $input_userFirstname() {
    return browser.$("#firstName");
  }
  get $input_userDepartment() {
    return browser.$("#department");
  }
  get $input_userEmail() {
    return browser.$("#email");
  }
  get $input_userName() {
    return browser.$("#userName");
  }
  get $input_userPassword() {
    return browser.$("#password");
  }
  get $input_vtbImName() {
    return browser.$("#vtbImName");
  }
  get $button_userCreate() {
    return browser.$("#btnSend");
  }
  permissionCheckbox(permission: KronaUserPermission) {
    return browser.$(`#${permission}`);
  }
}

/** Страница создания нового пользователя */
export const kronaNewUserPage = new KronaNewUserPage();
