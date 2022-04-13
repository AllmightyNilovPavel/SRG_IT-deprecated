export class BaResidentialReportPartLocationAndMap {
  private get $root() {
    return $(`form#location-form`);
  }
  /** Административный округ
   * `#administrativeRegion`
   */
  protected get $input_administrativeRegion() {
    return this.$root.$(`#administrativeRegion`);
  }
  /** Район города
   * `#district`
   */
  protected get $input_district() {
    return this.$root.$(`#district`);
  }
  /** Средняя стоимость объектов этого класса
   * `#averagePrice`
   */
  protected get $input_averagePrice() {
    return this.$root.$(`#averagePrice`);
  }
  protected get $input_subwayInfo() {
    return this.$root.$(`#subway`);
  }
  protected get $input_subwayDistance() {
    return this.$root.$(`input#subwayDistance`);
  }
  protected get $input_highway() {
    return this.$root.$(`input#highway`);
  }
  protected get $input_mkadDistance() {
    return this.$root.$(`input#mkadDistance`);
  }
  protected get $input_highwayDistance() {
    return this.$root.$(`input#highwayDistance`);
  }
  protected get $input_districtPrestige() {
    return this.$root.$(`input#prestigiousness`);
  }
  protected get $input_exposureTime() {
    return this.$root.$(`input#exposureTime`);
  }
  protected get $input_transportAvailability() {
    return this.$root.$(`input#transportAvailability`);
  }
  protected get $checkbox_onCATOArea() {
    return this.$root.$(`input#onCATOArea`);
  }
  /** Эстетичность окружающей застройки
   * `#esthetic`
   */
  protected get $input_esthetic() {
    return this.$root.$(`#esthetic`);
  }
  /** Ликвидность
   * `#liquidity`
   */
  protected get $input_liquidity() {
    return this.$root.$(`#liquidity`);
  }
  /** Наличие расположенных рядом объектов
   * `#nearPlantDescriptions`
   */
  protected get $input_nearPlantDescriptions() {
    return this.$root.$(`#nearPlantDescriptions`);
  }
  /**
   * Кнопка "Обновить карту". Следует использовать только после ввода аналогов
   */
  protected get $button_mapRefresh() {
    return this.$root.$(`#ymap-redraw`);
  }
  protected get $info_mapErrorMessage() {
    return this.$root.$(`#ymap-errormessages`);
  }
}
