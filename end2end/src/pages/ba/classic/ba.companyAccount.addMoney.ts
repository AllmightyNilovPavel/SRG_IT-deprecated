import { BaCompanyAddMoneyPaymentType, BaMainPage } from ".";

class BaCompanyAccountAddMoney extends BaMainPage {
  get $addMoneyModalRoot() {
    return $(`//div[@id='invoiceModal']`);
  }
  get $inputMoneyAmmount() {
    return this.$addMoneyModalRoot.$(`.//input[@id='invoice']`);
  }
  get $buttonPayByInvoice() {
    return this.$addMoneyModalRoot.$(`.//button[@id='invoiceButton']`);
  }
  get $buttonPayByCard() {
    return this.$addMoneyModalRoot.$(`.//button[@id='cardButton']`);
  }
  /** Метод пополнения счёта.
   *
   */
  refillAccount(ammount: number, paymentType: BaCompanyAddMoneyPaymentType) {
    this.$buttonCompanyAccountAddMoney.waitForClickable();
    this.$buttonCompanyAccountAddMoney.click();
    this.$addMoneyModalRoot.waitForDisplayed();

    this.$inputMoneyAmmount.waitForClickable();
  }
}

export const baCompanyAccountAddMoney = new BaCompanyAccountAddMoney();
