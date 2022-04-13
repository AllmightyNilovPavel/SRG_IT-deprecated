class KronaRequestsOpenbankChecklist {
  private get $root() {
    return $(`//td[contains(text(),'Чеклист проверки отчета')]/../../..`);
    // return $(`//table[@id='openbankChecklist']`)
  }
  waitForload() {
    let target = this.$root;
    target.waitForExist();
    target.waitForDisplayed();
  }
  /**
   * Метод принимающий на вход значение поля чеклиста
   * по которому нужно получить статус и возвращает
   * значение этого пункта чеклиста
   *
   * @param checkpoint
   * @returns текст значения
   */
  getChecklistCheckpointData(checkpoint: KronaRequestsOpenbankChecklist) {
    return this.$root
      .$(`//td[contains(text(),'${checkpoint}')]/..//td[not(contains(text(),'${checkpoint}'))]`)
      .getText();
  }
}
export const kronaRequestsOpenbankChecklist = new KronaRequestsOpenbankChecklist();
