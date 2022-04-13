import {psbOcenka} from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import {
  FA_RoomsType
} from "pages/fa/enum";
import { makeScreenshot } from "modules";

describe(`FA. ПСБ. End2end. Рефинансирование.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    psbOcenka.open();
    psbOcenka.$HeaderTitle.waitForDisplayed({timeout: 5000});
    makeScreenshot(`SMOKE_ПСБ`);
  });

  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    let checkLogin :string;
    let errorMsgLogin :string ='Пустое значение в поле Логин';
    let errorMsgLoginElement : string ='Поле ввода логина не доступно';

    psbOcenka.$ButtonUserCabinet.click();
    expect(psbOcenka.$InputLogin.isClickable(),errorMsgLoginElement).to.be.true;
    psbOcenka.InputLogin(TestDataFa.Users.login.roman);
    checkLogin = psbOcenka.$InputLogin.getValue();
     expect(checkLogin,errorMsgLogin).to.be.not.empty;

    let checkPassword :string;
    let errorMsgPassword :string ='Пустое значение в поле пароль';
    let errorMsgPasswordElement : string ='Поле ввода пароля не доступно';

    expect(psbOcenka.$InputPassword.isClickable(),errorMsgPasswordElement).to.be.true;
    psbOcenka.InputPassword(TestDataFa.Users.password.roman);
    checkPassword = psbOcenka.$InputPassword.getValue();
     expect(checkPassword,errorMsgPassword).to.be.not.empty;
     psbOcenka.$ButtonSend.click();
  });

  it(`Выбор типа Кредитования`, function () {
    allureReporter.generateReport();
    let errorMsgNewOrder :string = 'Кнопка Заказать из списка заказов недоступна или не кликабельна';
    let errorMsgRefinCredit:string = 'Кнопка Рефинансирование недоступна или не кликабельна'

    psbOcenka.$ButtonNewOrder.waitForClickable();
     expect(psbOcenka.$ButtonNewOrder.isClickable(),errorMsgNewOrder).to.be.true;
    psbOcenka.$ButtonNewOrder.click();
    psbOcenka.$RefinCredit.waitForClickable();
     expect(psbOcenka.$RefinCredit.isClickable(),errorMsgRefinCredit).to.be.true;
     psbOcenka.$RefinCredit.click();
    makeScreenshot("выбор_типа_кредитования");
  });

  it(`Ввод региона, населённого пункта`, function () {
    allureReporter.generateReport();
    let errorMsgRegionSelect :string = 'Поле ввода региона не доступно';

    psbOcenka.$ButtonRegionSelect.waitForClickable();
     expect(psbOcenka.$ButtonRegionSelect.isClickable(),errorMsgRegionSelect).to.be.true;
    psbOcenka.InputRegion("Москва");
  });

  it(`Кнопка перехода в ЛК карточки заказа`, function () {
    allureReporter.generateReport();
    psbOcenka.$OrderButton.waitForClickable();
     expect(psbOcenka.$OrderButton.isClickable()).to.be.true;
    psbOcenka.$OrderButton.click();
  });

  it(`Выбор Права собственности`, function () {
    allureReporter.generateReport();
    let errorMsgLabelOwnershipYes :string = 'Чек бокс выбора Права собственности не доступна'

    psbOcenka.$LabelOwnershipYes.waitForClickable();
     expect(psbOcenka.$LabelOwnershipYes.isClickable(),errorMsgLabelOwnershipYes).to.be.true;
    psbOcenka.$LabelOwnershipYes.click();
  });

  it(`Проверка что регион введен`, function () {
    allureReporter.generateReport();
    let errorMsgRegion :string = 'Отсутствует значение в поле Регион/Населенный пункт';
    let regionCheck :string;

      expect(psbOcenka.$inputRegion.isClickable()).to.be.true;
    regionCheck = psbOcenka.$inputRegion.getValue();
      expect(regionCheck,errorMsgRegion).to.be.not.empty;
   });
  

   it(`Ввод улицы`, function () {
    allureReporter.generateReport();
    let errorMsgStreet :string = 'Отсутствует значение в поле Улица'
    let streetCheck :string;

    psbOcenka.$InputStreet.click();
    psbOcenka.$InputStreet.clearValue();
    psbOcenka.$InputStreet.addValue(TestDataFa.sgb.street);
    streetCheck = psbOcenka.$InputStreet.getValue();
     expect(streetCheck,errorMsgStreet).to.be.not.empty;
  });

  it(`Ввод Квартиры`, function () {
    allureReporter.generateReport();
    let errorMsgFlat :string = 'Отсутствует значение в поле квартира'
    let flatCheck :string;

    psbOcenka.$InputFlat.click();
    psbOcenka.$InputFlat.clearValue();
    psbOcenka.$InputFlat.setValue(TestDataFa.sgb.flat);
    flatCheck = psbOcenka.$InputFlat.getValue();
     expect(flatCheck,errorMsgFlat).to.be.not.empty;
  });

  it(`Самостоятельный ввод адреса`, function () {
    allureReporter.generateReport();
    let errorMsgManualAddress :string = 'Кнопка ручного ввода адреса не доступна'

    psbOcenka.$InputManualAddress.waitForClickable();
     expect(psbOcenka.$InputManualAddress.isClickable(),errorMsgManualAddress).to.be.true;
    psbOcenka.$InputManualAddress.click();
  });

  it(`Выбор комнаты`, function () {
    allureReporter.generateReport();
    let errorMsgRooms :string = 'Не выбрана комната или поле выбора комнаты не доступна'

     expect(psbOcenka.$InputRooms.isClickable(),errorMsgRooms).to.be.true;
    psbOcenka.select_rooms(FA_RoomsType.FOUR_AND_MORE);
  });

  it(`Выбор Отделения Банка`, function () {
    allureReporter.generateReport();
    let errorMsgBank :string = 'Пустое значение в поле Банк';
    let checkBank :string;

     expect(psbOcenka.$InputBank.isClickable()).to.be.true;
    psbOcenka.$InputBank.addValue('Китай-город 2');
    checkBank = psbOcenka.$InputBank.getValue();
     expect(checkBank,errorMsgBank).to.be.not.empty;
});

it(`Ввод почты Заказчика`, function () {
  allureReporter.generateReport();
  let errorMsgEmail :string = 'Пустое значение в поле Банк';
  let checkEmail :string;

   expect(psbOcenka.$InputCustomerEmail.isClickable()).to.be.true;
  psbOcenka.$InputCustomerEmail.clearValue();
  psbOcenka.$InputCustomerEmail.addValue('EOteamtest@srgroup.ru');
  checkEmail = psbOcenka.$InputCustomerEmail.getValue();
   expect(checkEmail,errorMsgEmail).to.be.not.null;
});

it(`Проверка доступности чек боксов с выбором нотификации`, function () {
  allureReporter.generateReport();
  let errorMsgNotificationEmail :string = 'Чек бокс с выбором нотификации Email не доступен';
  let errorMsgNotificationSMS :string = 'Чек бокс с выбором нотификации SMS не доступен'
  //нажимаем на чек-бокс СМС, репортим и выполняем проверку
  psbOcenka.$LabelNotificationSMS.waitForClickable();
  psbOcenka.$LabelNotificationSMS.click();
   expect(psbOcenka.$LabelNotificationSMS.isClickable(),errorMsgNotificationSMS).to.be.true;
  //нажимаем на чек-бокс Email, репортим и выполняем проверку
  psbOcenka.$LabelNotificationEmail.waitForClickable();
  psbOcenka.$LabelNotificationEmail.click();
   expect(psbOcenka.$LabelNotificationEmail.isClickable(),errorMsgNotificationEmail).to.be.true;
  makeScreenshot("чек_бокс_Email");
});

// Временно деактированная функция
//it(`Ввод заказчика Оценки`, function () {
  //allureReporter.generateReport();
//psbOcenka.$inputNameCustomer.waitForDisplayed({ timeout: 10000, reverse: false });
//psbOcenka.$inputNameCustomer.click();
//psbOcenka.$inputNameCustomer.clearValue();
//psbOcenka.$inputNameCustomer.addValue(TestDataFa.CustomerFIO.name);
//psbOcenka.$inputSurnameCustomer.waitForDisplayed({ timeout: 10000, reverse: false });
//psbOcenka.$inputSurnameCustomer.click();
//psbOcenka.$inputSurnameCustomer.addValue(TestDataFa.CustomerFIO.lastname);
//psbOcenka.$inputPatronymicCustomer.waitForDisplayed({ timeout: 10000, reverse: false });
//psbOcenka.$inputPatronymicCustomer.click();
//psbOcenka.$inputPatronymicCustomer.addValue(TestDataFa.CustomerFIO.patronymic);
//makeScreenshot("Ввод_заказчика_Оценки");
//});

it(`Ввод ФИО заемщика в банке`, function () {
  allureReporter.generateReport();
  let errorMsgNameBorrower :string = 'Отсутствует значение в поле Имя заемщика';
  let checkNameBorrower:string;

  let errorMsgSurnameBorrower :string ='Отсутствует значение в поле Фамилия заемщика';
  let checkSurnameBorrower:string;

  let errorMsgPatronymicBorrower :string ='Отсутствует значение в поле Отчество заемщика';
  let checkPatronymicBorrower:string;

  psbOcenka.$ButtonBorrowerAsCustomer.waitForDisplayed();
  psbOcenka.$ButtonBorrowerAsCustomer.click();

  //проверка поля "имя заемщика"
  checkNameBorrower = psbOcenka.$InputNameBorrower.getValue();
    expect(checkNameBorrower,errorMsgNameBorrower).to.be.not.empty;
  //проверка поля "Фамилия заемщика"
  checkSurnameBorrower = psbOcenka.$InputNameBorrower.getValue();
    expect(checkSurnameBorrower,errorMsgSurnameBorrower).to.be.not.empty;
 //проверка поля "Отчество заемщика"
    checkPatronymicBorrower = psbOcenka.$InputPatronymicBorrower.getValue();
      expect(checkPatronymicBorrower,errorMsgPatronymicBorrower).to.be.not.empty;
});


it(`Согласие с договором оферты`, function () {
  allureReporter.generateReport();
let errorMsgButtonOfferContract :string = 'Чек бокс с выбором договоров не доступен';

psbOcenka.$ButtonOfferContract.waitForDisplayed();
psbOcenka.$ButtonOfferContract.click();
 expect(psbOcenka.$ButtonOfferContract.isClickable(),errorMsgButtonOfferContract).to.be.true;
psbOcenka.$ButtonOfferContract.waitForDisplayed();
psbOcenka.$ButtonOfferContract.click();
psbOcenka.$ButtonOfferContract.waitForDisplayed();
 expect(psbOcenka.$ButtonOfferContract.isClickable(),errorMsgButtonOfferContract).to.be.true;
psbOcenka.$ButtonOfferContract.click();
 makeScreenshot("Согласие_с_договором");
});

it(`Переход на след.щаг`, function () {
  allureReporter.generateReport();
  let errorMsgButtonNextStep :string = 'Кнопка перехода на след.шаг не доступна или не кликабельна';
  
  psbOcenka.$ButtonNextStep.waitForClickable();
   expect(psbOcenka.$ButtonNextStep.isClickable(),errorMsgButtonNextStep).to.be.true;
  psbOcenka.$ButtonNextStep.click();
   makeScreenshot("Переход на след.шаг");
  });

  it(`Переход на след.шаг. Пропуск загрузки док-ов`, function () {
    allureReporter.generateReport();
    let errorMsgButtonNextStep :string = 'Кнопка перехода на след.шаг не доступна или не кликабельна';
    let errorMsgButtonNoDocument :string = 'Кнопка перехода отказа от загрузки документов не доступна или не кликабельна';
    let errorMsgButtonNoPassport :string = 'Кнопка перехода на след.шаг не доступна или не кликабельна';
  
  psbOcenka.$ButtonNoDocument.waitForClickable();
   expect(psbOcenka.$ButtonNoDocument.isClickable(),errorMsgButtonNoDocument).to.be.true;
  psbOcenka.$ButtonNoDocument.click();
  psbOcenka.$ButtonNoPassport.waitForClickable();
  expect(psbOcenka.$ButtonNoPassport.isClickable(),errorMsgButtonNoPassport).to.be.true;
  psbOcenka.$ButtonNoPassport.click();
  psbOcenka.$ButtonNextStep.waitForClickable();
   makeScreenshot("Переход_на_след.шаг");
   expect(psbOcenka.$ButtonNextStep.isClickable(),errorMsgButtonNextStep).to.be.true;
  psbOcenka.$ButtonNextStep.click();
  makeScreenshot("Переход_на_след.шаг");
  });


  it(`Выбор типа оплаты`, function () {
    allureReporter.generateReport();
    let errorMsgButtonСhoiceReceipt :string = 'Кнопка выбора типа оплаты по квитанции не доступна или не кликабельна';
    let errorMsgButtonButtonPayReceipt :string = 'Кнопка оплатить по квитанции не доступна или не кликабельна';
    let errorMsgButtonAgreeDataPay :string = 'После нажатия на кнопку "Оплатить по квитанции" клиент не может поддтвердить введенные ранее данные в диалоговом окне';
  
    psbOcenka.$ButtonСhoiceReceipt.waitForClickable();
   expect(psbOcenka.$ButtonСhoiceReceipt.isClickable(),errorMsgButtonСhoiceReceipt).to.be.true;
  psbOcenka.$ButtonСhoiceReceipt.click();
  psbOcenka.$ButtonPayReceipt.waitForClickable();
   expect(psbOcenka.$ButtonPayReceipt.isClickable(),errorMsgButtonButtonPayReceipt).to.be.true;
  psbOcenka.$ButtonPayReceipt.click();
  psbOcenka.$ButtonAgreeDataPay.waitForClickable();
   expect(psbOcenka.$ButtonAgreeDataPay.isClickable(),errorMsgButtonAgreeDataPay).to.be.true;
  psbOcenka.$ButtonAgreeDataPay.click();
  psbOcenka.$ButtonDownloadInvoiceAndPay.waitForClickable();
  psbOcenka.$ButtonDownloadInvoiceAndPay.click()
   makeScreenshot("Переход_на_след.шаг");
  });

  it(`Отображение успешной оплаты`, function () {
    allureReporter.generateReport();
    let errorMsgTextSuccessPay :string = 'Баннер об успешной оплате не отображается, возможно не нажалась кнопка оплаты квитанцией >';
  
  psbOcenka.$TextSuccessPay.waitForEnabled()
   expect(psbOcenka.$TextSuccessPay.isDisplayed(),errorMsgTextSuccessPay).to.be.true;
   makeScreenshot("Успешная_оплата");
  });

});
