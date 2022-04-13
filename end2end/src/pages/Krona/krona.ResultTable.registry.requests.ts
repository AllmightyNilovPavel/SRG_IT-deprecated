import { KronaResultTable } from "./krona.ResultTable";
import { ResultTableRequestsColumn } from "./Enums/krona.enum.resultTable.requestsColumns";

class ResultTableRegistryRequests extends KronaResultTable {
  // ------------------------- Шапка таблицы ----------------------------------
  private get $requests_tableHead() {
    return this.$result_Table.$(`thead tr`);
  }
  get $requestsHead_columnDate() {
    return this.$requests_tableHead.$(`th[aria-label^="Дата"]`);
  }
  get $requestsHead_columnAddress() {
    return this.$requests_tableHead.$(`th[aria-label^="Адрес"]`);
  }
  get $requestsHead_columnType() {
    return this.$requests_tableHead.$(`th[aria-label^="Тип"]`);
  }
  get $requestsHead_columnAttributes() {
    return this.$requests_tableHead.$(`th[aria-label^="Характеристики"]`);
  }
  get $requestsHead_columnRequestPrice() {
    return this.$requests_tableHead.$(`th[aria-label^="Стоимость"]`);
  }
  get $requestsHead_columnCalculatedPrice() {
    return this.$requests_tableHead.$(`th[aria-label^="Расчетная"]`);
  }
  get $requestsHead_columnDeviation() {
    return this.$requests_tableHead.$(`th[aria-label^="Отклонение"]`);
  }
  get $requestsHead_columnStatus() {
    return this.$requests_tableHead.$(`th[aria-label^="Статус"]`);
  }
  get $requestsHead_columnAuthor() {
    return this.$requests_tableHead.$(`th[aria-label^="Пользователь"]`);
  }
  // ------------------------- Тело таблицы -----------------------------------
  private get $requests_tableBody() {
    return this.$result_Table.$(`tbody tr`);
  }
  get $requestsBody_columnDate() {
    return this.$requests_tableBody.$$(`td`)[0];
  }
  get $requestsBody_columnAddress() {
    return this.$requests_tableBody.$$(`td`)[1];
  }
  get $requestsBody_columnType() {
    return this.$requests_tableBody.$$(`td`)[2];
  }
  get $requestsBody_columnAttributes() {
    return this.$requests_tableBody.$$(`td`)[3];
  }
  get $requestsBody_columnRequestPrice() {
    return this.$requests_tableBody.$$(`td`)[4];
  }
  get $requestsBody_columnCalculatedPrice() {
    return this.$requests_tableBody.$$(`td`)[5];
  }
  get $requestsBody_columnDeviation() {
    return this.$requests_tableBody.$$(`td`)[6];
  }
  get $requestsBody_columnStatus() {
    return this.$requests_tableBody.$$(`td`)[7];
  }
  get $requestsBody_columnAuthor() {
    return this.$requests_tableBody.$$(`td`)[8];
  }
  // ---------------------------------------------------------------------------
  getTableColumnData(column: ResultTableRequestsColumn) {
    switch (column) {
      case ResultTableRequestsColumn.DATE:
        return this.$requestsBody_columnDate.getText();
      case ResultTableRequestsColumn.ADDRESS:
        return this.$requestsBody_columnAddress.$(`a`).getText();
      case ResultTableRequestsColumn.TYPE:
        return this.$requestsBody_columnType.getText();
      case ResultTableRequestsColumn.ATTRIBUTES:
        return this.$requestsBody_columnAttributes.getText();
      case ResultTableRequestsColumn.REQUEST_PRICE:
        return this.$requestsBody_columnRequestPrice.$(`p`).getText();
      case ResultTableRequestsColumn.CALCULATED_PRICE:
        return this.$requestsBody_columnCalculatedPrice.$(`p`).getText();
      case ResultTableRequestsColumn.DEVIATION:
        return this.$requestsBody_columnDeviation.$(`p`).getText();
      case ResultTableRequestsColumn.STATUS:
        return this.$requestsBody_columnStatus.getText();
      case ResultTableRequestsColumn.AUTHOR:
        return this.$requestsBody_columnAuthor.getText();
      default:
        return new Error("Данные столбца не могут быть получены.");
    }
  }
}

export const RequestsRegistryResultTable = new ResultTableRegistryRequests();
