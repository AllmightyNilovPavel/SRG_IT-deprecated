class PayKeeper {
  path = "https://testgw.paykeeper.ru/";

  private get $root() {
    return $(`div.main_wrap`);
  }
  // -----------------------------------------------------------------
  private get $header() {
    return this.$root.$(`div.header`);
  }
  // -----------------------------------------------------------------
  private get $body() {
    return this.$root.$(`div.content_wrap`);
  }
  private get $body_cardForm() {
    return this.$body.$(`form#card_form`);
  }
  private get $body_cardInfo() {
    return this.$body_cardForm.$(`div.cardinfo`);
  }
  private get $body_actionButtons() {
    return this.$body_cardForm.$(`div.form-actions`);
  }
  get $button_payConfirm() {
    return this.$body_actionButtons.$(`input#submit_card_form`);
  }
  get $button_payDecline() {
    return this.$body_actionButtons.$(`a.cancel_pay`);
  }
  // -----------------------------------------------------------------
  private get $footer() {
    return this.$root.$(`div.footer`);
  }
}

export const payKeeper = new PayKeeper();
