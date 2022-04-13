class ZalogUserCabinet {
  path = "/credit/order/";

  /** Загрузчик реестра */
  public get $loader() {
    // return browser.$(`//*[@id="BaseLayout_content_3o9WG"]/div[3]/div/div[2]/div[3]/div/div`);
    return $(`div[class*="OrderList_loader"]`);
  }
  private get $userLogo() {
    return $(`span.ym-hide-content`);
  }
  private get $button_logout() {
    return $(`a[class*='profileBlockLogoff']`);
  }
  /** Кнопка "Заказать" */
  get $button_newOrder() {
    return $(`div[class^="OrderList_headButtonsBlock"]`);
  }
  get $newOrder_chooseСredit() {
    return this.$button_newOrder.$(`#chooseСredit`);
  }
  get $newOrder_chooseIndividual() {
    return this.$button_newOrder.$(`#chooseIndividual`);
  }
  get $newOrder_chooseRefinance() {
    return this.$button_newOrder.$(`#chooseRefinance`);
  }
  get $newOrder_chooseTitle() {
    return this.$button_newOrder.$(`#chooseTitle`);
  }

  waitForLoad() {
    this.$button_logout.waitForClickable({ timeout: 5000 });
  }
}
/** Личный кабинет пользователя Залог-Оценки */
export const zalogUserCabinet = new ZalogUserCabinet();
