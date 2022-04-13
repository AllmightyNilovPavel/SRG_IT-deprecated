import { KronaOrderDpaResidentialDataFields } from "../enums";
import { KronaOrderDpaResidentialNewOrder } from "../krona.order.dpa.residential.newOrder";

export class KronaOrderDpaResidentialGetters extends KronaOrderDpaResidentialNewOrder {
  getReportFieldData(data: KronaOrderDpaResidentialDataFields) {
    let operatingElement = this[`${data}`];
    operatingElement.scrollIntoView();
    operatingElement.waitForDisplayed({});

    return operatingElement.getValue();
  }
}
