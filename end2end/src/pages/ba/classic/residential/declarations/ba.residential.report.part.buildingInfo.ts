import { BaResidentialReportBase } from "./ba.residential.report.base";

export class BaResidentialReportPartBuildingInfo {
  residentialReportBase = new BaResidentialReportBase();

  protected get $root() {
    return $(`div.tab-content > div#tab4`);
  }
  /** Серия Здания
   * `#buldingSeries`
   */
  get $input_buldingSeries() {
    return this.$root.$(`#buldingSeries`);
  }
  /** Этажность
   * `#storeys`
   */
  get $input_storeys() {
    return this.$root.$(`#storeys`);
  }
  /**
   * Материал наружных стен
   * `#buildingWalls`
   * @deprecated
   * @see https://srgroup.atlassian.net/browse/WEB-33430
   */
  get $input_buildingWalls() {
    return this.$root.$(`#buildingWalls`);
  }
  private get $outerWallsMaterialRoot() {
    return this.$root.$(``);
  }
  /**
   * Селектор для поля "Материал наружных стен"
   *
   */
  get $selectorOuterBuildingWallsMaterial() {
    return this.$root.$(`#outerWallsMaterial`);
  }
  /** Материал стен БТИ
   * `#buildingWallsBTI`
   */
  get $input_buildingWallsBTI() {
    return this.$root.$(`#buildingWallsBTI`);
  }
  /** Материал наружных стен
   * `#buildingCeillings`
   */
  get $input_buildingCeillings() {
    return this.$root.$(`#buildingCeillings`);
  }
  /** Тип перегородок
   * `#partitionType`
   */
  get $input_partitionType() {
    return this.$root.$(`#partitionType`);
  }
  /** Год постройки
   * `#builtInYear`
   */
  get $input_builtInYear() {
    return this.$root.$(`#builtInYear`);
  }
  /** Здание является аварийным\ветхим
   * `select[data-bind*='dilapidated']`
   */
  get $selector_dilapidated() {
    return this.$root.$(`select[data-bind*='dilapidated']`);
  }
  /** Здание участвует в реновации
   * `#involvedInTheRenovation`
   */
  get $selector_renovation() {
    return this.$root.$(`#involvedInTheRenovation`);
  }
  get $input_renovationComment() {
    return this.$root.$(`#involvedInTheRenovationComment`);
  }
  /** Общее состояние здания
   * `#stateOfBuilding`
   */
  get $input_stateOfBuilding() {
    return this.$root.$(`#stateOfBuilding`);
  }
  /** Состояние кровли
   * `#stateOfRoof`
   */
  get $input_stateOfRoof() {
    return this.$root.$(`#stateOfRoof`);
  }
  /** Кол-во квартир на этаже
   * `#numberOfFlatsOnTheFloor`
   */
  get $input_floorFlatsCount() {
    return this.$root.$(`#numberOfFlatsOnTheFloor`);
  }
  /** Наличие втроенныо-пристроенных нежилых помещений
   * `#extensions`
   */
  get $input_extensions() {
    return this.$root.$(`#extensions`);
  }
  /** Наличие дополнительных услуг для жильцов
   * `#services`
   */
  get $input_services() {
    return this.$root.$(`#services`);
  }
  /** Прочие особенности дома
   * `#features`
   */
  get $input_features() {
    return this.$root.$(`#features`);
  }
}
