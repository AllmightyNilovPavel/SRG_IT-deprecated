class BaikalNotitficationBeta {
  get $notification(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class,'ant-notification-notice')]`);
  }
  get $message() {
    return this.$notification
      .$(`//div[contains(@class,'ant-notification-notice-message')]`)
      .getText();
  }
  get $close_icon() {
    return this.$notification.$(`//span[contains(@class,'ant-notification-close-x')]//i`);
  }

  close() {
    this.$close_icon.waitForClickable({
      timeoutMsg: `Иконка закрытия всплывающего окна НЕ кликабельна`,
    });
    this.$close_icon.click();
    this.$notification.waitForDisplayed({
      reverse: true,
      timeoutMsg: `Всплывающее окно отображается после закрытия`,
    });
  }
}

export const baikalNotitficationBeta = new BaikalNotitficationBeta();
