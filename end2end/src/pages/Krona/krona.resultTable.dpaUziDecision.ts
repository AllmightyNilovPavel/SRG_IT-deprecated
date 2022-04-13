import { makeScreenshot } from "modules";
import { KronaEnumDpaUziDecision } from ".";
import { KronaResultTable } from "./krona.ResultTable";

class KronaModalDpaUziDecision extends KronaResultTable {
  get $dpaUziOpenModal() {
    return this.$result_Table.$(`//div[@class='dpa-uzi-button']`);
  }
  get $dpaUziFormRoot() {
    return $(`//div[@id='dpa_uzi_form']`);
  }
  get $dpaUziFormButtonClose() {
    return this.$dpaUziFormRoot.$(`.//button[@class='close']`);
  }
  get $dpaUziDecisionSelector() {
    return this.$dpaUziFormRoot.$(`.//select[@id='dpa_uzi_decision']`);
  }
  get $dpaUziDecisionSelectorOptions() {
    return this.$dpaUziDecisionSelector.$$(`.//option`);
  }
  get $dpaUziPriceInputRoot() {
    return this.$dpaUziFormRoot.$(`.//div[@id='price']`);
  }
  get $dpaUziPriceInput() {
    return this.$dpaUziFormRoot.$(`.//input[@id='dpa_uzi_price']`);
  }
  get $dpaUziCommentRoot() {
    return this.$dpaUziFormRoot.$(`.//div[@id='comment']`);
  }
  get $dpaUziCommentTitle() {
    return this.$dpaUziCommentRoot.$(`.//h4[@id='comment_title']`);
  }
  get $dpaUziCommentInput() {
    return this.$dpaUziCommentRoot.$(`.//textarea[@id='dpa_uzi_comment']`);
  }

  get $dpaUziButtonSend() {
    return this.$dpaUziFormRoot.$(`.//button[@id="dpa_uzi_sent"]`);
  }
  get $dpaUziErrorMessage() {
    return this.$dpaUziFormRoot.$(`.//span[@id='dpa_uzi_errors']`);
  }

  openDecisionModalWindow() {
    this.$dpaUziOpenModal.waitForClickable();
    this.$dpaUziOpenModal.click();
    this.$dpaUziFormRoot.waitForDisplayed();
  }
  makeUziDecision(
    decision: KronaEnumDpaUziDecision,
    uziPriceRefference?: number,
    comment?: string
  ) {
    if (!this.$dpaUziFormRoot.isDisplayed()) this.openDecisionModalWindow();

    this.$dpaUziDecisionSelector.selectByAttribute("value", `${decision}`);
    if (decision === KronaEnumDpaUziDecision.DECLINE && uziPriceRefference !== null) {
      this.$dpaUziPriceInput.waitForEnabled();
      this.$dpaUziPriceInput.setValue(uziPriceRefference!.toString());
      browser.waitUntil(() => this.$dpaUziPriceInput.getText() !== null, {
        timeoutMsg: `Ошибка проставления ориентира стоимости СТЗ`,
      });
    }

    if (comment) this.$dpaUziCommentInput.setValue(comment);

    this.$dpaUziButtonSend.waitForClickable();
    makeScreenshot(`Принятие решения по ВТБ ДРВ`);
    this.$dpaUziButtonSend.click();
    this.$dpaUziFormRoot.waitForDisplayed({
      reverse: true,
      timeout: 25000,
      timeoutMsg: `Окно принятия решения УЗИ не исчезло.`,
    });
  }
}

export const kronaDpaUziDecision = new KronaModalDpaUziDecision();
