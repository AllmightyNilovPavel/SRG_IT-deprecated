import { expect } from "chai";
import { baikalNotitficationBeta } from "../baikalNotificationBeta";

class BaikalCalculationBeta {
  path = "/baikal/calculations";

  get $menu(): WebdriverIO.Element {
    return $(`div[class*=Calculation_menu]`);
  }
  get $actions_block(): WebdriverIO.Element {
    return this.$menu.$(`div[class*=Calculation_menuRight]`);
  }
  get $content(): WebdriverIO.Element {
    return $(`div[class*=Calculation_content]`);
  }
  get $table(): WebdriverIO.Element {
    return this.$content.$("table[class*=Calculation_table] tbody");
  }
  get $table_rows(): WebdriverIO.Element[] {
    return this.$table.$$("tr");
  }
  get $load_message() {
    return this.$content.$(`div[class*=loadMessage]`);
  }
  $row_by_name(rowName: string) {
    return this.$content.$(`div=${rowName}`).getAttribute("id");
  }
  $cell_by_row_and_offer(fieldName: string, numOffer: number) {
    const idRow = this.$row_by_name(fieldName);
    const numRow = parseInt(idRow.split(":")[2]);
    const numColumn = parseInt(idRow.split(":")[3]) + 1 + numOffer;
    const inputId = `0:1:${numRow}:${numColumn}:0`;
    return inputId;
  }
  changeCellValue(fieldName: string, numOffer: number, value: string) {
    const inputId = this.$cell_by_row_and_offer(fieldName, numOffer);
    const cell = $(`[id='${inputId}']`);

    if (cell.getAttribute("class").search(/calculation_input/i) > -1) {
      cell.clearValue();
      cell.setValue(value);
    } else if (cell.getAttribute("class").search(/calculation_textarea/i) > -1) {
      cell.clearValue();
      cell.setValue(value);
    } else {
      expect.fail("Unknown element for change");
    }
    browser.pause(1000);
  }
  checkCellValue(fieldName: string, numOffer: number, value: string) {
    const inputId = this.$cell_by_row_and_offer(fieldName, numOffer);

    const cellValue = $(`[id='${inputId}']`).getValue();
    expect(cellValue.toString()).to.equal(value);
  }

  sendCalculationToKrona() {
    this.$actions_block.$(`i[class*=fa-paper-plane]`).click();
    console.log(`Кликнул по самолетику для отправки расчетника в КРОНУ`);
    baikalNotitficationBeta.$notification.waitForDisplayed({
      timeoutMsg: `Всплывающее окно "Расчётник передан" не появилось`,
    });
    expect(baikalNotitficationBeta.$message).to.equal("Расчётник передан");
    console.log(`Появилось всплывающее окно "Расчетник передан"`);
    baikalNotitficationBeta.close();
    console.log(`Закрытие всплывающего окна`);
  }

  waitForLoad() {
    // this.$load_message.waitForDisplayed({
    //   timeout: 10000,
    // });
    this.$load_message.waitForDisplayed({
      timeout: 10000,
      reverse: true,
    });
  }
}

export const baikalCalculationBeta = new BaikalCalculationBeta();
