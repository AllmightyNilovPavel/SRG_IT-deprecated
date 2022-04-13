import { BaResidentialReportBase } from "./ba.residential.report.base";

export class BaResidentialReportPartAssesmentObject {
  residentialReportBase = new BaResidentialReportBase();

  protected get $root() {
    return $(`div.tab-content > div#tab3`);
  }
  /** Источник инфо о характеристиках */
  get $input_flatDataSource() {
    return this.$root.$(`#flatDataSource`);
  }
  /** Кол-во комнат */
  get $input_rooms() {
    return this.$root.$(`#rooms`);
  }
  /** Комнаты - "Нет данных" */
  get $checkbox_rooms_noData() {
    return this.$root.$(`#rooms_noData`);
  }
  /** Общая площадь */
  get $input_spaceTotal() {
    return this.$root.$(`#spaceTotal`);
  }
  /** Жилая площадь */
  get $input_spaceLiving() {
    return this.$root.$(`#spaceLiving`);
  }
  /** Жилая площадь - нет данных */
  get $checkbox_spaceLiving_noData() {
    return this.$root.$(`#spaceLiving_noData`);
  }
  /** Площадь кухни */
  get $input_spaceKitchen() {
    return this.$root.$(`#spaceKitchen`);
  }
  /** Площадь кухни - нет данных */
  get $checkbox_spaceKitchen_noData() {
    return this.$root.$(`#spaceKitchen_noData`);
  }
  /** Площадь летних помещений */
  get $input_spaceBalcony() {
    return this.$root.$(`#spaceBalcony`);
  }
  /** Чекбокс "Площадь летних помещений - нет данных" */
  get $checkbox_spaceBalcony_noData() {
    return this.$root.$(`#spaceBalcony_noData`);
  }
  /** Общая площадь с учетом летних помещений */
  get $input_spaceTotalWithBalcony() {
    return this.$root.$(`input#spaceTotalIncludingBalcony`);
  }
  /** Чекбокс "Общая площадь с учетом летних помещений - нет данных"*/
  get $checkbox_spaceTotalWithBalcony_noData() {
    return this.$root.$(`#spaceTotalIncludingBalcony_noData`);
  }
  /** Поле "Тип комнат" */
  get $input_adjacentRooms() {
    return this.$root.$(`#adjacentRooms`);
  }
  /** Поле "Высота потолков" */
  get $input_flatHeight() {
    return this.$root.$(`#height`);
  }
  get $input_flatFloor() {
    return this.$root.$(`input#floor`);
  }
  get $checkbox_mansard() {
    return this.$root.$(`#mansard`);
  }
  get $checkbox_multilevelFlat() {
    return this.$root.$(`#multiFloor`);
  }
  /** Поле "Вид из окна" */
  get $input_windowView() {
    return this.$root.$(`#windowView`);
  }
  /** Поле `Сан. Узел` */
  get $input_sanitaryFacilities() {
    return this.$root.$(`#wcType`);
  }
  /** Летние помещения */
  get $input_balconyType() {
    return this.$root.$(`#balconyType`);
  }
  get $selectInternalInspection() {
    return this.$root.$(`select#internalInspection`);
  }
  /** Селектор "Общее состояние помещений" */
  get $selector_qualifiedRepairsState() {
    return this.$root.$(`#qualifiedRepairsState`);
  }
  /** Описание отделки если ИНОЕ */
  get $input_repairState() {
    return this.$root.$(`#state`);
  }
  /** Конструктивные Элементы - Полы */
  get $input_floorDescription() {
    return this.$root.$(`#descriptionOfFloring`);
  }
  /** Конструктивные Элементы - Потолок */
  get $input_ceilingDescription() {
    return this.$root.$(`#descriptionOfCeilling`);
  }
  /** Конструктивные Элементы - Стены */
  get $input_wallDescription() {
    return this.$root.$(`#descriptionOfWalls`);
  }
  /** Конструктивные Элементы - Окна */
  get $input_windowsDescription() {
    return this.$root.$(`#descriptionOfWindows`);
  }
  /** Конструктивные Элементы - Входная дверь */
  get $input_doorDescription() {
    return this.$root.$(`#descriptionOfDoor`);
  }
  /** Конструктивные Элементы - Внутренние двери */
  get $input_innerDoorsDescription() {
    return this.$root.$(`#descriptionOfInnerDoor`);
  }
  /** Кондиционирование */
  get $input_conditioner() {
    return this.$root.$(`#conditioner`);
  }
  /** Отопительные приборы */
  get $input_heaters() {
    return this.$root.$(`#heaters`);
  }
  /** Противопожарная безопасность */
  get $input_fireproof() {
    return this.$root.$(`#fireproof`);
  }
  /** Дополнительные удобства */
  get $input_facilities() {
    return this.$root.$(`#facilities`);
  }
}
