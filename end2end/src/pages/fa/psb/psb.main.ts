import { SiteList } from "../enum/fa.enum.siteList";
import { FaHostNameResolver } from "../modules/fa.module.hostNameResolver";
import {FA_RoomsType, FaOrderPaymentType} from "../enum";
import {browserCloseWindow} from "../../../modules/supportMethodsForBrowserTabs";
import { TestDataFa } from "options/testData/fa";

class PsbOcenka {
  prefix = `psb`;
  path = `psb-ocenka.srg-it.ru`;

  public get $HeaderTitle() {
    return browser.$(`div[class*="header"]`);
  }

  public get $ButtonUserCabinet() {
    return browser.$(`a[href="/credit/order/"]`);
  }

  public get $InputLogin() {
    return browser.$(`#login`);
  }

  public get $ButtonSend() {
    return browser.$(
      `div[class*="AuthLiteMortgage_actions"] > button[class*="AuthLiteMortgage_authButton"]`
    );
  }
  /////////////////////////////////////Список Заказов///////////////////////////////////////

  /** Кнопка Заказать в списке заказов */
  public get $ButtonNewOrder() {
    return browser.$("//a[@id='makeNewOrderLink']");
  }

  /** Таблица списка заказов по новому кредиту*/
  public get $ButtonTableCredit() {
    return browser.$("//a[@id='showCreditTab']");
  }

  /** Таблица списка заказов по Рефинансированию*/
  public get $ButtonTableRefin() {
    return browser.$("//a[@id='showRefinanceTab']");
  }

  /** Кнопка отображающая список заказов в работе*/
  public get $ButtonTableInWorkOrder() {
    return browser.$("//span[contains(text(),'В работе оценочной компании')]");
  }

  /** Номера заказов */
  public get $NumerOrder() {
    return browser.$("//td[@class='OrderList_idCell_2fhVW']")
  }


  ////////////////////////////////////Список продуктов//////////////////////////////////////

  /** Кнопка выбора военной ипотеки */
  public get $MilitaryMortgage() {
    return browser.$("//div[@role='listbox']");
  }
  // новый кредит для военной ипотеки
  public get $MilitaryNewCredit() {
    return browser.$("//a[@id='milCreditLink']");
  }
  // Рефин для военной ипотеки
  public get $MilitaryRefin() {
    return browser.$("//a[@id='milRefinanceLink']");
  }

  /** Кнопка выбора нового кредита */
  public get $ButtonNewcredit() {
    return browser.$("//a[@id='creditLink']");
  }

  /** Кнопка выбора кредита Рефинансирование */
  public get $RefinCredit() {
    return browser.$('#refinanceLink');
  }

  /** Кнопка выбора кредита Титул */
  public get $ButtonTittleСredit() {
    return browser.$('#titleLink');
  }

  ////////////////1-ый этап формирования заказа////////////

  /** Кнопка Продавец объекта недвижимости */
  public get $InputTypeIndividual() {
    return browser.$("//label[@for='sellerTypeIndividual']");
  }

  /** Кнопка Ввода адреса */
  public get $ButtonRegionSelect() {
    return browser.$(`div.Select_root__2yqJb`);
  }

  public get $InputRegion() {
    return browser.$("//input[@class='search']");
  }
  private get $InputAutoComplete() {
    return this.$InputRegion.$("//input[@aria-autocomplete='list']");
  }

  get $Inpute_regionText() {
    return this.$InputRegion.$(`div.text`);
  }
  private  get $ListRegion() {
    return this.$InputRegion.$("//div[@class='visible menu transition']");
  }
  private  get $ListRegionFirst() {
    return this.$ListRegion.$(`div.selected.item`);
  }



  /** Кнопка Заказать */
  public get $OrderButton() {
    return browser.$('#makeOnlineOrderButton');
  }
////////////////Карточка заказа ////////////

  ///Оформление заказа

  /** Тип Объекта Квартира */
  public get $LabelResale() {
    return browser.$("//label[@for='resaleOrNewbuilding']");
  }

  /** Тип Объекта Апартаменты */
  public get $LabelApartments() {
    return browser.$("//label[@for='apartments']");
  }

  /** Кнопка Право собственности */
  public get $LabelOwnershipYes() {
    return browser.$("//label[@for='ownership']");
  }
  public get $LabelOwnershipNot() {
    return browser.$("//label[@for='notOwnership']");
  }

  /** Поле ввода Региона, города */
  public get $inputRegion() {
    return browser.$(`#regionSettlementCitySelect`);
  }


  /** Поле ввода улицы */
  public get $InputStreet() {
    return browser.$(`#streetSelect`);
  }

  /** Автовыбор улицы */
  public get $InputFirstStreet() {
    return browser.$("//div[@class='Autocomplete_item__2Zh4w']");
  }
  
  /** Самостоятельный ввод адреса улицы */
  public get $InputManualAddress() {
    return browser.$("//label[@for='inputManual']");
  }

  


  /** Поле ввода Квартиры */
  public get $InputFlat() {
    return browser.$(` #flatNumber`);
  }

  /** Кол-во комнат */
  public get $InputRooms() {
    return browser.$(` #objectRooms`);
  }
  private get $$ObjectRoomsValues() {
    return this.$InputRooms.$$(`div > div.item`);
  }

  /** Кнопка "Выбрать ОК" */
  get $ButtonChooseAppraiser() {
    return this.$OrderContent.$(`#chooseButton`);
  }
  /** Окно выбора оценочной компании */
  private get $ModalSelectAppraiserBase() {
    return $(`//div[@id='appraisalModal']`);
  }

  /** Поле выбора отделения Банка */
  public get $InputBank() {
     return browser.$("//div[@id='serviceOfficeSelect']//input[@type='text']") ;
  }


  /** Поле ввода Фамилии заказчика */
  public get $InputSurnameCustomer() {
    return browser.$('customerName_lastName');
  }
  /** Поле ввода имени заказчика */
  public get $InputNameCustomer() {
    return browser.$("//input[@id='customerName_firstName']")
  } 

  /** Поле ввода Отчества заказчика */
  public get $InputPatronymicCustomer() {
    return browser.$("//input[@id='customerName_patronymic']");
  }

  /** Поле Email для отправки сообщений */
  public get $InputСustomerEmail() {
    return browser.$("//input[@id='customerEmail']");
  }

  /** Поле Выбора типа уведомлений */
  //почта
  public get $ButtonEmail() {
    return browser.$("//label[@for='notificationEmail']");
  }
  //СМС
  public get $ButtonSMS() {
    return browser.$("//label[@for='notificationSMS']");
  }

  /** Поле ввода Контакта представителя */
  public get $InputAgentPhone() {
    return browser.$("//input[@id='agentPhone']");
  }


  /** Поле ввода Фамилии заемщика */
  public get $InputSurnameBorrower() {
    return browser.$("//input[@id='borrowerName_lastName']");
  }
  /** Поле ввода имени заемщика */
  public get $InputNameBorrower() {
    return browser.$("//input[@id='borrowerName_lastName']");
  } 

  /** Поле ввода Отчества заемщика */
  public get $InputPatronymicBorrower() {
    return browser.$("//input[@id='borrowerName_patronymic']");
  }

  /** Чек бокс Замщик одно лицо */
  public get $ButtonBorrowerAsCustomer() {
    return browser.$("//label[@for='borrowerAsCustomer']");
  }

   /** Поле ввода Email */
   public get $InputCustomerEmail() {
    return browser.$("//input[@id='customerEmail']");
  }
   /** Чек-бокс выбора нотификации по Email */
   public get $LabelNotificationEmail() {
    return browser.$("//label[@for='notificationEmail']")
  }
   /** Чек-бокс выбора нотификации по СМС */
   public get $LabelNotificationSMS() {
    return browser.$("//label[@for='notificationSMS']")
  }

  /** Поле ввода даты осмотра */
  public get $InputInspectionDate() {
    return browser.$("//input[@id='inspectionDate']");
  }
 /** выбор текущей даты */
public get $ButtonInspectionDate() {
  return browser.$("//td[@class='rdtDay rdtToday']");
}
/** Поле ввода даты осмотра */
public get $InputInspectionTime() {
  return browser.$("//div[@id='inspectionTimeBlock']");
}

 /** Чек бокс Согласия с договором оферты */
 public get $ButtonOfferContract() {
  return browser.$("//div[@class='ui fitted checkbox']");
}

/** Чек бокс Согласия с условиями обработки и использования моих персональных данных */
public get $ButtonOfferPersonal() {
  return browser.$("//div[@class='ui fitted checkbox']//label[@for='agreeWithPersonalDataProcessing']");
}

/** Кнопка закрытия договора */
public get $ButtonCloseOffer() {
  return browser.$("//i[@class='close icon']");
}


//////////////Раздел с документами////////////////

/** Кнопка пропуска загрузки документов */
public get $ButtonNoDocument() {
  return browser.$("//label[@for='noDocuments']");
}

/** Кнопка пропуска загрузки документов */
public get $ButtonNoPassport() {
  return browser.$("//label[@for='passportWillAttachLater']");
}


///////////////////Раздел с оплатой/////////////////////
/** Кнопка выбора типа оплаты по квитанции */
public get $ButtonСhoiceReceipt() {
  return browser.$("//i[@class='fas fa-file-invoice fa-3x']");
}

/** Кнопка оплатить по квитанции */
public get $ButtonPayReceipt() {
  return browser.$("//button[@id='downloadInvoiceModal']");
}

/** Кнопка Согласия с введенными данными */
public get $ButtonAgreeDataPay() {
  return browser.$("//label[@for='agreeWithValidData']");
}

/** Кнопка оплатить по квитанции */
public get $ButtonDownloadInvoiceAndPay() {
  return browser.$("//button[@id='downloadInvoice']");
}

/** баннер об успешной оплате */
public get $TextSuccessPay() {
  return browser.$("//i[@class='checkmark icon']");
}


  /**  */
  private get $checkboxWeekendInspection() {
    return this.$ModalSelectAppraiserBase.$(`#INSPECTION_IN_WEEKEND`);
  }
  /** Корень таблицы выбора оценочной компании */
  private get $ModalSelectAppraiserTable() {
    return this.$ModalSelectAppraiserBase.$(`//table[@id='appraisalSortTable']`);
  }
  /** Первая в таблице кнопка "Выбрать" (обычно это 'Зарница') */
  private get $ButtonSelectAppraiser() {
    return this.$ModalSelectAppraiserTable.$(`button[class*='Order_buttonOrder']`);
  }
  select_appraiser(appraiser?: string) {
    this.$ButtonChooseAppraiser.waitForClickable();
    this.$ButtonChooseAppraiser.click();
    this.$ModalSelectAppraiserBase.waitForDisplayed({ timeout: 10000, reverse: false });

    if (appraiser) {
      let target = $(
        `//tr/td[contains(text(),'${appraiser}')]/..//button[contains(@class,'Order_buttonOrder')]`
      );
      target.waitForClickable();
      target.click();
    } else {
      this.$ButtonSelectAppraiser.waitForClickable();
      this.$ButtonSelectAppraiser.click();
    }

    this.$ModalSelectAppraiserBase.waitForDisplayed({ timeout: 10000, reverse: true });
  }
  get $TextAppraisalCompanyName() {
    return this.$OrderContent.$(`#appraisalCompanySelect > div.text`).getText();
  }

  /** Кнопка перехода на след.шаг */
  public get $ButtonNextStep() {
    return browser.$(`#actionNextButton`);
  }

  /** Блок содержания страницы */
  private get $OrderContent() {
    return this.$OrderRoot.$(`div[class*="Order_content"]`);
  }
  /** Корень страницы */
  private get $OrderRoot() {
    return $(`div[class*="Order_root"]`);
  }


  public get $InputPassword() {
    return browser.$(`#password`);
  }


  open() {
    browser.url(FaHostNameResolver(SiteList.PSB));
  }

  /** Функция ввода Логина */
  InputLogin(phone: string) {
    this.$InputLogin.waitForDisplayed({ timeout: 1000 });
    this.$InputLogin.waitForClickable();
    this.$InputLogin.click();
    this.$InputLogin.clearValue();
    this.$InputLogin.setValue(phone);
    for (let i = 0; i < 9; i++) browser.keys(phone[i]);
  }

  /** Функция ввода Пароля */
  InputPassword(Passowrd: string) {
    this.$InputPassword.waitForDisplayed({ timeout: 1000 });
    this.$InputPassword.waitForClickable();
    this.$InputPassword.click();
    this.$InputPassword.clearValue();
    this.$InputPassword.setValue(Passowrd);
  }

/** Функция ввода Региона */
  InputRegion(region: string) {
    this.$ButtonRegionSelect.waitForClickable();
    this.$ButtonRegionSelect.click();
    this.$ListRegion.waitForDisplayed({});
    this.$InputRegion.setValue(region);
    this.$ListRegionFirst.waitForDisplayed({});
    this.$ListRegionFirst.waitForClickable();
    this.$ListRegionFirst.click();
  }

  select_rooms(roomType: FA_RoomsType) {
    this.$InputRooms.waitForClickable();
    this.$InputRooms.click();
    this.$$ObjectRoomsValues[roomType].scrollIntoView();
    this.$$ObjectRoomsValues[roomType].click();
  }

}
/** Сайт ПСБ */
export const psbOcenka = new PsbOcenka();
