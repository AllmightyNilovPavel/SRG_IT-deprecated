import { BaReactDpaOrdersListBase } from "../PageObjects/ba.react.orders.registry.dpaOrders.pageObject";

export class BaReactDpaOrdersListFactory extends BaReactDpaOrdersListBase {
  acceptOrder(orderNumber: number) {
    let target = $(
      `//a[contains(text(),'${orderNumber}')]/../..//button[contains(@class,'positive')]`
    );
    let modalAcceptOrderSubmit = $(
      `//b[contains(text(),'Принимая заказ в работу')]/../../../div[@class='actions']/button[@class='ui primary button']`
    );
    let modalOrderAcceptedSuccessful = $(
      `//div[contains(text(),'Заказ принят')]/../div[@class='actions']/button`
    );
    target.waitForClickable({
      timeoutMsg: `Кнопка "принять заказ" недоступна.`,
    });
    target.click();

    modalAcceptOrderSubmit.waitForClickable();
    modalAcceptOrderSubmit.click();
    modalAcceptOrderSubmit.waitForDisplayed({ reverse: true });
    modalOrderAcceptedSuccessful.waitForDisplayed({
      timeoutMsg: `Информационное окно что заказ принят - не появилось.`,
    });
    modalOrderAcceptedSuccessful.click();
  }
  declineOrder(orderNumber: number) {
    let target = $(
      `//a[contains(text(),'${orderNumber}')]/../..//button[contains(@class,'negative')]`
    );
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null, {
      timeout: 30000,
      timeoutMsg: `Реестр заказов не прогузился.`,
    });
    this.$tableContents.waitForExist();
    this.$tableContents.waitForDisplayed({ timeoutMsg: `${this.registryName}. Не загрузился.` });
  }
}
