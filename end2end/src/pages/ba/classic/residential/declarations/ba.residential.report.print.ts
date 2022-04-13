export class BaResidentialReportPrint {
  get $base_modalPrintReport() {
    return $(`#printReportModal`);
  }
  get $button_jsonPreview() {
    return this.$base_modalPrintReport.$(`#json-preview-list`);
  }
  get $button_wordAgreement() {
    return this.$base_modalPrintReport.$(`#word-agreement`);
  }
  get $button_printQualityMax() {
    return this.$base_modalPrintReport.$(`#word-max`);
  }
  get $button_printQualityMiddle() {
    return this.$base_modalPrintReport.$(`#word-middle`);
  }
  get $button_printQualityMin() {
    return this.$base_modalPrintReport.$(`#word-min`);
  }
  get $button_conclusion() {
    return this.$base_modalPrintReport.$(`#word-conclusion`);
  }
  get $button_calculations() {
    return this.$base_modalPrintReport.$(`#word-calculations`);
  }
}
