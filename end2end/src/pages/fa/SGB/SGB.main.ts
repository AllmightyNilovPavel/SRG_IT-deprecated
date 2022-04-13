import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";
import { TestDataPaySystems } from "../../../options/testData/paySystems";

class SGBOcenka {
  path = `https://severgazbank-ipoteka.srg-test.ru/`;

  /** Заголовок страницы */
  public get $header_title() {
    return browser.$(`div[class*="header"]`);
  }

  /** Кнопка "Оценка недвижимости" */
  public get $button_userCabinet() {
    return browser.$(`#creditOrderLink`);
  }

  /** Кнопка "Личный кабинет" */
  public get $button_userOrderCabinet() {
    return browser.$(`#profileLink`);
  }

  /** Поле ввода логина */
  public get $input_login() {
    return browser.$(`#login`);
  }

  /** поле ввода пароля */
  public get $input_password() {
    return browser.$(`#password`);
  }

  /** кнопка "отправить" */
  public get $button_send() {
    return browser.$(`#authButton`);
  }

  open() {
    browser.url(FaHostNameResolver(SiteList.SGB));
  }

  /** Функция ввода Логина */
  input_login(phone: string[]) {
    this.$input_login.waitForDisplayed({ timeout: 1000 });
    this.$input_login.waitForClickable();
    this.$input_login.click();
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }

  /** Кнопка Заказать */
  public get $button_Order() {
    return browser.$("#makeNewOrderLink");
  }

  /** Кнопка "Новый кредит" */
  public get $button_NewCredit() {
    return browser.$("//label[@for='mortgage']");
  }

  /** Кнопка "Тип ОО Квартира" */
  public get $button_Flat() {
    return browser.$("//label[@for='resale']");
  }

  /** Кнопка "Состояние отделки - с отделкой" */
  public get $button_Finishing() {
    return browser.$("//label[@for='objectWithoutRepairs']");
  }

  /** Поле ввода Города */
  public get $input_City() {
    return browser.$("//input[@id='regionSelect']");
  }

  /** Заполнение поля Города */
  public get $button_AutoCity() {
    return browser.$("//div[@class='Autocomplete_item__2Zh4w']");
  }

  /** Поле ввода Улицы */
  public get $input_Street() {
    return browser.$("#street");
  }

  /** Заполнение поля Улица */
  //public get $button_AutoStreet() {
  // return browser.$("//div[@class='Autocomplete_item__2Zh4w']");

  /** Поле ввода Квартиры */
  public get $input_Flat() {
    return browser.$("#flatNumber");
  }

  /** Кнопка ожидаемой стоимости "Нет" < 3млн */
  public get $button_SmalPrice() {
    return browser.$("//label[@for='creditAmountLessLimit']");
  }

  /** Кнопка согласия с СП "Самоосмотр" */
  public get $button_Yes() {
    return browser.$("//label[@for='agreeWithSpecialOffer']");
  }

  /** Кнопка приступить к заполнению заказа "Заказать" */
  public get $button_To_order() {
    return browser.$("#makeOrder");
  }

  /** Оформлен в собственность "да" */
  public get $button_YesOwn() {
    return browser.$("//label[@for='ownership']");
  }

  /** Самостоятельный ввод адреса */
  public get $button_InputAddress() {
    return browser.$("//label[@for='inputManual']");
  }

  /** Поле тестового отделения */
  public get $button_FieldBranch() {
    return browser.$("//div[@id='serviceOfficeSelect']");
  }

  /** Выбор тестового отделения */
  public get $button_Branch() {
    return browser.$("//div[@role='option']");
  }

  /** Заказчик и заемщик одно лицо */
  public get $button_borrower() {
    return browser.$("//label[@for='borrowerAsCustomer']");
  }

  /** Согласие с Договором Оферты,условиями оценки,условиями обработки и использования моих персональных данных/ */
  public get $button_contracts() {
    return browser.$("//div[@class='ui fitted checkbox']");
  }

  /** Согласие с Условиями оценки */
  //public get $button_contracts2() {
  // return browser.$('#agreeWithAppraisalTerms')

  /** Согласие с contract 3 */
  //public get $button_contracts3() {
  // return browser.$('#agreeWithPersonalDataProcessing')

  /** кнопка далее */
  public get $button_Next() {
    return browser.$("#actionNextButton");
  }

  /** Выбор типа оплаты "Карта" */
  public get $input_PayCard() {
    return browser.$("//div[@class='field Order_paymentCheckbox_3y6ho']");
  }

  /** Кнопка "Оплатить картой */
  public get $button_PayCard() {
    return browser.$("#payByCardModal");
  }

  /** Согласие на обработку данных перед оплатой */
  public get $button_Soglasen() {
    return browser.$("//label[@for='agreeWithValidData']");
  }
  /** Кнопка "Оплатить и отправить Заказ" */
  public get $button_GoOK() {
    return browser.$("#actionPayByCard");
  }

  /** Кнопка "В личный кабинет" (появляется после успешно  оплаты заказа) */
  public get $Back_Personal_Area() {
    return browser.$("//a[@id='backToPersonalAccount']");
  }
}
/** Сайт SGB */
export const sgbOcenka = new SGBOcenka();
