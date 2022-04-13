import { debugLogging, makeScreenshot } from "modules";
import * as path from "path";
import { TestFilesEnum } from "test_files/enum.testFiles";
import {
  KronaEnumOrderDpaResidentialInspectionContacts,
  KronaOrderDpaResidentialDocumentType,
  KronaOrderDpaResidentialDpaWork,
  KronaOrderDpaResidentialInspection,
  KronaOrderDpaResidentialIntendedUse,
  KronaOrderDpaResidentialObjectType,
} from "../enums";
import { KronaOrderDpaResidentialNewOrder } from "../krona.order.dpa.residential.newOrder";

export class KronaOrderDpaResidentialSetters extends KronaOrderDpaResidentialNewOrder {
  selectDpaWork(DpaWork: KronaOrderDpaResidentialDpaWork) {
    this.$selector_dpaWork.scrollIntoView();
    this.$selector_dpaWork.waitForClickable();
    this.$selector_dpaWork.selectByAttribute("value", DpaWork);
    browser.waitUntil(() => this.$selector_dpaWork.getValue() === DpaWork);
  }
  selectIntendedUse(intendedUse: KronaOrderDpaResidentialIntendedUse) {
    this.$selector_intendedUse.scrollIntoView();
    this.$selector_intendedUse.waitForClickable();
    this.$selector_intendedUse.selectByAttribute("value", intendedUse);
    browser.waitUntil(() => this.$selector_intendedUse.getValue() === intendedUse);
  }
  selectObjectType(objectType: KronaOrderDpaResidentialObjectType) {
    this.$selector_objectType.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_objectType.selectByAttribute("value", objectType);
    browser.waitUntil(() => this.$selector_objectType.getValue() === objectType);
  }
  selectExternalInspection(externalInspection: KronaOrderDpaResidentialInspection) {
    this.$selector_externalInspection.scrollIntoView();
    this.$selector_externalInspection.waitForClickable();
    this.$selector_externalInspection.selectByAttribute("value", externalInspection);
    browser.waitUntil(() => this.$selector_externalInspection.getValue() === externalInspection);
  }
  selectInternalInspection(internalInspection: KronaOrderDpaResidentialInspection) {
    this.$selector_internalInspection.scrollIntoView();
    this.$selector_internalInspection.waitForClickable();
    this.$selector_internalInspection.selectByAttribute("value", internalInspection);
    browser.waitUntil(() => this.$selector_internalInspection.getValue() === internalInspection);
  }
  /**
   * Функция выбора оценщика
   * айдишник зарницы для ВТБ = 444
   *
   * @param appraiser - айдишник оценщика по аккредитации
   */
  selectAppraiser(appraiser: string) {
    this.$selector_appraiser.scrollIntoView();
    this.$selector_appraiser.waitForClickable();
    this.$selector_appraiser.selectByAttribute("value", appraiser);
    browser.waitUntil(() => this.$selector_appraiser.getValue() === appraiser);
  }
  selectInspectionContacts(inspectionContacts: KronaEnumOrderDpaResidentialInspectionContacts) {
    this.$selector_inspectionContacts.scrollIntoView();
    this.$selector_inspectionContacts.waitForClickable();
    this.$selector_inspectionContacts.selectByAttribute("value", inspectionContacts);
    browser.waitUntil(() => this.$selector_inspectionContacts.getValue() === inspectionContacts);
  }

  inputCadastralNumber(cadastralNumber: string) {
    this.$input_cadastralNumber.scrollIntoView();
    this.$input_cadastralNumber.waitForDisplayed({});
    this.$input_cadastralNumber.setValue(cadastralNumber);
    browser.waitUntil(() => this.$input_cadastralNumber.getValue() === cadastralNumber);
  }
  inputComment(comment: string) {
    this.$input_comment.scrollIntoView();
    this.$input_comment.waitForDisplayed({});
    this.$input_comment.setValue(comment);
    browser.waitUntil(() => this.$input_comment.getValue() === comment);
  }
  inputDeliveryAddress(deliveryAddress: string) {
    this.$input_deliveryAddress.scrollIntoView();
    this.$input_deliveryAddress.waitForDisplayed({});
    this.$input_deliveryAddress.setValue(deliveryAddress);
    browser.waitUntil(() => this.$input_deliveryAddress.getValue() === deliveryAddress);
  }
  inputInspectionAbsenceReason(inspectionAbsenceReason: string) {
    this.$input_inspectionAbsenceReason.scrollIntoView();
    this.$input_inspectionAbsenceReason.waitForDisplayed({});
    this.$input_inspectionAbsenceReason.setValue(inspectionAbsenceReason);
    browser.waitUntil(
      () => this.$input_inspectionAbsenceReason.getValue() === inspectionAbsenceReason
    );
  }
  inputInspectionContactCompany(inspectionContactCompany: string) {
    this.$input_inspectionContactCompany.scrollIntoView();
    this.$input_inspectionContactCompany.waitForDisplayed({});
    this.$input_inspectionContactCompany.setValue(inspectionContactCompany);
    browser.waitUntil(
      () => this.$input_inspectionContactCompany.getValue() === inspectionContactCompany
    );
  }
  inputInspectionContactFIO(inspectionContactFio: string) {
    this.$input_inspectionContactFIO.scrollIntoView();
    this.$input_inspectionContactFIO.waitForDisplayed({});
    this.$input_inspectionContactFIO.setValue(inspectionContactFio);
    browser.waitUntil(() => this.$input_inspectionContactFIO.getValue() === inspectionContactFio);
  }
  inputInspectionContactPhone(inspectionContactPhone: string) {
    this.$input_inspectionContactPhone.scrollIntoView();
    this.$input_inspectionContactPhone.waitForDisplayed({});
    this.$input_inspectionContactPhone.setValue(inspectionContactPhone);
    browser.waitUntil(
      () => this.$input_inspectionContactPhone.getValue() === inspectionContactPhone
    );
  }
  inputInspectioncontactEmail(inspectioncontactEmail) {
    this.$input_inspectionContactEmail.scrollIntoView();
    this.$input_inspectionContactEmail.waitForDisplayed({});
    this.$input_inspectionContactEmail.setValue(inspectioncontactEmail);
    browser.waitUntil(
      () => this.$input_inspectionContactEmail.getValue() === inspectioncontactEmail
    );
  }
  /**
   * Функция заполнения адреса Объекта Оценки
   *
   * @param objectAddress
   * адрес для использования `г Москва, ул Полярная, д 10`
   */
  inputObjectAddress(objectAddress: string) {
    debugLogging(`Адрес переданный в метод заполнения: ${objectAddress}`);
    makeScreenshot("1");
    let target: WebdriverIO.Element = this.$input_objectAddress;
    target.scrollIntoView();
    target.waitForDisplayed({});
    target.click();
    browser.keys("End");
    browser.keys(["Shift", "Home"]);
    // browser.keys(["Control",'a'])
    browser.keys("Delete");
    makeScreenshot("2");
    target.clearValue();
    target.setValue(objectAddress);
    makeScreenshot("3");

    // browser.pause(3000);

    this.$dropdownAddressSuggest.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `Окно выбора адреса из подсказки - не отрисовалось или пустое.`,
    });
    this.$dropdownAddressSuggest.click();
    browser.waitUntil(() => this.$input_objectAddress.getValue() != null);
  }

  inputValuableObjectDescription(valuableObjectDescription: string) {
    this.$input_valuableObjectDescription.scrollIntoView();
    this.$input_valuableObjectDescription.waitForDisplayed({});
    this.$input_valuableObjectDescription.setValue(valuableObjectDescription);

    browser.waitUntil(
      () => this.$input_valuableObjectDescription.getValue() === valuableObjectDescription
    );
  }
  /**
   * Функция загрузки файла
   *
   * @param file - ссылка на файл в этом репозиториии
   * @param documentType - название документа который необходимо приложить
   */
  uploadFile(file: TestFilesEnum, documentType: KronaOrderDpaResidentialDocumentType) {
    let filePath = path.join(__dirname, "../../../..", file);
    debugLogging("Путь к файлу = ", filePath);

    let documentUploadField = $(`div.uploader-template-multi[field-name="${documentType}"]`);
    let fileInput = documentUploadField.$(`input[title='file input']`);
    let thumbnail = documentUploadField.$(`li.qq-upload-success`);

    fileInput.setValue(filePath);
    thumbnail.waitForDisplayed({ timeout: 30000 });
  }
  /**
   * Метод полного заполнения заказа по ДРВ
   * @param dpaWork
   * @param intendedUse
   * @param valObjDesc
   * @param cadastralNumber
   * @param objAddress
   * @param internalInspection
   * @param externalInspection
   * @param inspectionContacts
   * @param inspectionContactsFio
   * @param inspectionContactsPhone
   * @param inspectionContactsEmail
   * @param fileAssesment
   * @param fileTechnical
   * @param appraiser
   */
  // TODO: написать интерфейс нормальный на вход
  orderCompleteFill(
    dpaWork: KronaOrderDpaResidentialDpaWork,
    intendedUse: KronaOrderDpaResidentialIntendedUse,
    valObjDesc: string,
    cadastralNumber: string,
    objAddress: string,
    internalInspection: KronaOrderDpaResidentialInspection,
    externalInspection: KronaOrderDpaResidentialInspection,
    inspectionContacts: KronaEnumOrderDpaResidentialInspectionContacts,
    inspectionContactsFio: string,
    inspectionContactsPhone: string,
    inspectionContactsEmail: string,
    fileAssesment: TestFilesEnum,
    fileTechnical: TestFilesEnum,
    appraiser: string
  ) {
    this.inputObjectAddress(objAddress);
    this.selectDpaWork(dpaWork);
    this.selectIntendedUse(intendedUse);
    this.inputValuableObjectDescription(valObjDesc);
    this.inputCadastralNumber(cadastralNumber);
    this.selectInternalInspection(internalInspection);
    this.selectExternalInspection(externalInspection);
    this.selectInspectionContacts(inspectionContacts);
    this.inputInspectionContactFIO(inspectionContactsFio);
    this.inputInspectionContactPhone(inspectionContactsPhone);
    this.inputInspectioncontactEmail(inspectionContactsEmail);
    this.uploadFile(fileAssesment, KronaOrderDpaResidentialDocumentType.ASSESMENT);
    this.uploadFile(fileTechnical, KronaOrderDpaResidentialDocumentType.OWNERSHIP);
    this.selectAppraiser(appraiser);
  }
}
