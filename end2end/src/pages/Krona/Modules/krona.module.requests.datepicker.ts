import { RequestsBase } from "../Requests/krona.requests.base";

class RequestsDatepicker extends RequestsBase {
  private get $datepicker_root() {
    return $(`div.datepicker`);
  }
  private get $datepickerDays() {
    return this.$datepicker_root.$(`div.datepicker-days`);
  }
  private get $datepickerDays_head() {
    return this.$datepickerDays.$(`table.table-condensed > thead`);
  }
  private get $datepickerDays_body() {
    return this.$datepickerDays.$(`table.table-condensed > tbody`);
  }
  private get $datepickerDays_footer() {
    return this.$datepickerDays.$(`table.table-condensed > tfoot`);
  }
  // -----------------------------------------------------------------
  private get $datepickerMonths() {
    return this.$datepicker_root.$(`div.datepicker-months`);
  }
  private get $datepickerMonths_head() {
    return this.$datepickerMonths.$(`table.table-condensed > thead`);
  }
  private get $datepickerMonths_body() {
    return this.$datepickerMonths.$(`table.table-condensed > tbody`);
  }
  private get $datepickerMonths_footer() {
    return this.$datepickerMonths.$(`table.table-condensed > tfoot`);
  }
  // -----------------------------------------------------------------
  private get $datepickerYears() {
    return this.$datepicker_root.$(`div.datepicker-years`);
  }
  private get $datepickerYears_head() {
    return this.$datepickerYears.$(`table.table-condensed > thead`);
  }
  private get $datepickerYears_body() {
    return this.$datepickerYears.$(`table.table-condensed > tbody`);
  }
  private get $datepickerYears_footer() {
    return this.$datepickerYears.$(`table.table-condensed > tfoot`);
  }
  get $datepickerYears_today() {
    return this.$datepickerYears_footer.$(`th.today`);
  }
  get $datepickerYears_clear() {
    return this.$datepickerYears_footer.$(`th.clear`);
  }
}

export const DatepickerForRequests = new RequestsDatepicker();
