import { FA_CreditAmount } from "../enum";

export class OpenOcenkaMainPageForm {
  private get $root() {
    return $(`//div[contains(@id,'mainPageForm')]`);
  }

  get $buttonMortgage() {
    // return this.$root.$(`//input[@id='mortgage']`)
    return this.$root.$(`//label[@for='mortgage']`);
  }
  get $buttonResidentialTitle() {
    return this.$root.$(`//input[@id='title']`);
  }
  get $buttonRefinancing() {
    return this.$root.$(`//input[@id='refinancing']`);
  }
  get $buttonMilitaryRefinancing() {
    return this.$root.$(`//input[@id='military_refinancing']`);
  }
  get $inputRegionSelect() {
    return this.$root.$(`//input[@id='regionSelect']`);
  }
  get $inputStreet() {
    return this.$root.$(`//input[@id='street']`);
  }
  get $inputFlatNumber() {
    return this.$root.$(`//input[@id='flatNumber']`);
  }
  get $buttonMakeOrder() {
    return this.$root.$(`//button[@id='makeOrder']`);
  }
  /**
   *
   */
  private get $buttonCreditAmountMoreLimit() {
    return this.$root.$(`//input[@id='creditAmountMoreLimit']`);
  }
  /**
   *
   */
  private get $buttonCreditAmountLessLimit() {
    return this.$root.$(`//input[@id='creditAmountLessLimit']`);
  }

  selectCreditAmount(creditAmount: FA_CreditAmount) {
    let target: WebdriverIO.Element;
    creditAmount === FA_CreditAmount.MORE
      ? (target = this.$buttonCreditAmountMoreLimit)
      : (target = this.$buttonCreditAmountLessLimit);
    target.waitForExist();
    target.waitForClickable();
    target.scrollIntoView();
    target.click();
  }

  waitForLoad() {
    this.$root.waitForExist();
    this.$root.waitForDisplayed();
  }
}

export const openOcenkaMainPageForm = new OpenOcenkaMainPageForm();
