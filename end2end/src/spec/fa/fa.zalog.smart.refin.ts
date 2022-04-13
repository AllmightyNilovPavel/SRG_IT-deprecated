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
} from "pages/fa/enum";
import { payKeeper, paySuccess } from "pages/fa/paymentSystems/payKeeper/index";

import {
  zalogOcenka,
  zalogOrder,
  zalogUserCabinet,
  zalogOrderRefinance,
  bestToPay,
} from "../../pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
import { TestDataPaySystems } from "../../options/testData/paySystems";

describe(`ЗАЛОГ-ОЦЕНКА. Новый заказ. SMART. Рефинансирование.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
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
    zalogOcenka.$input_login.setValue(TestDataFa.Users.login.roman);
    zalogOcenka.$button_send.click();
    zalogOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    zalogOcenka.$input_password.setValue(TestDataFa.Users.password.roman);
    zalogOcenka.$button_send.click();
    zalogUserCabinet.waitForLoad();
  });
  it(`Выбор типа Заказа и типа Кредитования`, function () {
    allureReporter.generateReport();
    zalogUserCabinet.$button_newOrder.waitForClickable();
    zalogUserCabinet.$button_newOrder.click();
    zalogUserCabinet.$newOrder_chooseIndividual.waitForClickable();
    zalogUserCabinet.$newOrder_chooseIndividual.click();
    // zalogUserCabinet.$newOrder_chooseRefinance.waitForClickable();
    // zalogUserCabinet.$newOrder_chooseRefinance.click();
    zalogOrder.waitForLoad();
    // zalogOrder.$button_individualCredit.click({ button: 0, x: 0, y: 0 });
    zalogOrder.$button_refinance.waitForClickable();
    zalogOrder.$button_refinance.click();

    // Проверка предварительного выбора опций в разделах:
    // 1 - `Цель Оценки`
    // 2 - `Тип объекта для оценки`
    expect(zalogOrder.$refinance_buttonChecker.isSelected()).to.be.true;
    expect(zalogOrder.$button_apartment.isSelected()).to.be.true;
    // Проверка на выбор "Типа Кредитования"
    // expect(zalogOrder.$credit_buttonChecker.isSelected()).to.be.false;
    // expect(zalogOrder.$button_smallBusiness.isSelected()).to.be.false;
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
    zalogOrder.input_street("Полярная 3");
    addressCheck = zalogOrder.$input_street.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод дома`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    zalogOrder.$input_flatNumber.setValue("1");
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
  it(`Выбор спецпредложения - СОГЛАСИЕ`, function () {
    allureReporter.generateReport();
    zalogOrder.$button_approveSpecialOffer.waitForClickable();
    zalogOrder.select_specialOffer(FA_specialOfferDialogButtons.ACCEPT);
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
  it(`Простановка галочек согласия`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.select_agreeCheckboxes(FA_OrderChannel.SMART);
    expect(zalogOrderRefinance.$agreeWithPersonalDataProcessing_checkboxChecker.isSelected()).to.be
      .true;
    expect(zalogOrderRefinance.$agreeWithAppraisalTerms_checkboxChecker.isSelected()).to.be.true;
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
  it(`Отказ от загрузки документов и переход к последнему шагу`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$checkbox_noDocuments.waitForDisplayed({});
    zalogOrderRefinance.$checkbox_noDocuments.click({ button: 0, x: 0, y: 0 });
    zalogOrderRefinance.$button_nextOrderPart.scrollIntoView();
    zalogOrderRefinance.$button_nextOrderPart.waitForDisplayed({});
    zalogOrderRefinance.$button_nextOrderPart.click();
    zalogOrderRefinance.$button_payByCard.waitForDisplayed({ timeout: 1000, reverse: false });
  });
  it(`Оплата`, function () {
    allureReporter.generateReport();
    zalogOrderRefinance.$button_payByCard.waitForClickable();
    zalogOrderRefinance.$button_payByCard.click();
    // zalogOrderRefinance.$root_modalOrderPayment.waitForDisplayed({ timeout: 1000, reverse: false });
    // expect(zalogOrderRefinance.$button_actionPayByCard.isEnabled()).to.be.false;
    zalogOrderRefinance.$button_send_PayByCard.click();
    zalogOrderRefinance.$checkbox_agreeWithValidData.click();
    expect(zalogOrderRefinance.$agreeWithValidData_checkboxChecker.isEnabled()).to.be.true;
    zalogOrderRefinance.$button_actionPayByCard.waitForClickable();
    expect(zalogOrderRefinance.$button_actionPayByCard.isEnabled()).to.be.true;
    zalogOrderRefinance.$button_actionPayByCard.click();
  });
  it(`Подтверждение оплаты на тестовом сайте payKeeper`, function () {
    allureReporter.generateReport();
    bestToPay.waitForLoad();
    bestToPay.fillPaymentData_new(TestDataPaySystems.best2payRoman);
    bestToPay.returnToOrder();
  });
});
