import { expect } from "chai";
import { toNumber } from "lodash";
import { getIdFromUrl, makeScreenshot } from "modules";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  BaAnalogDataField,
  baClassicNavMenu,
  baDpaOrdersList,
  baLoginPage,
  baMainPage,
  BaNavigationButtons,
  BaNavigationOrders,
  BaQualifiedRepairState,
  BaReportNavigationPanels,
  baReportPage,
  BaReportResidentialMapType,
  BaResidentialReportPage,
  BaResidentialSignType,
  residentialReportPage,
} from "pages/ba/classic";
import { modalCloneFromReport } from "pages/ba/classic/ba.classic.reportPage.modal.cloneFrom";
import { options } from "options";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaOrderDpaResidentialOrderPage,
  kronaResultTable,
  requestCreateLand,
  requestsCreateFlat,
  ValuationResultData,
} from "pages/Krona";
import {
  KronaEnumOrderDpaResidentialInspectionContacts,
  KronaOrderDpaResidentialDataFields,
  KronaOrderDpaResidentialDataFields_inputs,
  KronaOrderDpaResidentialDocumentType,
  KronaOrderDpaResidentialDpaWork,
  KronaOrderDpaResidentialInspection,
  KronaOrderDpaResidentialIntendedUse,
} from "pages/Krona/DpaOrdersVtb/enums";
import { TestFilesEnum } from "test_files/enum.testFiles";
import { KronaTestDataVtbResidentialFlat } from "options/testData/krona/testData/banks/vtb/residential/krona.testData.vtb.residential.flat";
import { TestDataBa, TestDataKrona } from "options/testData";

describe(`КРОНА. ВТБ. БЗО-Недвижимость. Маршрутка. Первая версия отчёта. Одобрено.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-29925",
  });
  let testDataGenerated = KronaTestDataVtbResidentialFlat.Request.Flat.AVERAGE;
  let orderNumber: number;
  let robotCalculatedPrice;
  let baWallsMaterial: string;

  it(`КРОНА. Логин под SRG.`, function () {
    allureReporter.generateReport({
      description: `Заходим в Крону
    под пользователем SRG: ${TestDataKrona.Users.login.srg.superadmin}`,
    });
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`КРОНА. Создаём запрос на оценку`, function () {
    allureReporter.generateReport({
      description: `Нам нужно создать запрос
     на оценку стоимости квартиры по заданным параметрам чтобы потом
     использовать эти параметры для подгона цены отчёта в БО.

     Параметры квартиры: ${JSON.stringify(testDataGenerated, void 0, 2)}`,
    });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();
    requestsCreateFlat.fullfillFlatRequest(testDataGenerated);
    // baWallsMaterial = requestsCreateFlat.getFieldData();
    requestsCreateFlat.$button_buttonSend.scrollIntoView();
    requestsCreateFlat.$button_buttonSend.click();
    robotCalculatedPrice = requestsCreateFlat.waitForResult(ValuationResultData.PRICE);
  });
  it(`КРОНА. Перезаходим под юзером ВТБ`, function () {
    allureReporter.generateReport({
      description: `Теперь переходим
     к созданию заказа БЗО.Недвижимость. Для этого нам надо перезайти в Крону
     под юзером ВТБ (${TestDataKrona.Users.login.vtb.autotest_bzo}) и создать заказ.`,
    });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_bzo,
      TestDataKrona.Users.password.vtb.autotest_bzo
    );
    kronaNavigationBar.waitForLoad();
    // kronaNavigationBar.navigate_to(KronaNavigationButtons.ORDERS_DPA_NEW)
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.open();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
  });
  it(`КРОНА. Заполнение заказа ДРВ.`, function () {
    this.retries(3);
    allureReporter.generateReport({
      description: `На этом этапе мы заполняем
    заказ ДРВ предустановленными данными и адресом по которому ранее был
    произведён расчёт стоимости.`,
    });
    let setOrderData = kronaOrderDpaResidentialOrderPage.SET_DATA;
    let getOrderData = kronaOrderDpaResidentialOrderPage.GET_DATA;

    setOrderData.inputObjectAddress(testDataGenerated.address + ` кв. 17`);
    testDataGenerated.address = getOrderData.getReportFieldData(
      KronaOrderDpaResidentialDataFields.OBJECT_ADDRESS
    );
    setOrderData.selectDpaWork(KronaOrderDpaResidentialDpaWork.INDIVIDUAL);
    setOrderData.selectIntendedUse(KronaOrderDpaResidentialIntendedUse.BALANCE);
    setOrderData.inputValuableObjectDescription(TestDataKrona.DpaOrder.ValuableObjectDescription);
    setOrderData.inputCadastralNumber(TestDataKrona.DpaOrder.CadastralNumber);
    setOrderData.selectInternalInspection(KronaOrderDpaResidentialInspection.YES);
    setOrderData.selectExternalInspection(KronaOrderDpaResidentialInspection.YES);
    setOrderData.selectInspectionContacts(
      KronaEnumOrderDpaResidentialInspectionContacts.INDIVIDUAL
    );
    setOrderData.inputInspectionContactFIO(TestDataKrona.DpaOrder.InspectionContactFIO);
    setOrderData.inputInspectionContactPhone(TestDataKrona.DpaOrder.InspectionContactPhone);
    setOrderData.inputInspectioncontactEmail(TestDataKrona.DpaOrder.InspectioncontactEmail);
    setOrderData.uploadFile(TestFilesEnum.JPG, KronaOrderDpaResidentialDocumentType.ASSESMENT);
    setOrderData.uploadFile(TestFilesEnum.JPG, KronaOrderDpaResidentialDocumentType.OWNERSHIP);
    setOrderData.selectAppraiser(TestDataKrona.DpaOrder.Appraiser);
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.saveOrderDraft();
    orderNumber = toNumber(getIdFromUrl());
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.sendOrder();
    browser.url(options.krona.host + `/valuation/dpa/order/auto/ver2/${orderNumber}`);
    browser.waitUntil(() => $(`//button[@id='cloneOrderVer2']`).isExisting());
    console.log(`Url заказа: ${browser.getUrl()}`);
    makeScreenshot("Заполнили и отправили заказ");
  });
  it(`БО. Логин в БО и принятие заказа.`, function () {
    allureReporter.generateReport({
      description: `Теперь заходим в БО.
    Принимаем заказ и создаём отчёт , заполняя его теми данными
    для которых мы уже знаем примерную стоимость чтобы попасть в
    нужный нам диапазон.`,
    });
    browser.newWindow("");
    baLoginPage.open();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
    baClassicNavMenu.navigateTo(BaNavigationButtons.DPA_ORDERS);
    baDpaOrdersList.waitForLoad();
    baDpaOrdersList.acceptOrder(orderNumber.toString(), "ВТБ");
    baReportPage.waitForLoad();
  });
  it(`БО. Заполнение отчёта`, function () {
    allureReporter.generateReport({
      description: `Заполняем текущий отчёт данными
    из другого, ранее подготовленного отчёта.`,
    });
    modalCloneFromReport.cloneFromReport("Vtb");
    residentialReportPage.BasicActions.saveReport();

    baReportPage.setAgreementDate();
    baReportPage.input_reportNumber(true, `VtbDpaOrder-${Date.now()}`);
    baReportPage.$button_copyCustomerToBorrower.scrollIntoView();
    baReportPage.$button_copyCustomerToBorrower.click();
    residentialReportPage.AssesmentTaskActions.selectMapType(BaReportResidentialMapType.NO_MAP);
    residentialReportPage.AssesmentTaskActions.$button_copyDate.scrollIntoView();
    residentialReportPage.AssesmentTaskActions.$button_copyDate.click();
    residentialReportPage.BasicActions.saveReport();
    expect(
      residentialReportPage.AssesmentTaskActions.$input_cadastralNumber.getValue()
    ).to.be.equal(TestDataKrona.DpaOrder.CadastralNumber);
    residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ASSESMENT_OBJECT);
    residentialReportPage.AssesmentObjectActions.setFlatRoomsCount(testDataGenerated.roomsCount);
    residentialReportPage.AssesmentObjectActions.setFlatSpaceTotal(testDataGenerated.total_space);
    residentialReportPage.AssesmentObjectActions.setFlatSpaceLiving(testDataGenerated.living_space);
    residentialReportPage.AssesmentObjectActions.setFlatSpaceKitchen(
      testDataGenerated.kitchen_space
    );
    residentialReportPage.AssesmentObjectActions.setFlatFloorInfo(testDataGenerated.floor);
    residentialReportPage.AssesmentObjectActions.selectRepairState(
      Object.values(BaQualifiedRepairState)[testDataGenerated.flatRepairs_index]
    );
    residentialReportPage.BasicActions.saveReport();
    residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.BUILDING_INFO);
    residentialReportPage.BuildingInfo.inputStoreys(testDataGenerated.storeys);
    residentialReportPage.BuildingInfo.inputBtiWallsMaterial(baWallsMaterial);
    residentialReportPage.BuildingInfo.inputBuiltInYear(testDataGenerated.buildDate);
    residentialReportPage.BasicActions.saveReport();
    residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ANALOGS);
    residentialReportPage.AnalogData.waitForLoad();
    residentialReportPage.AnalogData.copyAnalogData(1);
    residentialReportPage.AnalogData.setAnalogTextData(
      1,
      robotCalculatedPrice,
      BaAnalogDataField.PRICE
    );
    residentialReportPage.AnalogData.copyAnalogData(2);
    residentialReportPage.AnalogData.copyAnalogData(3);
    residentialReportPage.BasicActions.saveReport();
    residentialReportPage.BasicActions.payReport();
    residentialReportPage.BasicActions.saveReport();
    residentialReportPage.BasicActions.signReport(
      BaResidentialSignType.PASSWORD,
      TestDataBa.Users.password.zarnitsa.admin
    );
    console.log(`Отчёт: ${browser.getUrl()}`);
    makeScreenshot("Заполнили и подписали отчет");
  });
  it(`Возврат в Крону`, function () {
    allureReporter.generateReport({
      description: `Возвращаемся в Крону чтобы проверить
    статус заказа`,
    });
    let handles = browser.getWindowHandles();
    browser.switchToWindow(handles[0]);
    makeScreenshot("Вернулись в Крону");
  });
  it(`Проверка верификации отчёта по заказу.`, function () {
    allureReporter.generateReport({
      description: `После успешного возвращения в крону,
    нужно проверить получение корректного статуса заказа.
    Для этого мы делаем неявное ожидание в 1 минуту чтобы отчёт прилетел из БО
    в Крону. После чего мы проверяем статус отчёта. Если статус отчёта
    НЕ СООТВЕТСТВУЕТ статусу "Одобрено" то мы делаем ещё одно неявное ожидание
    уже на 3 минуты (чтобы точно получить ответ робота) и проверяем статус снова.`,
    });
    browser.pause(60000);
    browser.refresh();

    let orderFlatInfo = $(`//div[@class='autoForm-header-left']`);
    orderFlatInfo.waitForDisplayed({
      timeout: 30000,
      timeoutMsg: `После перезагрузки страницы заказа
        данные по квартире не отрисовались`,
    });

    let orderVerificationTab = $(`//a[@href='#autoForm-verification']`);
    let orderVerificationInfoTableRoot = $(`//div[@role='tabpanel'][@id='autoForm-verification']`);
    let orderVerificationReportStatus =
      orderVerificationInfoTableRoot.$(`.//table//tbody/tr/td[3]`);

    orderVerificationTab.waitForClickable();
    orderVerificationTab.click();
    orderVerificationInfoTableRoot.waitForDisplayed();
    orderVerificationReportStatus.waitForDisplayed();

    console.log(`Текущий статус отчёта: ${orderVerificationReportStatus.getText()}`);
    if (orderVerificationReportStatus.getText() !== "Одобрен") {
      browser.pause(3 * 60 * 1000);
      browser.refresh();
      orderVerificationTab.waitForClickable();
      orderVerificationTab.click();
      orderVerificationInfoTableRoot.waitForDisplayed();
      orderVerificationReportStatus.waitForDisplayed();
    }

    let errorMsg = "Статус ОТЧЁТА не соответствует ожидаемому.";
    expect(orderVerificationReportStatus.getText(), errorMsg).to.be.equal("Готово");
    makeScreenshot("Проверка статуса отчёта по заказу.");
  });
  it(`Проверка статуса заказа.`, function () {
    allureReporter.generateReport({
      description: `После успешной проверки статуса
    отчёта по заказу в карточке заказа - надо проверить соответствие статуса
    самого заказа в реестре "БЗО. Недвижимость"`,
    });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.ORDERS_DPA_NEW);
    kronaResultTable.waitForLoad();

    let orderStatus = $(`//a[contains(text(),'${orderNumber}')]/../../td[8]`).getText();
    let errorMsg = "Статус ЗАКАЗА не соответствует ожидаемому.";
    expect(orderStatus, errorMsg).to.be.equal("Готово");
  });
});
