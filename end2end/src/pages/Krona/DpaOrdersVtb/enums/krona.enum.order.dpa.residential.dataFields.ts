export enum KronaOrderDpaResidentialDataFields {
  /** Номер заказа */
  ORDER_NUMBER = "$info_orderNumber",
  /** Работа с проблемной задолженностью */
  DPA_WORK = "$selector_dpaWork",
  /** Предполагаемое использование */
  INTENDED_USE = "$selector_intendedUse",
  /** Тип объекта */
  OBJECT_TYPE = "$selector_objectType",
  /** Описание объекта оценки */
  VALUABLE_OBJECT_DESCRIPTION = "$input_valuableObjectDescription",
  /** Кадастровый номер */
  CADASTRAL_NUMBER = "$input_cadastralNumber",
  /** Адрес Объекта */
  OBJECT_ADDRESS = "$input_objectAddress",
  /** Субъект РФ */
  ADDRESS_SUBJECT = "$info_addressSubject",
  /** Внешний осмотр */
  EXTERNAL_INSPECTION = "$selector_externalInspection",
  /** Внутренний осмотр */
  INTERNAL_INSPECTION = "$selector_internalInspection",
  /** Причины отсутствия осмотра */
  INSPECTION_ABSENSE_REASON = "$input_inspectionAbsenceReason",
  /** Допщуние о состоянии отделки */
  FLAT_REPAIRS = "$selector_flatRepairs",
  /** Адрес доставки */
  DELIVERY_ADDRESS = "$input_deliveryAddress",
  /** Контакты для осмотра */
  INSPECTION_CONTACTS = "$selector_inspectionContacts",
  /** Наименование организации */
  INSPECTION_CONTACT_COMPANY = "$input_inspectionContactCompany",
  /** ФИО контактного лица */
  INSPECTION_CONTACT_FIO = "$input_inspectionContactFIO",
  /** Контактный Имейл */
  INSPECTION_CONTACT_EMAIL = "$input_inspectionContactEmail",
  /** Контактный телефондля осмотра */
  INSPECTION_CONTACT_PHONE = "$input_inspectionContactPhone",
  /** Оценщик */
  APPRAISER = "$selector_appraiser",
  /** Комментарий */
  COMMENT = "$input_comment",
}

export let KronaOrderDpaResidentialDataFields_selectors =
  new Set<KronaOrderDpaResidentialDataFields>([
    KronaOrderDpaResidentialDataFields.DPA_WORK,
    KronaOrderDpaResidentialDataFields.OBJECT_TYPE,
    KronaOrderDpaResidentialDataFields.INTENDED_USE,
    KronaOrderDpaResidentialDataFields.EXTERNAL_INSPECTION,
    KronaOrderDpaResidentialDataFields.INTERNAL_INSPECTION,
    KronaOrderDpaResidentialDataFields.FLAT_REPAIRS,
    KronaOrderDpaResidentialDataFields.INSPECTION_CONTACTS,
    KronaOrderDpaResidentialDataFields.APPRAISER,
  ]);
export let KronaOrderDpaResidentialDataFields_inputs = new Set<KronaOrderDpaResidentialDataFields>([
  KronaOrderDpaResidentialDataFields.ORDER_NUMBER,
  KronaOrderDpaResidentialDataFields.VALUABLE_OBJECT_DESCRIPTION,
  KronaOrderDpaResidentialDataFields.CADASTRAL_NUMBER,
  KronaOrderDpaResidentialDataFields.OBJECT_ADDRESS,
  KronaOrderDpaResidentialDataFields.ADDRESS_SUBJECT,
  KronaOrderDpaResidentialDataFields.INSPECTION_ABSENSE_REASON,
  KronaOrderDpaResidentialDataFields.DELIVERY_ADDRESS,
  KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_COMPANY,
  KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_EMAIL,
  KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_PHONE,
  KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_FIO,
  KronaOrderDpaResidentialDataFields.COMMENT,
]);
