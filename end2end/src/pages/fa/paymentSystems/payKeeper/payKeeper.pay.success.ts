class PaySuccess {
  path = "https://test-zalog-ocenka.server.paykeeper.ru/success/";

  private get $root() {
    return $(`#content`);
  }
  get $button_return() {
    return this.$root.$(`#back`);
  }
}

export const paySuccess = new PaySuccess();
