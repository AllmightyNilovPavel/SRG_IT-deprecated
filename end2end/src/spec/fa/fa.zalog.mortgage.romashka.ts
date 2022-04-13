import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
import { TestDataPaySystems } from "options/testData/paySystems";

import {
  FA_RoomsType,
  FA_CreditAmount,
  FA_repairState,
  FA_specialOfferDialogButtons,
  FA_ownershipType,
  FA_OrderChannel,
} from "pages/fa/enum";

import {
  zalogOcenka,
  zalogOrder,
  zalogUserCabinet,
  zalogOrderSpecialCredit,
  bestToPay,
} from "../../pages/fa";

describe(`FA. ВТБ. Ипотека. Ромашка. Онлайн`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });

  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    zalogOcenka.open();
    // zalogOcenka.open();
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
    zalogOrder.waitForLoad();
    zalogOrder.$button_credit.click({ button: 0, x: 0, y: 0 });
  });
  it(`Ввод региона, населённого пункта`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    expect(zalogOrder.$input_region.isClickable()).to.be.true;
    zalogOrder.input_region(TestDataFa.romashka.Online.MOSCOW.region);
    addressCheck = zalogOrder.$input_region.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод улицы`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    expect(zalogOrder.$input_street.isClickable()).to.be.true;
    zalogOrder.input_street(TestDataFa.romashka.Online.MOSCOW.street_house);
    addressCheck = zalogOrder.$input_street.getText();
    expect(addressCheck).to.be.not.null;
  });
  it(`Ввод дома`, function () {
    allureReporter.generateReport();
    let addressCheck = "";
    zalogOrder.$input_flatNumber.setValue(TestDataFa.romashka.Online.MOSCOW.flat);
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
    zalogOrder.$input_floor.setValue(TestDataFa.romashka.Online.OMSK.floor);
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
    zalogOrder.$input_contractBuySellPrice.waitForEnabled();
    zalogOrder.$input_contractBuySellPrice.setValue(TestDataFa.romashka.Online.OMSK.buySellPrice);
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
    zalogOrderSpecialCredit.waitForLoad();
  });
  it(`Выбор значения поля "оформлен в собственность"`, function () {
    allureReporter.generateReport();
    console.log(browser.getUrl());
    zalogOrderSpecialCredit.$ownership_buttonChecker.waitForExist();
    zalogOrderSpecialCredit.select_ownership(FA_ownershipType.OWNERSHIP);
    expect(zalogOrderSpecialCredit.$ownership_buttonChecker.isSelected()).to.be.true;
  });
  it(`Выбор кредитного инспектора банка`, function () {
    allureReporter.generateReport();
    let managerCheck = "";
    // expect(zalogOrderSpecialCredit.$base_bankManagerSelect.isClickable()).to.be.true;
    zalogOrderSpecialCredit.input_bankManager(TestDataFa.romashka.Online.OMSK.bankManager);
    managerCheck = zalogOrderSpecialCredit.$text_bankManagerName.getText();
    expect(managerCheck).to.be.not.null;
  });
  it(`Выбор заёмщика`, function () {
    allureReporter.generateReport();
    let borrowerCheck = "";
    zalogOrderSpecialCredit.$borrowerAsCustomer_checkboxChecker.waitForExist();
    zalogOrderSpecialCredit.select_borrower(true);

    borrowerCheck = zalogOrderSpecialCredit.$input_borrowerFirstName.getText();
    expect(borrowerCheck).to.be.not.null;
    borrowerCheck = zalogOrderSpecialCredit.$input_borrowerLastName.getText();
    expect(borrowerCheck).to.be.not.null;
    borrowerCheck = zalogOrderSpecialCredit.$input_borrowerPatronymic.getText();
    expect(borrowerCheck).to.be.not.null;
  });
  it(`Простановка галочек согласия`, function () {
    allureReporter.generateReport();
    zalogOrderSpecialCredit.select_agreeCheckboxes(FA_OrderChannel.SMART);
    expect(zalogOrderSpecialCredit.$agreeWithPersonalDataProcessing_checkboxChecker.isSelected()).to
      .be.true;
    // expect(zalogOrderSpecialCredit.$agreeWithAppraisalTerms_checkboxChecker.isSelected()).to.be.true;
    expect(zalogOrderSpecialCredit.$agreeWithOfferContract_checkboxChecker.isSelected()).to.be.true;
  });
  it(`Сохранение черновика`, function () {
    allureReporter.generateReport();
    let bottomMessageText = "Черновик успешно сохранен";
    let bottomMessageTextChecker = "";

    zalogOrderSpecialCredit.$button_saveDraft.scrollIntoView();
    zalogOrderSpecialCredit.$button_saveDraft.waitForClickable();
    zalogOrderSpecialCredit.$button_saveDraft.click();
    zalogOrderSpecialCredit.$textArea_bottomMessage.waitForDisplayed({});

    bottomMessageTextChecker = zalogOrderSpecialCredit.$text_bottomMessageData.getText();
    expect(bottomMessageTextChecker).to.be.equal(bottomMessageText);
  });
  it(`Переход к след. шагу`, function () {
    allureReporter.generateReport();
    zalogOrderSpecialCredit.$button_nextOrderPart.scrollIntoView();
    zalogOrderSpecialCredit.$button_nextOrderPart.waitForDisplayed({});
    zalogOrderSpecialCredit.$button_nextOrderPart.click();
    zalogOrderSpecialCredit.$base_docksBlock.waitForDisplayed({});
  });
  it(`Пропуск загрузки документов и переход к последнему шагу`, function () {
    allureReporter.generateReport();
    zalogOrderSpecialCredit.$base_docksBlock.waitForDisplayed({ timeout: 2000, reverse: false });
    zalogOrderSpecialCredit.$checkbox_noDocuments.click({ button: 0, x: 0, y: 0 });
    zalogOrderSpecialCredit.$text_orderDocumentsMessage.waitForDisplayed({});
    console.log(zalogOrderSpecialCredit.$text_orderDocumentsMessage.$(`p`).getText());

    zalogOrderSpecialCredit.$button_nextOrderPart.scrollIntoView();
    zalogOrderSpecialCredit.$button_nextOrderPart.waitForDisplayed({});
    zalogOrderSpecialCredit.$button_nextOrderPart.click();
    // zalogOrderSpecialCredit.$button_downloadInvoice.waitForDisplayed({timeout: 1000, reverse: false});
  });
  it(`Оплата Картой`, function () {
    allureReporter.generateReport();
    zalogOrderSpecialCredit.payByCard();
    bestToPay.waitForLoad();
    bestToPay.fillPaymentData_new(TestDataPaySystems.best2payRoman);
    bestToPay.returnToOrder();
  });
  it(`Возврат в заказ.`, function () {
    allureReporter.generateReport();
    let textCheck = ["Ваш заказ оплачен!", "Спасибо, Ваш заказ отправлен!"];
    zalogOrderSpecialCredit.$text_successMessage.waitForDisplayed({
      timeout: 1000,
      reverse: false,
    });
    expect(
      zalogOrderSpecialCredit.$text_successMessage.getText(),
      "Текст успешной операции не соответствуте шаблону."
    ).to.be.oneOf(textCheck);
    console.log(browser.getUrl());
  });
});
