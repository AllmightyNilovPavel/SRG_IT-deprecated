import {
  KronaBuildingQarter,
  KronaRequestHouseCommunications,
  KronaRequestLandCategory,
  KronaRequestLandCommunications,
  KronaRequestsOldRepairsState,
  KronaRequestsQualifiedRepairsState,
  KronaRequestsWallsType,
  RealtyType,
  ValuationResultData,
} from "../Enums";

import { debugLogging, getIdFromUrl } from "../../../modules";
import { EnumKeyboardButtons } from "pages/baikal";

/**
 * Класс типа `PageObject` для работы со страницей
 * создания [нового запроса на оценку](https://test.srg-it.ru/9r/request/flat/new)
 */
export class RequestsBase {
  protected get $root() {
    return $(`#valuationRequestForm`);
  }
  // Дополнительная инфа
  /** Яндекс Карта */
  protected get $map_root() {
    return $("#valuationRequestLatLonMap");
  }
  get $map() {
    return this.$map_root.$(`ymaps.ymaps-map`);
  }
  /** поле выбора типа недвиги */
  protected get $selector_realtyType() {
    return this.$root.$("#realtyType");
  }
  // -------------------------- Блок ввода адреса ---------------------------------
  /** База компонента выбора адреса */
  protected get $addressInput_root() {
    return this.$root.$(`span.twitter-typeahead`);
  }
  /** поле ввода адреса */
  get $input_addressAutocomplete() {
    return $("input#addressAutocomplete");
  }
  /** Выпадашка с подсказками */
  protected get $addressInput_suggestDropdown() {
    return this.$addressInput_root.$(`div.tt-menu.tt-open`);
  }
  protected get $addressInput_emptySuggest() {
    return this.$addressInput_root.$(`div.tt-menu > div.tt-dataset-0`);
  }
  protected get $addressInput_activeSuggestions() {
    return this.$addressInput_root.$(`div.tt-suggestion`);
  }
  /** Субъект РФ */
  get $text_parsedAddress_Subject() {
    return this.$root.$(`label[for="region"]`).getText();
  }
  get $text_parsedAddress_Area() {
    return this.$root.$(`#area`);
  }
  get $input_houseNumber() {
    return this.$root.$(`#houseNumber`);
  }
  /** Поле ввода ГОДа постройки
   */
  get $input_buildDate() {
    return this.$root.$(`#buildDate`);
  }
  /**  */
  get $input_storeys() {
    return this.$root.$(`#storeys`);
  }
  /** Селектор "Материал стен" */
  protected get $selector_walls() {
    return this.$root.$(`#walls`);
  }
  /** Этаж */
  get $input_floor() {
    return this.$root.$(`#floor`);
  }
  /** Кол-во комнат */
  get $input_rooms() {
    return this.$root.$(`#rooms`);
  }
  /** Общая площадь */
  get $input_total() {
    return this.$root.$(`#total`);
  }
  /** Жилая площадь */
  get $input_living() {
    return this.$root.$(`#living`);
  }
  /** Площаь кухни */
  get $input_kitchen() {
    return this.$root.$(`#kitchen`);
  }
  /** Состояние отделки */
  protected get $selector_qualifiedRepairsState() {
    return this.$root.$(`#qualifiedRepairsState`);
  }
  /** Состояние отделки - старое */
  protected get $selector_oldRepairsState() {
    return this.$root.$(`#flatRepairs`);
  }
  /** Состояние отделки - для ДОМА */
  protected get $selectorHouseRepairs() {
    return $(`#houseRepairs`);
  }
  /** Стоимость объекта */
  get $input_reportPrice() {
    return this.$root.$(`#reportPrice`);
  }
  /** Адрес ориентира (по документам) */
  get $input_documentAddress() {
    return this.$root.$(`#documentAddress`);
  }
  /** Наименование ЖК */
  get $input_housingComplex() {
    return this.$root.$(`#housingComplex`);
  }
  /** Квартал сдачи дома
   * применимо только к новостройке
   */
  protected get $selector_quarter() {
    return this.$root.$(`#quarter`);
  }
  /** Номер участка */
  get $input_landNumber() {
    return this.$root.$(`#landNumber`);
  }
  /** Наименование СНТ\КП */
  get $input_associationName() {
    return this.$root.$(`#associationName`);
  }
  /** Кадастровый номер земельного участка */
  get $input_cadastralNumber() {
    return this.$root.$(`#cadastralNumber`);
  }
  /** Площадь земли */
  get $input_landSpace() {
    return this.$root.$(`#landSpace`);
  }
  /** Категория земельного участка */
  protected get $selector_landCategory() {
    return this.$root.$(`#landCategory`);
  }
  get $input_landPurpose() {
    return this.$root.$(`#landPurpose`);
  }
  /** Электричество */
  protected get $selector_electricity() {
    return this.$root.$(`#electricity`);
  }
  /** Газоснабжение */
  protected get $selector_gas() {
    return this.$root.$(`#gasSupply`);
  }
  /** Водоснабжение */
  protected get $selector_water() {
    return this.$root.$(`#waterSupply`);
  }
  /** Канализация */
  protected get $selector_sewerage() {
    return this.$root.$(`#sewerage`);
  }
  /** Изображения */
  protected get $input_fileInput() {
    // return this.$root.$(`#file`);
    return this.$root.$(`input[title='file input']`);
  }
  /** Кадастровый\условный номер дома */
  get $input_houseCadastralNumber() {
    return this.$root.$(`#houseCadastralNumber`);
  }
  /** Площадь дома */
  get $input_houseSpace() {
    return this.$root.$(`#houseSpace`);
  }
  get $selectorHouseElectricity() {
    return $(`#houseElectricity`);
  }
  get $selectorHouseWaterSupply() {
    return $(`#houseWaterSupply`);
  }
  get $selectorHouseHeating() {
    return $(`#houseHeating`);
  }
  get $selectorHouseSewerage() {
    return $(`#houseSewerage`);
  }
  /**
   * Материал стен дома
   */
  get $input_houseWalls() {
    return this.$root.$(`#houseWalls`);
  }
  /** Общая стоимость объекта */
  get $input_totalPrice() {
    return this.$root.$(`#totalPrice`);
  }
  /** стоимость дома */
  get $input_housePrice() {
    return this.$root.$(`#housePrice`);
  }
  /** стоимость участка */
  get $input_landPrice() {
    return this.$root.$(`#landPrice`);
  }
  // ----------------------------------------------------------------------------
  /** кнопка "Расчитать стоимость" */
  get $button_buttonSend() {
    return this.$root.$("#btnSend");
  }
  /** Превью для загруженного файла */
  protected get $loadedFileThumbnail() {
    return this.$root.$(
      `div:nth-child(8) > valuation-form-additional > div > div > div.uploader-template.multi.col-sm-8 > div > ul > li > img`
    );
  }
  protected get $loadedFile_fileSize() {
    return this.$root.$(`span.qq-upload-size-selector.qq-upload-size`);
  }
  /** сообщение с результатом расчёта */
  // get $message_done() {
  //   return browser.$(`#valuationResult > div > h2 ="Результат расчета:"`);
  // }
  /** Кастомное поле №1 */
  get $input_customField1() {
    return this.$root.$("#custom1");
  }
  /** Кастомное поле №2 */
  get $input_customField2() {
    return this.$root.$("#custom2");
  }
  /** Кастомное поле №3 */
  get $input_customField3() {
    return this.$root.$("#custom3");
  }
  // ---------------------------- Блок результата расчёта -----------------------
  /** гифка с ответом */
  protected get $valuationResult_root() {
    return $(`//div[@class='well']`);
  }
  /** Расчётная стоимость */
  protected get $valuationResult_Price() {
    return this.$valuationResult_root.$(`.//*[contains(text(), 'стоимость')]`);
  }
  /** Отклонение */
  protected get $valuationResult_Deviation() {
    return this.$valuationResult_root.$(`.//*[contains(text(), 'Отклонение')]`);
  }
  /** Статус */
  protected get $valuationResult_Status() {
    return this.$valuationResult_root.$(`.//*[contains(text(), 'Статус')]`);
  }
  /** Результат расчета */
  protected get $valuationResult_valuationResult() {
    return this.$valuationResult_root.$(`.//*[contains(text(), 'Результат расчета')]`);
  }
  // ---------------------------------------------------------------------------
  //                                Функции
  // ---------------------------------------------------------------------------
  /**
   * Функция выбора типа недвижимости.
   * Обычно используется при загрузки страницы
   *
   * @param realtyType
   */
  protected select_realtyType(realtyType: RealtyType) {
    this.$selector_realtyType.waitForDisplayed({
      timeoutMsg: "Поле 'Тип объекта недвижимости' не загрузилось",
    });
    let realtyTypeChecker = this.$selector_realtyType.getValue();
    if (realtyTypeChecker !== realtyType) {
      this.$selector_realtyType.selectByAttribute("value", realtyType);
      return true;
    } else return false;
  }
  /**
   *
   * @param docAddress
   */
  inputDocumentAddress(docAddress: string) {
    let target = this.$input_documentAddress;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(docAddress);
  }
  /**
   *
   * @param address
   */
  InputAddress(address: string) {
    let region;
    try {
      this.$addressInput_root.waitForExist();
      this.$input_addressAutocomplete.click();
      this.$input_addressAutocomplete.clearValue();
      this.$input_addressAutocomplete.setValue(address);
      browser.pause(1000);
      if (this.$addressInput_emptySuggest.isDisplayed()) browser.keys("\uE00D"); // Это пробел
      let suggestDropdown = browser.$(
        `//label[@for='addressAutocomplete']/../..//div[contains(@class,'tt-menu')]`
      );
      browser.waitUntil(() => suggestDropdown.getAttribute("class").match("tt-open") !== null, {
        timeout: 20000,
        interval: 5000,
        timeoutMsg: `Поле выбора адреса не появилось`,
      });
      let target = suggestDropdown.$(`//div[contains(@class,'tt-suggestion')]`);
      target.waitForDisplayed();
      target.waitForClickable();
      target.click();

      region = browser.$(`//label[@for='region']/..//input`).getValue();
      browser.waitUntil(() => region.match(/.{3,}/) !== null, {
        interval: 1000,
        timeout: 10000,
        timeoutMsg: `Адрес не удалось выбрать.`,
      });
      debugLogging("Регион: ", region);
      debugLogging(`Весь адрес:`, address);
    } catch (e) {
      debugLogging(`При вводе адреса произошла ошибка.`);
      throw new Error(`При вводе адреса произошла ошибка. \n${e}`);
    }
    return region;
  }
  /**
   *
   * @param houseNumber
   */
  inputHouseNumber(houseNumber: number) {
    let target = this.$input_houseNumber;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода номера дома не кликабельно`,
    });
    target.clearValue();
    target.setValue(houseNumber.toString());
    debugLogging(`Номер дома: ${houseNumber}`);
  }
  /**
   *
   * @param housingComplexName
   */
  inputHousingComplexName(housingComplexName: string) {
    let target = this.$input_housingComplex;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(housingComplexName);
  }
  /**
   *
   * @param quarter
   */
  selectBuildQuarter(quarter: KronaBuildingQarter) {
    this.$selector_quarter.selectByAttribute("value", quarter);
  }
  /**
   *
   * @param builtYear
   */
  inputBuildYear(builtYear: number) {
    let target = this.$input_buildDate;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода года постройки не кликабельно`,
    });
    target.clearValue();
    target.setValue(builtYear.toString());
    browser.keys(EnumKeyboardButtons.TAB);
    debugLogging(`Год постройки: ${builtYear}`);
  }
  /**
   *
   * @param storeys
   */
  inputStoreys(storeys: number) {
    let target = this.$input_storeys;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода этажности не кликабельно`,
    });
    target.clearValue();
    target.setValue(storeys.toString());
    debugLogging(`Этажность: ${storeys}`);
  }
  /**
   *
   * @param walls
   */
  selectWallsType(walls: KronaRequestsWallsType) {
    debugLogging("Материал стен:", walls);
    this.$selector_walls.selectByAttribute("value", walls);
  }
  /**
   *
   * @param floor
   */
  inputFloor(floor: number) {
    let target = this.$input_floor;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода этажа не кликабельно`,
    });
    target.clearValue();
    target.setValue(floor.toString());
    debugLogging(`Этаж: ${floor}`);
  }
  /**
   *
   * @param roomsCount
   */
  inputRoomsCount(roomsCount: number) {
    let target = this.$input_rooms;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода количества комнат не кликабельно`,
    });
    target.clearValue();
    target.setValue(roomsCount.toString());
    debugLogging(`Количество комнат: ${roomsCount}`);
  }
  inputTotalSpace(totalSpace: number) {
    let target = this.$input_total;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода общей площади не кликабельно`,
    });
    target.clearValue();
    target.setValue(totalSpace.toString());
    debugLogging(`Общая площадь: ${totalSpace}`);
  }
  inputLivingSpace(livingSpace: number) {
    let target = this.$input_living;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода жилой площади не кликабельно`,
    });
    target.clearValue();
    target.setValue(livingSpace.toString());
    debugLogging(`Жилая площадь: ${livingSpace}`);
  }
  inputKitchenSpace(kitchenSpace: number) {
    let target = this.$input_kitchen;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода площади кухни не кликабельно`,
    });
    target.clearValue();
    target.setValue(kitchenSpace.toString());
    debugLogging(`Площадь кухни: ${kitchenSpace}`);
  }
  selectRepairState(repairState: KronaRequestsQualifiedRepairsState) {
    let repairStateOld: KronaRequestsOldRepairsState = KronaRequestsOldRepairsState.NEEDS_CAPITAL;

    if (
      this.$selector_qualifiedRepairsState.isExisting() &&
      this.$selector_qualifiedRepairsState.isDisplayed()
    )
      this.$selector_qualifiedRepairsState.selectByAttribute("value", repairState);
    else if (
      this.$selector_oldRepairsState.isExisting() &&
      this.$selector_oldRepairsState.isDisplayed()
    ) {
      switch (repairState) {
        case KronaRequestsQualifiedRepairsState.WITHOUT_REPAIRS:
          repairStateOld = KronaRequestsOldRepairsState.NEEDS_CAPITAL;
          break;
        case KronaRequestsQualifiedRepairsState.PREPARED:
          repairStateOld = KronaRequestsOldRepairsState.NEEDS_CAPITAL;
          break;
        case KronaRequestsQualifiedRepairsState.SIMPLE:
          repairStateOld = KronaRequestsOldRepairsState.NEEDS_COSMETIC;
          break;
        case KronaRequestsQualifiedRepairsState.GOOD:
          repairStateOld = KronaRequestsOldRepairsState.GOOD;
          break;
        case KronaRequestsQualifiedRepairsState.EURO:
          repairStateOld = KronaRequestsOldRepairsState.EXCELLENT;
          break;
        case KronaRequestsQualifiedRepairsState.EXCELLENT:
          repairStateOld = KronaRequestsOldRepairsState.EXCELLENT;
          break;
        default:
          repairStateOld = KronaRequestsOldRepairsState.NEEDS_CAPITAL;
          break;
      }
      this.$selector_oldRepairsState.selectByAttribute("value", repairStateOld);
    }
    debugLogging(`Состояние отделки:`, repairState);
  }
  inputPrice(reportPrice: number) {
    let target = this.$input_reportPrice;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Поле для ввода цены отчета не кликабельно`,
    });
    target.clearValue();
    target.setValue(reportPrice.toString());
    debugLogging(`Цена отчета: ${reportPrice}`);
  }
  inputLandNumber(landNumber: number) {
    let target = this.$input_landNumber;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(landNumber.toString());
  }
  inputAssociationName(associationName: string) {
    let target = this.$input_associationName;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(associationName);
  }
  inputCadastralNumber(cadastralNumber: string) {
    let target = this.$input_cadastralNumber;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(cadastralNumber);
  }
  inputLandSpace(landSpace: number) {
    let target = this.$input_landSpace;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(landSpace.toString());
  }
  selectLandCategory(landCategory: KronaRequestLandCategory) {
    this.$selector_landCategory.selectByAttribute("value", landCategory);
  }
  inputLandPurpose(landPurpose: string) {
    let target = this.$input_landPurpose;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(landPurpose);
  }
  selectLandElectricity(electricity: KronaRequestLandCommunications) {
    this.$selector_electricity.selectByAttribute("value", electricity);
  }
  selectLandGasSupply(gasSupply: KronaRequestLandCommunications) {
    this.$selector_gas.selectByAttribute("value", gasSupply);
  }
  selectLandWaterSupply(waterSupply: KronaRequestLandCommunications) {
    this.$selector_water.selectByAttribute("value", waterSupply);
  }
  selectLandSewerage(sewerage: KronaRequestLandCommunications) {
    this.$selector_sewerage.selectByAttribute("value", sewerage);
  }
  inputLandPrice(landPrice: number) {
    let target = this.$input_landPrice;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(landPrice.toString());
  }
  inputHouseCadastralNumber(houseCadastralNumber: string) {
    let target = this.$input_houseCadastralNumber;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(houseCadastralNumber);
  }
  inputHouseSpace(houseSpace: number) {
    let target = this.$input_houseSpace;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(houseSpace.toString());
  }
  inputHouseBuildDate(houseBuildDate: number) {
    let target = this.$input_buildDate;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(houseBuildDate.toString());
  }
  inputHouseWalls(houseWalls: string) {
    let target = this.$input_houseWalls;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(houseWalls);
  }
  selectHouseElectricity(electricity: KronaRequestHouseCommunications) {
    this.$selectorHouseElectricity.selectByAttribute("value", electricity);
  }
  selectHouseHeating(heating: KronaRequestHouseCommunications) {
    this.$selectorHouseHeating.selectByAttribute("value", heating);
  }
  selectHouseWaterSupply(waterSupply: KronaRequestHouseCommunications) {
    this.$selectorHouseWaterSupply.selectByAttribute("value", waterSupply);
  }
  selectHouseSewerage(sewerage: KronaRequestHouseCommunications) {
    this.$selectorHouseSewerage.selectByAttribute("value", sewerage);
  }
  selectHouseRepairState(houseRepairState: KronaRequestsQualifiedRepairsState) {
    switch (houseRepairState) {
      case KronaRequestsQualifiedRepairsState.WITHOUT_REPAIRS:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.NEEDS_CAPITAL
        );
        break;
      case KronaRequestsQualifiedRepairsState.PREPARED:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.NEEDS_CAPITAL
        );
        break;
      case KronaRequestsQualifiedRepairsState.SIMPLE:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.NEEDS_COSMETIC
        );
        break;
      case KronaRequestsQualifiedRepairsState.GOOD:
        this.$selectorHouseRepairs.selectByAttribute("value", KronaRequestsOldRepairsState.GOOD);
        break;
      case KronaRequestsQualifiedRepairsState.EURO:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.EXCELLENT
        );
        break;
      case KronaRequestsQualifiedRepairsState.EXCELLENT:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.EXCELLENT
        );
        break;
      default:
        this.$selectorHouseRepairs.selectByAttribute(
          "value",
          KronaRequestsOldRepairsState.NEEDS_CAPITAL
        );
        break;
    }
  }
  inputTotalPrice(totalPrice: number) {
    let target = this.$input_totalPrice;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(totalPrice.toString());
  }
  inputHousePrice(housePrice: number) {
    let target = this.$input_housePrice;
    target.scrollIntoView();
    target.clearValue();
    target.setValue(housePrice.toString());
  }
  inputCustomField(text: string, fieldNum: number) {
    debugLogging(`Заполняем кастомное поле №${fieldNum}`);
    let target: WebdriverIO.Element = this[`$input_customField${fieldNum}`];
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Кастомное поле №${fieldNum} не кликабельно!`,
    });
    target.setValue(text);
    browser.waitUntil(() => target.getValue() === text, {
      timeoutMsg: `В кастомное поле №${fieldNum} должно было засетиться значение = ${text}.
        А по факту там значение = ${target.getValue()}`,
    });
    debugLogging(`В кастомное поле №${fieldNum} засетили значение = ${text}`);
  }
  /**
   * Функция прикладывания фоток к запросам по типам
   * Земля | Земля с домом | Таунхаус с землёй
   *
   * @param filePath ссылка на тестовый файл.
   * Все базовые типы файлов можно найти в директории `./src/test_files`
   */
  inputFile(filePath: string) {
    // let uploadedFilePath = browser.uploadFile(`./src/test_files/test.jpg`);
    let uploadedFilePath = browser.uploadFile(filePath);
    this.$input_fileInput.setValue(uploadedFilePath);
    this.$loadedFile_fileSize.waitForDisplayed({ timeout: 5000 });
    // this.$loadedFileThumbnail.waitForExist({timeout: 5000, reverse: false});
    browser.pause(2000);
  }
  /**
   * Функция ожидания ответа валюатора при расчёте объектов типа `Квартира | Апартаменты Вторичка`
   *
   * @returns ValuationResultData либо `null`
   * @param realtyType тип недвижимости
   * @param requestedResult тип данных ответа валюатора которые необходимо получить
   */
  valuationResult(
    realtyType: RealtyType,
    requestedResult?: ValuationResultData,
    customTimeout?: number
  ): string {
    if (this.$button_buttonSend.isEnabled()) {
      this.$button_buttonSend.scrollIntoView();
      this.$button_buttonSend.click();
      this.$button_buttonSend.waitForClickable({
        timeout: 30000,
        timeoutMsg: `Кнопка "Рассчитать стоимость" должна была стать НЕ кликабельной. Робот долго считает.`,
        reverse: true,
      });
    }
    this.$valuationResult_root.waitForExist({
      timeout: customTimeout ? customTimeout : 60000,
      timeoutMsg: `Робот считает слишком долго. Дольше ${
        customTimeout ? customTimeout / 1000 : 60
      } секунд.`,
    });
    if (realtyType === RealtyType.FLAT || realtyType === RealtyType.APARTMENT) {
      this.$valuationResult_root.waitForDisplayed({
        timeoutMsg: `Блок "Результат расчета" не отображается на экране. Робот слишком долго считает`,
      });

      if (requestedResult !== null && requestedResult === ValuationResultData.PRICE)
        return this.$valuationResult_Price.$(`span`).getText();
      else if (requestedResult !== null && requestedResult === ValuationResultData.DEVIATION)
        return this.$valuationResult_Deviation.$(`span`).getText();
      else if (requestedResult !== null && requestedResult === ValuationResultData.STATUS)
        return this.$valuationResult_Status.$(`span`).getText();
    } else {
      this.$valuationResult_Status.waitForDisplayed({
        timeout: 30000,
        timeoutMsg: `Статус расчёта не отрисовался за 30 сек.`,
      });
      return this.$valuationResult_Status.$(`span`).getText();
    }

    return "";
  }

  /** Получить id rfv из верстки страницы после того, как робот закончил расчет */
  getRfvId() {
    this.$valuationResult_valuationResult.waitForDisplayed({
      timeoutMsg: `Результаты расчета не отображаются на экране. \n 
      Робот не смог посчитать стоимость и из-за этого не получится узнать ID запроса.`,
    });
    let href = $(`//div[@id='valuationResult']//ul//a`).getAttribute("href");
    let rfvId = getIdFromUrl(href);
    debugLogging(`Результат от робота получен. rfvId = ${rfvId}`);
    return rfvId;
  }

  sendResult() {
    this.$button_buttonSend.waitForClickable({
      timeoutMsg: `Кнопка "Рассчитать стоимость" не кликабельна`,
    });
    this.$button_buttonSend.click();
    this.$button_buttonSend.scrollIntoView({ inline: "end", block: "end" });

    debugLogging(`Нажал кнопку "Рассчитать стоимость"`);
  }

  // getFieldData(field) {

  //   return this.$selector_walls.getText();
  // }
}
