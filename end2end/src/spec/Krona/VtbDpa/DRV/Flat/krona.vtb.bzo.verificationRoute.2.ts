import { expect } from "chai";
import { toNumber } from "lodash";
import { debugLogging, getIdFromUrl, makeScreenshot } from "modules";
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
  BaQualifiedRepairState,
  BaReportNavigationPanels,
  baReportPage,
  BaReportResidentialMapType,
  BaResidentialSignType,
  residentialReportPage,
} from "pages/ba/classic";
import { modalCloneFromReport } from "pages/ba/classic/ba.classic.reportPage.modal.cloneFrom";
import { options } from "options";
import { TestDataBa, TestDataKrona } from "options/testData";
import { kronaLoginPage, kronaNavigationBar, kronaOrderDpaResidentialOrderPage } from "pages/Krona";
import {
  KronaEnumOrderDpaResidentialInspectionContacts,
  KronaEnumOrderDpaResidentialOrderCardDataTabs,
  KronaOrderDpaResidentialDataFields,
  KronaOrderDpaResidentialDocumentType,
  KronaOrderDpaResidentialDpaWork,
  KronaOrderDpaResidentialInspection,
  KronaOrderDpaResidentialIntendedUse,
} from "pages/Krona/DpaOrdersVtb/enums";
import { TestFilesEnum } from "test_files/enum.testFiles";
import { KronaTestDataVtbResidentialFlat } from "options/testData/krona/testData/banks/vtb/residential/krona.testData.vtb.residential.flat";
import { mathTestDataDistributor } from "modules/math/math.distributor";
import { kronaOrderDpaResidentialOrderCard } from "pages/Krona/DpaOrdersVtb/krona.order.dpa.residential.orderCard";
import { browserSwitchWindowByIndex } from "modules/supportMethodsForBrowserTabs";

const testName = `КРОНА. ВТБ. БЗО-Недвижимость. Маршрутка. Первая версия отчёта.
Дорогой объект. Верификация УРЗ.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-29925",
  });
  let testDataGenerated = KronaTestDataVtbResidentialFlat.Request.Flat.VERY_EXPENSIVE;
  let orderNumber: number;
  let baWallsMaterial: string;

  it(`КРОНА. Заходим под юзером ВТБ`, function () {
    allureReporter.generateReport({
      description: `Заходим в Крону
     под юзером ВТБ: ${TestDataKrona.Users.login.vtb.autotest_bzo} .`,
    });
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_bzo,
      TestDataKrona.Users.password.vtb.autotest_bzo
    );
    kronaNavigationBar.waitForLoad();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.open();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
  });
  it(`КРОНА. Заполнение заказа ДРВ.`, function () {
    this.retries(3);
    allureReporter.generateReport({
      description: `На этом этапе мы заполняем
        заказ ДРВ предустановленными данными и адресом,
        а так же - фиксированной ценой.`,
    });
    let setOrderData = kronaOrderDpaResidentialOrderPage.SET_DATA;
    let getOrderData = kronaOrderDpaResidentialOrderPage.GET_DATA;

    let testAddress = "";
    testAddress =
      testDataGenerated.address +
      ` кв.` +
      mathTestDataDistributor.RANDOM.getRandomNumberBetween(1, 99);
    setOrderData.inputObjectAddress(testAddress);

    testDataGenerated.address = getOrderData.getReportFieldData(
      KronaOrderDpaResidentialDataFields.OBJECT_ADDRESS
    );
    setOrderData.selectDpaWork(KronaOrderDpaResidentialDpaWork.INDIVIDUAL);
    setOrderData.selectIntendedUse(KronaOrderDpaResidentialIntendedUse.BALANCE);
    setOrderData.inputValuableObjectDescription(TestDataKrona.DpaOrder.ValuableObjectDescription);
    makeScreenshot("Заказ ДРВ 1 часть");
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
    makeScreenshot("Заказ ДРВ 2 часть");
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.saveOrderDraft();
    makeScreenshot("Заказ ДРВ 3 часть");
    orderNumber = toNumber(getIdFromUrl());
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.sendOrder();

    kronaOrderDpaResidentialOrderCard.openOrderCardByOrderId(orderNumber);
    allureReporter.generateReport({
      // description: `На этом этапе мы заполняем
      //   заказ ДРВ предустановленными данными и адресом по которому ранее был
      //   произведён расчёт стоимости.`,
      additionalArguments: [{ argName: "DpaOrderNumber", argValue: orderNumber.toString() }],
    });
    // makeScreenshot("Заполнили и отправили заказ");
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
      testDataGenerated.price,
      BaAnalogDataField.PRICE
    );
    residentialReportPage.AnalogData.copyAnalogData(2);
    residentialReportPage.AnalogData.copyAnalogData(3);
    // residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.LOCATION_AND_MAP)
    // residentialReportPage.LocationAndMap.waitForLoad()
    // residentialReportPage.LocationAndMap.mapDataRefresh()
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
  // it(`Возврат в Крону`, function () {
  //   allureReporter.generateReport({
  //     description: `Возвращаемся в Крону чтобы проверить
  //       статус заказа`,
  //   });
  // });
  it(`Проверка верификации отчёта по заказу.`, function () {
    allureReporter.generateReport({
      description: `После успешного возвращения в крону,
      нужно проверить получение корректного статуса заказа.
      Для этого мы делаем неявное ожидание в 1.5 минуты чтобы отчёт прилетел из БО
      в Крону. После чего мы проверяем статус отчёта. Если статус отчёта
      НЕ СООТВЕТСТВУЕТ статусу "Окончание верификации" то мы делаем ещё одно неявное ожидание
      уже на 2 минуты (чтобы точно получить ответ робота) и проверяем статус снова.`,
    });
    browserSwitchWindowByIndex(0, "Переключаемся на КРОНУ");
    makeScreenshot("Вернулись в Крону");
    browser.pause(2 * 60 * 1000);
    browser.refresh();

    kronaOrderDpaResidentialOrderCard.OBJECT_INFO_BLOCK.waitForLoad();
    kronaOrderDpaResidentialOrderCard.openTab(
      KronaEnumOrderDpaResidentialOrderCardDataTabs.VERIFICATION
    );

    debugLogging(
      `Текущий статус отчёта: ${kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus.getText()}`
    );
    if (
      kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus
        .getText()
        .match("Окончание верификации") === null
    ) {
      browser.pause(2 * 60 * 1000);
      browser.refresh();
      kronaOrderDpaResidentialOrderCard.OBJECT_INFO_BLOCK.waitForLoad();
      kronaOrderDpaResidentialOrderCard.openTab(
        KronaEnumOrderDpaResidentialOrderCardDataTabs.VERIFICATION
      );
    }

    let errorMsg = "Статус ОТЧЁТА не соответствует ожидаемому.";
    expect(
      kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus.getText(),
      errorMsg
    ).to.include("Окончание верификации");
    makeScreenshot("Проверка статуса отчёта по заказу.");
  });

  it(`Оценка эксперта SRG`, function () {});
  it(`Проверка статуса заказа`, function () {});
  it(`Верификация УЗИ`, function () {});
  it(`Окончательная проверка статуса`, function () {});
});
