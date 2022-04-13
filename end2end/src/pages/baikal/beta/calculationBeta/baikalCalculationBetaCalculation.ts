import {
  BaikalEnumPresenceFurniture,
  BaikalEnumRepairs,
  BaikalEnumWallMaterial,
  EnumKeyboardButtons,
} from "../../enums";
import { BaikalCalculationBetaBase } from "./baikalCalculationBetaBase";
import { difference } from "lodash";
import { debugLogging } from "modules";

/** Класс описывает вкладку "Расчетник сравнительный" из раздела "Расчетник". */
export class BaikalCalculationBetaCalculation extends BaikalCalculationBetaBase {
  /** Таблица расчетника */
  get $calculation_table(): WebdriverIO.Element {
    return this.$calculationWrap.$(`.//table[contains(@class, 'Calculation_table')]`);
  }
  /** Строка "Характеристики" */
  get $specifications(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@data-rbd-droppable-id='SORT_ANALOGS']`);
  }
  /** Строка "Объявление" */
  get $advertisement(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:1']`);
  }
  /** Строка "Цена предложения" */
  get $offer_price(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:3']`);
  }
  /** Строка "Адрес" */
  get $address(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:5']`);
  }
  /** Ячейка с номером дома */
  get $house_number(): WebdriverIO.Element {
    return this.$address.$(`.//input[contains(@class, 'ant-input-disabled')]`);
  }
  /** Строка "Корректировка на торг" */
  get $bidAdjustment(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:8']`);
  }
  /** Строка "Дом" в расчетнике */
  get $house(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:9']`);
  }
  /** Строка "Год постройки" в расчетнике */
  get $house_built_year(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:10']`);
  }
  /** Строка "Этажность дома (секции)" в расчетнике */
  get $storeys(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:11']`);
  }
  /** Строка "Этаж расположения" в расчетнике */
  get $floor(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:12']`);
  }
  /** Строка "Количество комнат" в расчетнике */
  get $rooms(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:13']`);
  }
  /** Строка "Состояние квартиры/ремонты" */
  get $repairs(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:14']`);
  }
  /** Строка "С учетом летних помещений, м^2 */
  get $square_including_summer(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:15']`);
  }
  /** Строка "Без учета летних помещений, м^2 */
  get $square_excluding_summer(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:16']`);
  }
  /** Строка "Жилая площадь, м^2 */
  get $square_living(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:18']`);
  }
  /** Строка "Площадь кухни, м^2 */
  get $kitchen_square(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:19']`);
  }
  /** Строка "Наличие мебели и бытовой техники" */
  get $presence_of_furniture(): WebdriverIO.Element {
    return this.$calculation_table.$(`.//tr[@id='0:1:20']`);
  }

  //-------------------------------------------------Методы--------------------------------------------------------

  /** Отключить аналог */
  disableAnalog(analog_number: number) {
    let target = this.$specifications.$(`//input[@id='0:1:0:${analog_number + 3}:0']/..`);
    target.scrollIntoView();
    browser.waitUntil(() => target.getAttribute(`class`).match(`ant-checkbox-checked`) !== null, {
      interval: 1000,
      timeout: 10000,
      timeoutMsg: `Аналога №${analog_number} выключен, хотя должен быть включен`,
    });
    target.waitForClickable({
      timeout: 10000,
      timeoutMsg: `У аналога №${analog_number} не кликабелен чек-бокс отключения`,
    });
    target.click();
    browser.waitUntil(() => target.getAttribute(`class`).match(`ant-checkbox-checked`) === null, {
      interval: 1000,
      timeout: 10000,
      timeoutMsg: `Аналога №${analog_number} включен, хотя должен быть выключен`,
    });
    // this.calculationLoad();
  }

  /** Заполнить "Оригинальный источник объявления" */
  inputOriginalAdSource(analog_number: number, ad_source: string) {
    let target: WebdriverIO.Element;

    target = this.$advertisement.$(`.//textarea[@id='0:1:1:${analog_number + 3}:0']`);
    target.scrollIntoView();
    target.waitForClickable({
      timeout: 5000,
      timeoutMsg: `У аналога №${analog_number} поле "Оригинальный источник объявления" не кликабельно`,
    });
    target.click();
    debugLogging(
      `Кликнул по полю "Оригинальный источник объявления"`,
      "baikal.inputOriginalAdSource"
    );
    target.setValue(ad_source);
    debugLogging(
      `У аналога №${analog_number} в поле "Оригинальный источник объявления" заполнилось значение = ${ad_source}`,
      "baikal.inputOriginalAdSource"
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === ad_source, {
      interval: 1000,
      timeout: 10000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Оригинальный источник объявления" значение не верное. \т
        Должно быть:${ad_source}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить цену предложения */
  inputOfferPrice(analog_number: number, price: string) {
    let target: WebdriverIO.Element;
    target = this.$offer_price.$(`.//textarea[@id='0:1:3:${analog_number + 2}:0']`);
    let pricePerMeter = browser.$(
      `//div[@id='0:1:4:${analog_number + 2}:0'][contains(@class,'Calculation_text')]`
    );
    try {
      target.waitForClickable({
        timeout: 10000,
        timeoutMsg: `У аналога №${analog_number} поле "Цена предложения, ₽" не кликабельно`,
      });
      target.click();
      browser.keys(["Ctrl", "a"]);
      browser.keys("Delete");
      target.clearValue();
      target.setValue(price);

      browser.pause(1000);
      browser.waitUntil(
        () => parseInt(target.getText()) === parseInt(price) && pricePerMeter.getText() !== null,
        {
          interval: 1000,
          timeout: 10000,
          timeoutMsg: `Для аналога №${analog_number} в поле "Цена предложения, ₽" значение не верное.
            Должно быть:${price}, а по факту:${target.getText()}`,
        }
      );
    } catch (e) {
      debugLogging(`Не удалось заполнить цену нормально. \n Заполняем по дебильному.`);

      if (target.getText().length === 0) {
        debugLogging(`Очищаю поле цены у аналога №${analog_number}`, "baikal.inputOfferPrice");
        target.clearValue();
      } else {
        while (target.getText().length > 0) {
          // Иногда в поле остается знак минус "-" и с помощью clearValue он не стирается. Поэтому пользуемся BACKSPACE
          debugLogging(
            `Удаляем цену с помощью нажатий клавиш ARROW_RIGHT + BACKSPACE. Значение в ячейке = ${target.getText()}`
          );
          browser.keys(EnumKeyboardButtons.ARROW_RIGHT);
          browser.keys(EnumKeyboardButtons.BACKSPACE);
        }
        target.clearValue();
        // this.calculationLoad();
      }
      browser.waitUntil(() => target.getText().length === 0, {
        interval: 1000,
        timeout: 10000,
        timeoutMsg: `После очистки поля в нем удалились не все символы. Текущее значение поля = ${target.getText()}`,
      });
      target.click();
      debugLogging(`Устанавливаю аналогу №${analog_number} цену = ${price}`);
      target.setValue(price);
      // this.calculationLoad();
      browser.pause(1500);

      // Эту конструкцию можно раскомментировать если в расчетнике появляется ошибка "Не удалось загрузить объект".
      // С помощью этого кода происходит посимвольный ввод цены.
      // Если после ввода символа появляется оповещение с текстом "Не удалось загрузить объект",
      // то поле очищается и значения вводятся заново.
      //

      /* let i = 0;
      while (i < price.length) {
        target.addValue(price[i]);
        // this.calculationLoad();
        if (baikalNotitficationBeta.$notification.isDisplayed()) {
          if (baikalNotitficationBeta.$message == "Не удалось загрузить объект") {
            target.clearValue();
            debugLogging(`У аналога №${analog_number} очищено поле "Цена предложения, ₽",
            т.к. появилась ошибка "Не удалось загрузить объект"`);
            baikalNotitficationBeta.close();
            debugLogging(`Закрыто всплывающее окно "Не удалось загрузить объект"`);
            i = 0;
          }
        }
        // Если цена введена до конца, то проверить, что она верная
        else if (i + 1 == price.length) {
          debugLogging(`Для аналога №${analog_number} после ввода чисел в поле "Цена предложения, ₽"
            фактическое значение цены в поле = ${target.getText()}. Ожидаемое = ${price}`);
          try {
            browser.waitUntil(() =>
              target.getText() == price,
              {
                timeoutMsg: `У аналога №${analog_number} цена не совпадает с ожидаемой.
            Очистка значения в поле "Цена предложения, ₽" и ввод цены заново`
              })
            i++;
          } catch (e) {
            target.clearValue();
            debugLogging(`У аналога №${analog_number} цена не совпадает с ожидаемой.
            Очистка значения в поле "Цена предложения, ₽" и ввод цены заново`);
            i = 0;
          }
        } else {
          i++;
        }
      } */

      browser.waitUntil(
        () => parseInt(target.getText()) === parseInt(price) && pricePerMeter.getText() !== null,
        {
          interval: 1000,
          timeout: 10000,
          timeoutMsg: `Для аналога №${analog_number} в поле "Цена предложения, ₽" значение не верное.
            Должно быть:${price}, а по факту:${target.getText()}`,
        }
      );
      debugLogging(`У аналога №${analog_number} цена верная!`);
    }
  }

  /** Перевыбрать Адрес */
  reselectAddress(analog_number: number) {
    let targetHouseNumberValue: WebdriverIO.Element;
    targetHouseNumberValue = browser.$(
      `//div[@id='0:1:5:${2 + 2 * analog_number}']//input[@disabled]`
    );
    if (targetHouseNumberValue.getValue().length < 1) {
      let targetAddress: WebdriverIO.Element;
      targetAddress = browser.$(`//div[@id='0:1:5:${2 + 2 * analog_number}']
      //textarea[contains(@class, "Calculation_textarea") and contains (@class, "ant-select-search__field")]`);

      debugLogging(`У аналога №${analog_number} поле с номером дома пустое. Засетим в поле с адресом заранее
      подготовленное значение.`);

      targetAddress.waitForClickable();
      targetAddress.click();
      browser.elementClear(targetAddress.elementId);

      while (targetAddress.getText().length > 0) {
        debugLogging(`Очищаем старый адрес с помощью нажатий клавиши BACKSPACE`);
        targetAddress.click();
        browser.keys(EnumKeyboardButtons.END);
        browser.keys(EnumKeyboardButtons.BACKSPACE);
      }

      try {
        browser.waitUntil(() => targetAddress.getText().length === 0, {
          interval: 1000,
          timeout: 10000,
          timeoutMsg: `После очистки поля с адресом оно должно быть пустым, но сейчас оно не пустое.
                Сейчас значение поля = ${targetAddress.getText()}`,
        });
      } catch (e) {
        this.reselectAddress(analog_number);
      }

      debugLogging(
        `После очистки поля с адресом значение внутри поля = ${targetAddress.getText()}`
      );
      debugLogging(`Заполняем адрес заранее подготовленным`);
      let address = `г Москва ул Свободы д 10`;
      targetAddress.setValue(address);
      let listbox = browser.$(`//div[contains(@class,'ant-select-dropdown')
      and contains(@class,'Calculation_dropDown') and not(contains(@class,'ant-select-dropdown-hidden'))]//ul`);
      browser.pause(3000); // Ждем ответ от компаса
      try {
        listbox.waitForDisplayed();
      } catch (e) {
        debugLogging(
          `Нажимаем пробел, пытаемся отправить запрос в компас еще раз, чтобы подсказки появились`
        );
        browser.keys(EnumKeyboardButtons.SPACE);
        browser.pause(3000); // Ждем ответ от компаса
      }
      debugLogging(
        `Текст в поле адреса после того, как значение засеттилось = ${targetAddress.getText()}`
      );
      browser.waitUntil(() => targetAddress.getText().trim() === "г Москва ул Свободы д 10", {
        interval: 1000,
        timeout: 10000,
        timeoutMsg: `После ввода в поле "Адрес" заготовленного адреса значение не совпадает с ожидаемым.
            Должно быть = г Москва ул Свободы д 10, а по факту = ${targetAddress.getText()}`,
      }); // Юзаем trim, чтобы убирать пробел, который иногда ставим в конце

      let suggestions = $$(
        `//div[contains(@class,'ant-select-dropdown') and contains(@class,'Calculation_dropDown') and not(contains(@class,'ant-select-dropdown-hidden'))]//ul//li`
      );
      try {
        suggestions[0].waitForDisplayed();
      } catch (e) {
        throw new Error(`После ввода адреса список подсказок не отобразился на экране.`);
      }
      suggestions[0].click();
      browser.waitUntil(() => targetHouseNumberValue.getValue().length > 0, {
        interval: 1000,
        timeout: 10000,
        timeoutMsg: `Для аналога №${analog_number} номер дома не заполнился. Поле не должно быть пустым.
            Сейчас факту:${targetHouseNumberValue.getValue()}`,
      });
    }
  }

  /** Заполнить корректировку на торг */
  inputBidAdjustment(analog_number: number, percent: string) {
    let target = this.$bidAdjustment.$(`.//textarea[@id='0:1:8:${3 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Корректировка на торг, %" не кликабельно`,
    });
    // Для очистки поля: нажатие стрелки вправо и потом backspace (clearValue не работает)
    target.click();
    debugLogging(`Кликнул по полю "Корректировка на торг, %"`);
    browser.keys(EnumKeyboardButtons.ARROW_RIGHT);
    browser.keys(EnumKeyboardButtons.BACKSPACE);
    target.setValue(percent);
    debugLogging(
      `У аналога №${analog_number} в поле "Корректировка на торг, %" заполнилось значение = ${percent}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === percent, {
      interval: 1000,
      timeout: 10000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Корректировка на торг, %" значение не верное.
      Должно быть:${percent}, а по факту:${target.getText()}`,
    });
  }

  /** Выбрать материал стен */
  selectWallMaterial(analog_number: number, material: BaikalEnumWallMaterial) {
    // target - само поле куда кликать
    let target = this.$house.$(
      `.//td/div[@id='0:1:9:${2 + 2 * analog_number}']/div[contains(@class, 'nodeSelectControl')]`
    );
    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Dropdown меню с полем "Материал стен" не кликабельно`,
    });
    target.click();
    debugLogging(`Кликнул по выпадающему меню "Материал стен"`);

    // target2 - элемент, в котором можно проверить, что выпадающее меню открылось
    let target2 = this.$house.$(
      `.//td/div[@id='0:1:9:${2 + 2 * analog_number}']//div[contains(@class, 'nodeSelect__menu')]`
    );

    browser.waitUntil(() => target2.isExisting() !== false, {
      timeoutMsg: `После клика по выпадающему меню с полем "Материал стен" - выпадающее меню не открылось`,
    });

    target2.$(`.//div[text()='${material}']`).click();

    debugLogging(
      `У аналога №${analog_number} в поле "Материал стен" заполнилось значение = ${material}`
    );

    let target3 = target.$(`.//div[contains(@class, 'nodeSelect__single-value')]`);

    // this.calculationLoad();
    browser.waitUntil(() => target3.getText() === material, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Материал стен" значение не верное.
      Должно быть:${material}, а по факту:${target3.getText()}`,
    });
  }

  /** Заполнить год постройки */
  inputHouseBuiltYear(analog_number: number, built_year: string) {
    let target = this.$house_built_year.$(`.//textarea[@id='0:1:10:${analog_number + 2}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Год постройки" не кликабельно`,
    });
    target.setValue(built_year);
    debugLogging(
      `У аналога №${analog_number} в поле "Год постройки" заполнилось значение = ${built_year}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === built_year, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Год постройки" значение не верное.
      Должно быть:${built_year}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить этажность дома (секции) */
  inputStoreys(analog_number: number, storeys: string) {
    let target = this.$storeys.$(`.//textarea[@id='0:1:11:${2 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле Этажность дома (секции) не кликабельно`,
    });
    target.setValue(storeys);
    debugLogging(
      `У аналога №${analog_number} в поле "Этажность дома (секции)" заполнилось значение = ${storeys}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === storeys, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Этажность дома (секции)" значение не верное.
      Должно быть:${storeys}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить этаж расположения */
  inputFloor(analog_number: number, floor: string) {
    let target = this.$floor.$(`.//textarea[@id='0:1:12:${1 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Этаж(-и) расположения" не кликабельно`,
    });
    target.setValue(floor);
    debugLogging(
      `У аналога №${analog_number} в поле "Этаж(-и) расположения" заполнилось значение = ${floor}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === floor, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Этаж(-и) расположения" значение не верное.
      Должно быть:${floor}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить количество комнат */
  inputRooms(analog_number: number, rooms: string) {
    let target = this.$rooms.$(`.//textarea[@id='0:1:13:${2 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Количество комнат" не кликабельно`,
    });
    target.setValue(rooms);
    debugLogging(
      `У аналога №${analog_number} в поле "Количество комнат" заполнилось значение = ${rooms}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === rooms, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Количество комнат" значение не верное.
      Должно быть:${rooms}, а по факту:${target.getText()}`,
    });
  }

  /** Выбрать состояние отделки */
  selectRepairs(analog_number: number, repairs: BaikalEnumRepairs) {
    // target - само поле куда кликать
    let target = this.$repairs.$(
      `.//td/div[@id='0:1:14:${2 + 2 * analog_number}']/div[contains(@class, 'nodeSelectControl')]`
    );
    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Dropdown меню с полем "Состояние квартиры / ремонты" не кликабельно`,
    });
    target.click();
    debugLogging(`Кликнул по выпадающему меню "Состояние квартиры / ремонты"`);

    // target2 - элемент, в котором можно проверить, что выпадающее меню открылось
    let target2 = this.$repairs.$(
      `.//td/div[@id='0:1:14:${2 + 2 * analog_number}']//div[contains(@class, 'nodeSelect__menu')]`
    );
    browser.waitUntil(() => target2.isExisting() !== false, {
      timeoutMsg: `После клика по выпадающему меню у поля "Состояние квартиры / ремонты" - выпадающее меню не открылось`,
    });
    target2.$(`.//div[text()='${repairs}']`).click();
    debugLogging(
      `У аналога №${analog_number} в поле "Состояние квартиры / ремонты" заполнилось значение = ${repairs}`
    );

    let target3 = target.$(`.//div[contains(@class, 'nodeSelect__single-value')]`);

    // this.calculationLoad();
    browser.waitUntil(() => target3.getText() === repairs, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Состояние квартиры / ремонты" значение не верное.
      Должно быть:${repairs}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить площадь с учетом летних помещений */
  inputSquareIncludingSummer(analog_number: number, square: string) {
    let target = this.$square_including_summer.$(
      `.//textarea[@id='0:1:15:${2 + 2 * analog_number}:0']`
    );
    target.waitForClickable({
      timeoutMsg: `Поле "С учетом летних помещений, м^2" не кликабельно`,
    });
    target.setValue(square);
    debugLogging(
      `У аналога №${analog_number} в поле "С учетом летних помещений, м^2" заполнилось значение = ${square}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === square, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "С учетом летних помещений, м^2" значение не верное.
      Должно быть:${square}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить площадь без учета летних помещений */
  inputSquareExcludingSummer(analog_number: number, square: string) {
    let target = this.$square_excluding_summer.$(
      `.//textarea[@id='0:1:16:${1 + 2 * analog_number}:0']`
    );
    target.waitForClickable({
      timeoutMsg: `Поле "Без учета летних помещений, м^2" не кликабельно`,
    });
    target.setValue(square);
    debugLogging(
      `У аналога №${analog_number} в поле "Без учета летних помещений, м^2" заполнилось значение = ${square}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === square, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Без учета летних помещений, м^2" значение не верное.
      Должно быть:${square}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить жилую площадь */
  inputLivingSquare(analog_number: number, square: string) {
    let target = this.$square_living.$(`.//textarea[@id='0:1:18:${1 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Жилая площадь, м^2" не кликабельно`,
    });
    target.setValue(square);
    debugLogging(
      `У аналога №${analog_number} в поле "Жилая площадь, м^2" заполнилось значение = ${square}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === square, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Жилая площадь, м^2" значение не верное.
      Должно быть:${square}, а по факту:${target.getText()}`,
    });
  }

  /** Заполнить площадь кухни */
  inputKitchenSquare(analog_number: number, square: string) {
    let target = this.$kitchen_square.$(`.//textarea[@id='0:1:19:${1 + 2 * analog_number}:0']`);
    target.waitForClickable({
      timeoutMsg: `Поле "Площадь кухни, м^2" не кликабельно`,
    });
    target.setValue(square);
    debugLogging(
      `У аналога №${analog_number} в поле "Площадь кухни, м^2" заполнилось значение = ${square}`
    );
    // this.calculationLoad();
    browser.waitUntil(() => target.getText() === square, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Площадь кухни, м^2" значение не верное.
      Должно быть:${square}, а по факту:${target.getText()}`,
    });
  }

  /** Выбрать наличие/отсутствие мебели и бытовой техники */
  selectFurniture(analog_number: number, furniture: BaikalEnumPresenceFurniture) {
    // target - само поле куда кликать
    let target = this.$presence_of_furniture.$(
      `.//td/div[@id='0:1:20:${1 + analog_number * 2}']/div[contains(@class, 'nodeSelectControl')]`
    );
    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Dropdown меню с выбором материала стен не кликабельно`,
    });
    target.click();
    debugLogging(`Кликнул по выпадающему меню "Наличие мебели и бытовой техники"`);

    // target2 - элемент, в котором можно проверить, что выпадающее меню открылось
    let target2 = this.$presence_of_furniture.$(
      `.//td/div[@id='0:1:20:${1 + analog_number * 2}']//div[contains(@class, 'nodeSelect__menu')]`
    );
    browser.waitUntil(() => target2.isExisting() !== false, {
      timeoutMsg: `После клика по выпадающему меню с выбором материала стен - выпадающее меню не открылось`,
    });
    target2.$(`.//div[text()='${furniture}']`).click();

    debugLogging(
      `У аналога №${analog_number} в поле "Наличие мебели и бытовой техники" заполнилось значение = ${furniture}`
    );

    let target3 = target.$(`.//div[contains(@class, 'nodeSelect__single-value')]`);

    // this.calculationLoad();
    browser.waitUntil(() => target3.getText() === furniture, {
      timeout: 3000,
      timeoutMsg: `Для аналога №${analog_number} в поле "Наличие мебели и бытовой техники" значение не верное.
      Должно быть:${furniture}, а по факту:${target.getText()}`,
    });
  }

  //------------------------------------- Получение значений из ячеек расчетника ---------------------------------------

  getValueOfOfferPrice(analog_number: number) {
    return this.$offer_price.$(`.//textarea[@id='0:1:3:${analog_number + 2}:0']`).getValue();
  }

  getValueOfAddress(analog_number: number) {
    return browser
      .$(
        `//div[@id='0:1:5:${2 + 2 * analog_number}']
    //textarea[contains(@class, "Calculation_textarea") and contains (@class, "ant-select-search__field")]`
      )
      .getValue();
  }

  getValueOfHouseNumber(analog_number: number) {
    return browser.$(`//div[@id='0:1:5:${2 + 2 * analog_number}']//input[@disabled]`).getValue();
  }

  getValueOfBidAdjustment(analog_number: number) {
    return this.$bidAdjustment.$(`.//textarea[@id='0:1:8:${3 + 2 * analog_number}:0']`).getValue();
  }

  getValueOfWallMaterial(analog_number: number) {
    return this.$house
      .$(
        `.//td/div[@id='0:1:9:${
          2 + 2 * analog_number
        }']/div[contains(@class, 'nodeSelectControl')]//div[contains(@class,'single-value')]`
      )
      .getText();
  }

  getValueOfHouseBuiltYear(analog_number: number) {
    return this.$house_built_year.$(`.//textarea[@id='0:1:10:${analog_number + 2}:0']`).getValue();
  }

  getValueOfStoreys(analog_number: number) {
    return this.$storeys.$(`.//textarea[@id='0:1:11:${2 + 2 * analog_number}:0']`).getValue();
  }

  getValueOfFloor(analog_number: number) {
    return this.$floor.$(`.//textarea[@id='0:1:12:${1 + 2 * analog_number}:0']`).getValue();
  }

  getValueOfRooms(analog_number: number) {
    return this.$rooms.$(`.//textarea[@id='0:1:13:${2 + 2 * analog_number}:0']`).getValue();
  }

  getValueOfRepairs(analog_number: number) {
    return this.$repairs
      .$(
        `.//td/div[@id='0:1:14:${
          2 + 2 * analog_number
        }']/div[contains(@class, 'nodeSelectControl')]//div[contains(@class,'single-value')]`
      )
      .getText();
  }

  getValueOfSquareIncludingSummer(analog_number: number) {
    return this.$square_including_summer
      .$(`.//textarea[@id='0:1:15:${2 + 2 * analog_number}:0']`)
      .getValue();
  }

  getValueOfSquareExcludingSummer(analog_number: number) {
    return this.$square_excluding_summer
      .$(`.//textarea[@id='0:1:16:${1 + 2 * analog_number}:0']`)
      .getValue();
  }

  getValueOfLivingSquare(analog_number: number) {
    return this.$square_living.$(`.//textarea[@id='0:1:18:${1 + 2 * analog_number}:0']`).getValue();
  }
  getValueOfAdSource(analog_number: number) {
    return this.$advertisement.$(`.//textarea[@id='0:1:1:${analog_number + 3}:0']`).getText();
  }

  getValueOfKitchenSquare(analog_number: number) {
    return this.$kitchen_square
      .$(`.//textarea[@id='0:1:19:${1 + 2 * analog_number}:0']`)
      .getValue();
  }

  getValueOfFurniture(analog_number: number) {
    return this.$presence_of_furniture
      .$(
        `.//td/div[@id='0:1:20:${
          1 + analog_number * 2
        }']/div[contains(@class, 'nodeSelectControl')]//div[contains(@class,'single-value')]`
      )
      .getText();
  }

  //--------------------------------------------------------------------------------------------------------------------

  collectValues(number_of_comparables: number) {
    let values: Array<any> = [];
    for (let i = 1; i < number_of_comparables + 1; i++) {
      values.push(this.getValueOfOfferPrice(i).toString().trim());
      values.push(this.getValueOfAddress(i).toString().trim());
      values.push(this.getValueOfHouseNumber(i).toString().trim());
      values.push(this.getValueOfBidAdjustment(i).toString().trim());
      values.push(this.getValueOfWallMaterial(i).toString().trim());
      values.push(this.getValueOfHouseBuiltYear(i).toString().trim());
      values.push(this.getValueOfStoreys(i).toString().trim());
      values.push(this.getValueOfFloor(i).toString().trim());
      values.push(this.getValueOfRooms(i).toString().trim());
      values.push(this.getValueOfRepairs(i).toString().trim());
      values.push(this.getValueOfSquareIncludingSummer(i).toString().trim());
      values.push(this.getValueOfSquareExcludingSummer(i).toString().trim());
      values.push(this.getValueOfLivingSquare(i).toString().trim());
      values.push(this.getValueOfKitchenSquare(i).toString().trim());
      values.push(this.getValueOfFurniture(i).toString().trim());
    }
    debugLogging(`Данные со всех аналогов собраны. Массив с собранными данными = ${values}`);
    return values;
  }

  /**
   *
   * @param number_of_comparables
   * @deprecated - не надо такое использовать, все проверки должны быть прямо в тесте
   *
   */
  refreshPageAndCheckValues(number_of_comparables: number) {
    debugLogging(`Собираем данные ДО обновления страницы`);
    let array_before_refresh =
      baikalCalculationBetaCalculation.collectValues(number_of_comparables);
    debugLogging(`Обновляем страницу`);
    browser.refresh();
    debugLogging(`Ждем загрузку страницы после обновления`);
    this.waitForLoad();
    debugLogging(`Собираем данные ПОСЛЕ обновления страницы`);
    let array_after_refresh = baikalCalculationBetaCalculation.collectValues(number_of_comparables);
    let diff = difference(array_before_refresh, array_after_refresh);
    if (diff.length > 0) {
      throw new Error(`Данные до и после обновления страницы не совпадают. Разница = ${diff}`);
    }
    debugLogging(`Значения расчетника ДО и ПОСЛЕ обновления страницы совпадают`);
  }

  calculationLoad() {
    this.$loader.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `При изменении расчетника не появился лоадер`,
    });
    this.$loader.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `Расчетник долго пересчитывает, лоадер не пропадает`,
      reverse: true,
    });
  }
}

export const baikalCalculationBetaCalculation = new BaikalCalculationBetaCalculation();
