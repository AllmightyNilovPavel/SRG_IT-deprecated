import { B2P } from "options/testData/paySystems";
class BestToPay {
  path = "https://test.best2pay.net/webapi";

  private get $root() {
    return $(`#screen`);
  }
  private get $header() {
    return $(`#header`);
  }

  private get $input_cardNum() {
    return this.$root.$(`input#cardFrom`);
  }
  private get $xPath_cardNum() {
    return $(`//*[@id="cardFrom"]/..`);
  }
  private get $input_cardDate() {
    return this.$root.$(`input#cardDate`);
  }
  private get $xPath_cardDate() {
    return $(`//*[@id="cardDate"]/..`);
  }
  private get $tootip_cardDate() {
    return this.$root.$(`span#card-date-tooltip`);
  }
  private get $input_cardholder() {
    return this.$root.$(`input#cardholder-name`);
  }
  private get $xPath_cardholder() {
    return $(`//*[@id="cardholder-name"]/..`);
  }
  private get $input_cardCvc() {
    return this.$root.$(`input#cvc`);
  }
  private get $xPath_cardCvc() {
    return $(`//*[@id="cvc"]/..`);
  }
  private get $input_email() {
    return this.$root.$(`input#emailFrom`);
  }
  private get $button_submit() {
    return this.$root.$(`#submitButton`);
  }

  waitForLoad(url?) {
    browser.waitUntil(() => browser.getUrl().match(url ? url : this.path) !== null);
    this.$root.waitForExist();
  }
  returnToOrder() {
    browser.waitUntil(() => browser.getUrl().match("payByCard=success") !== null);
  }

  fillPaymentData(paymentData: B2P) {
    this.$header.click();
    browser.keys("TAB");
    browser.pause(100);
    this.$input_cardNum.setValue(paymentData.cardNum);
    browser.pause(100);
    browser.keys("TAB");
    browser.pause(100);
    browser.keys("TAB");
    browser.pause(100);
    this.$input_cardDate.setValue(paymentData.cardDate);
    browser.pause(100);
    browser.keys("TAB");
    browser.pause(100);
    this.$input_cardholder.setValue(paymentData.cardholderName);
    browser.pause(200);

    browser.keys("TAB");
    browser.pause(100);
    browser.keys("TAB");
    browser.pause(100);
    this.$input_cardCvc.setValue(paymentData.cardCvc);
    browser.pause(100);
    browser.keys("TAB");
    browser.pause(100);
    this.$input_email.setValue(paymentData.email);
    browser.pause(100);

    this.$button_submit.waitForClickable();
    this.$button_submit.click();
  }

  fillPaymentData_new(paymentData: B2P) {
    // Заполняем номер карты
    this.$xPath_cardNum.click();
    this.$input_cardNum.setValue(paymentData.cardNum);
    browser.pause(100);
    // Заполняем срок годности карты
    this.$xPath_cardDate.click();
    this.$input_cardDate.setValue(paymentData.cardDate);
    browser.pause(100);
    // Заполняем имя держателя карты
    this.$xPath_cardholder.click();
    this.$input_cardholder.setValue(paymentData.cardholderName);
    browser.pause(100);
    // Заполняем СвС код
    this.$xPath_cardCvc.click();
    this.$input_cardCvc.setValue(paymentData.cardCvc);
    browser.pause(100);
    // Заполняем имейл
    this.$input_email.click();
    this.$input_email.setValue(paymentData.email);
    browser.pause(100);

    this.$button_submit.waitForClickable();
    this.$button_submit.click();

    this.returnToOrder();
  }
}

export const bestToPay = new BestToPay();
