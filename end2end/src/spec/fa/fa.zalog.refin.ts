import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import {
  FA_RoomsType,
  FA_CreditAmount,
  FA_repairState,
  FA_specialOfferDialogButtons,
  FA_ownershipType,
  FA_OrderChannel,
  InspectionTimeBlock,
  FaOrderPaymentType,
} from "pages/fa/enum";

import { zalogOcenka, zalogOrder, zalogUserCabinet, zalogOrderRefinance } from "../../pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. ВТБ. Новый заказ. Рефин. Без спецпредложения.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    zalogOcenka.open();
    zalogOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    expect(zalogOcenka.$button_newOrder.isClickable()).to.be.true;
  });
  it(`Ввод логина`, function () {
    allureReporter.generateReport();
    zalogOcenka.$button_userCabinet.click();
    zalogOcenka.$input_login.waitForClickable();
    zalogOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    zalogOcenka.$button_send.click();
    zalogOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    zalogOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    zalogOcenka.$button_send.click();
    zalogUserCabinet.waitForLoad();
  });
  it(`Выбор типа Заказа и типа Кредитования`, function () {
    allureReporter.generateReport();
    zalogUserCabinet.$button_newOrder.waitForClickable();
    zalogUserCabinet.$button_newOrder.click();
    // zalogUserCabinet.$newOrder_chooseRefinance.waitForClickable();
    // zalogUserCabinet.$newOrder_chooseRefinance.click();
    zalogUserCabinet.$newOrder_chooseIndividual.waitForClickable();
    zalogUserCabinet.$newOrder_chooseIndividual.click();

    zalogOrder.$button_refinance.waitForClickable();
    zalogOrder.$button_refinance.click();
    /* zalogOrder.waitForLoad();
    zalogOrder.$button_individualCredit.click({button: 0, x: 0, y: 0});
    // Проверка предварительного выбора опций в разделах:
    // 1 - `Цель Оценки`
    // 2 - `Тип объекта для оценки`
    expect(zalogOrder.$button_refinance.isSelected()).to.be.true;
    expect(zalogOrder.$button_apartment.isSelected()).to.be.true;
    // Проверка на выбор "Типа Кредитования"
    expect(zalogOrder.$individualCredit_buttonChecker.isSelected()).to.be.true;
    expect(zalogOrder.$button_smallBusiness.isSelected()).to.be.false; */
  });
  it(`Ввод региона, населённого пункта`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    expect(zalogOrder.$input_region.isClickable()).to.be.true;
    zalogOrder.input_region("Москва");
    addressCheck = zalogOrder.$input_region.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод улицы`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    expect(zalogOrder.$input_street.isClickable()).to.be.true;
    zalogOrder.input_street("ул Нерис Саломеи, д 4 к 2");
    addressCheck = zalogOrder.$input_street.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод дома`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    zalogOrder.$input_flatNumber.setValue("99");
    addressCheck = zalogOrder.$input_flatNumber.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Выбор типа комнат`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    expect(zalogOrder.$selector_objectRooms.isClickable()).to.be.true;
    zalogOrder.select_rooms(FA_RoomsType.FREE_PLANING);
    addressCheck = zalogOrder.$selector_objectRooms.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод этажа расположения`, function () {
    allureReporter.generateReport();
    expect(zalogOrder.$input_floor.isClickable()).to.be.true;
    zalogOrder.$input_floor.setValue("1");
  });
  it(`Переход к следующему этапу`, function () {
    allureReporter.generateReport();
    expect(zalogOrder.$button_Order.isClickable()).to.be.true;
    zalogOrder.$button_Order.click();
  });
  it(`Определение ожидаемой суммы`, function () {
    allureReporter.generateReport();
    zalogOrder.$creditAmmountMore_buttonChecker.waitForExist();
    zalogOrder.select_creditAmount(FA_CreditAmount.LESS);
    expect(zalogOrder.$creditAmmountLess_buttonChecker.isSelected()).to.be.true;
  });
  it(`Выбор состояния отделки`, function () {
    allureReporter.generateReport();
    zalogOrder.$objectWithRepairs_buttonChecker.waitForExist();
    zalogOrder.select_repairState(FA_repairState.WITHOUT_REPAIRS);
    expect(zalogOrder.$objectWithoutRepairs_buttonChecker.isSelected()).to.be.true;
  });
  it(`Выбор спецпредложения - ОТКАЗ`, function () {
    allureReporter.generateReport();
    zalogOrder.$button_approveSpecialOffer.waitForClickable();
    zalogOrder.select_specialOffer(FA_specialOfferDialogButtons.DECLINE);
    zalogOrderRefinance.waitForLoad();
  });
  it(`Выбор значения поля "оформлен в собственность"`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$ownership_buttonChecker.waitForExist();
    zalogOrderRefinance.select_ownership(FA_ownershipType.OWNERSHIP);
    expect(zalogOrderRefinance.$ownership_buttonChecker.isSelected()).to.be.true;
  });
  it(`Выбор кредитного инспектора банка`, function () {
    allureReporter.generateReport();
    let managerCheck = "";
    zalogOrderRefinance.$base_bankManagerSelect.waitForClickable();
    expect(zalogOrderRefinance.$base_bankManagerSelect.isClickable()).to.be.true;
    zalogOrderRefinance.input_bankManager("кус");
    managerCheck = zalogOrderRefinance.$text_bankManagerName.getText();
    expect(managerCheck).to.be.not.null;
  });
  it(`Выбор заёмщика`, function () {
    allureReporter.generateReport();
    let borrowerCheck = "";
    zalogOrderRefinance.$borrowerAsCustomer_checkboxChecker.waitForExist();
    zalogOrderRefinance.select_borrower(true);

    borrowerCheck = zalogOrderRefinance.$input_borrowerFirstName.getText();
    expect(borrowerCheck).to.be.not.null;
    borrowerCheck = zalogOrderRefinance.$input_borrowerLastName.getText();
    expect(borrowerCheck).to.be.not.null;
    borrowerCheck = zalogOrderRefinance.$input_borrowerPatronymic.getText();
    expect(borrowerCheck).to.be.not.null;
  });

  it(`Выбор желаемой даты осмотра`, function () {
    allureReporter.generateReport();
    let inspectionDateCheck = "";

    zalogOrderRefinance.select_date();
    inspectionDateCheck = zalogOrderRefinance.$text_currentInspectionDate;
    expect(inspectionDateCheck).to.be.not.null;
  });
  it(`Выбор желаемого времени осмотра`, function () {
    allureReporter.generateReport();
    let inspectionTimeCheck = "";

    zalogOrderRefinance.$selector_inspectionTimeBlock.scrollIntoView();
    zalogOrderRefinance.select_inspectionTime(InspectionTimeBlock.FROM_12_TO_16);
    inspectionTimeCheck = zalogOrderRefinance.$text_inspectionTimeBlock;
    expect(inspectionTimeCheck).to.be.not.null;
  });
  it(`Простановка галочек согласия`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.select_agreeCheckboxes(FA_OrderChannel.DEFAULT);
    expect(zalogOrderRefinance.$agreeWithPersonalDataProcessing_checkboxChecker.isSelected()).to.be
      .true;
    // expect(zalogOrderRefinance.$agreeWithAppraisalTerms_checkboxChecker.isSelected()).to.be.true;
    expect(zalogOrderRefinance.$agreeWithOfferContract_checkboxChecker.isSelected()).to.be.true;
  });
  it(`Сохранение черновика`, function () {
    allureReporter.generateReport();
    let bottomMessageText = "Черновик успешно сохранен";
    let bottomMessageTextChecker = "";

    zalogOrderRefinance.$button_saveDraft.scrollIntoView();
    zalogOrderRefinance.$button_saveDraft.waitForClickable();
    zalogOrderRefinance.$button_saveDraft.click();
    zalogOrderRefinance.$textArea_bottomMessage.waitForDisplayed({});

    bottomMessageTextChecker = zalogOrderRefinance.$text_bottomMessageData.getText();
    expect(bottomMessageTextChecker).to.be.equal(bottomMessageText);
  });
  it(`Переход к след. шагу`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$button_nextOrderPart.scrollIntoView();
    zalogOrderRefinance.$button_nextOrderPart.waitForDisplayed({});
    zalogOrderRefinance.$button_nextOrderPart.click();
    zalogOrderRefinance.$base_docksBlock.waitForDisplayed({});
  });
  it(`Пропуск загрузки документов и переход к последнему шагу`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$base_docksBlock.waitForDisplayed({ timeout: 2000, reverse: false });
    zalogOrderRefinance.$button_nextOrderPart.scrollIntoView();
    zalogOrderRefinance.$button_nextOrderPart.waitForDisplayed({});
    zalogOrderRefinance.$button_nextOrderPart.click();
    // zalogOrderRefinance.$button_payByCard.waitForClickable();
    zalogOrderRefinance.$button_payByInvoice.waitForDisplayed({ timeout: 10000, reverse: false });
  });
  it(`Оплата квитанцией`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$button_payByInvoice.waitForClickable();
    zalogOrderRefinance.$button_payByInvoice.click();
    zalogOrderRefinance.$button_payByCash.waitForClickable();
    zalogOrderRefinance.$button_payByCash.click();

    let modalPaymentConfirm = $(
      `//div[contains(@class,'ui yellow message') and contains(@class,'Order_payment')]/..`
    );
    let modalPaymentConfirmCheckboxAgreement = modalPaymentConfirm.$(
      `//label[contains(@for,'agreeWithValidData')]`
    );
    let modalPaymentConfirmButtonPayment = modalPaymentConfirm.$(`//button[@id='actionPayByCash']`);
    modalPaymentConfirm.waitForDisplayed();
    modalPaymentConfirmCheckboxAgreement.waitForClickable();
    modalPaymentConfirmCheckboxAgreement.click();
    modalPaymentConfirmButtonPayment.waitForEnabled();
    modalPaymentConfirmButtonPayment.click();
    modalPaymentConfirm.waitForDisplayed({ timeout: 10000, reverse: true });
    // zalogOrderRefinance.$button_downloadInvoice.waitForClickable();
    // zalogOrderRefinance.$button_downloadInvoice.click();
    // zalogOrderRefinance.$root_modalOrderPayment.waitForDisplayed({ timeout: 1000, reverse: false });
    // expect(zalogOrderRefinance.$button_actionDownloadInvoice.isEnabled()).to.be.false;
    // zalogOrderRefinance.$checkbox_agreeWithValidData.click();
    // expect(zalogOrderRefinance.$agreeWithValidData_checkboxChecker.isEnabled()).to.be.true;
    // zalogOrderRefinance.$button_actionDownloadInvoice.waitForClickable();
    // zalogOrderRefinance.$button_actionDownloadInvoice.click();
    // zalogOrderRefinance.$root_modalOrderPayment.waitForDisplayed({ timeout: 20000, reverse: true });

    zalogOrderRefinance.waitForPaymentComplete(FaOrderPaymentType.CASH);
    makeScreenshot("ZalogOcenka_РЕФИН_КВИТАНЦИЯ");
  });
});
