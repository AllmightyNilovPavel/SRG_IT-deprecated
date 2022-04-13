export class KronaCompanyCardBase {
  path = "/company/";

  get $root_tabs() {
    return $(`//div[@class='tab']`);
  }
  get $root_infoBox() {
    return $(`//div[@id='info_box']`);
  }
}
