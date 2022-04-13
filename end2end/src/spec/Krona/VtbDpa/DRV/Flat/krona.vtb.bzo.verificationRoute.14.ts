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
import { TestDataBa, TestDataKrona } from "options/testData";
import {
  kronaDpaUziDecision,
  kronaExpertRequestCard,
  KronaExpertResponseComparableFieldNames,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaOrderDpaResidentialOrderPage,
  KronaResidentialReportStatusesTranslated,
  kronaResultTable,
} from "pages/Krona";
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

describe(`КРОНА. ВТБ. БЗО-Недвижимость. Маршрутка. Первая версия отчёта. Ручник SRG. Отклонение SRG > 30%. Верификация УРЗ.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-29925",
  });
  let testDataGenerated =
    KronaTestDataVtbResidentialFlat.Request.Flat.VERY_EXPENSIVE_BUT_LOWER_PRICE;
  let orderNumber: number;
  let baWallsMaterial: string;
  let reportNumber: string;

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
    reportNumber = residentialReportPage.Base.$text_reportNumber;
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
    // console.log(`Отчёт: ${browser.getUrl()}`);
    makeScreenshot("Заполнили и подписали отчет");
  });
  it(`КРОНА. Проверка верификации отчёта по заказу.`, function () {
    allureReporter.generateReport({
      description: `После успешного возвращения в крону,
        нужно проверить получение корректного статуса заказа.
        Для этого мы делаем неявное ожидание в 1.5 минуты чтобы отчёт прилетел из БО
        в Крону. После чего мы проверяем статус отчёта. Если статус отчёта
        НЕ СООТВЕТСТВУЕТ статусу "Окончание верификации" то мы делаем ещё одно неявное ожидание
        уже на 2 минуты (чтобы точно получить ответ робота) и проверяем статус снова.`,
    });
    browserSwitchWindowByIndex(0, "Переключаемся на КРОНУ");
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
        .match(KronaResidentialReportStatusesTranslated.AWAITS_EXPERT_VALUATION) === null
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
    ).includes(KronaResidentialReportStatusesTranslated.AWAITS_EXPERT_VALUATION);

    kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus.scrollIntoView();
    makeScreenshot(this.test?.title!);
  });
  it(`КРОНА. Оценка эксперта SRG`, function () {
    allureReporter.generateReport({
      description: `Для дальнейшей проверки нам нужно
      произвести верификацию отчёта на стороне эксперта SRG.
      Переходим на страницу расчёта эксперта и производим расчёт.`,
    });

    let expertRequestId = getIdFromUrl(
      kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportCalculationLink.getAttribute(
        "href"
      )
    );
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();

    kronaExpertRequestCard.goToExpertRequestCard(expertRequestId);
    kronaExpertRequestCard.waitForLoad();
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.fillDataFromAnotherRequest("282333");
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.saveResponseDraft();
    let reportPrice = kronaExpertRequestCard.$info_objectPriceInReport.getText();
    for (let i = 1; i < 4; i++) {
      debugLogging(`Зашли в цикл изменения данных аналогов. Работаем с аналогом №${i}.
        Смотрим что вернул метод поиска поля аналога по:
        Цене = ${kronaExpertRequestCard.comparables(
          i,
          KronaExpertResponseComparableFieldNames.PRICE
        )}
        Общей площади = ${kronaExpertRequestCard.comparables(
          i,
          KronaExpertResponseComparableFieldNames.TOTAL_SPACE
        )}
        Состояние отделки = ${kronaExpertRequestCard.comparables(
          i,
          KronaExpertResponseComparableFieldNames.REPAIRS_TYPE
        )}
        `);

      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.PRICE)
        .setValue(toNumber(reportPrice) + 15000000);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.TOTAL_SPACE)
        .setValue(testDataGenerated.total_space);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.REPAIRS_TYPE)
        .selectByAttribute(
          "value",
          Object.values(BaQualifiedRepairState)[testDataGenerated.flatRepairs_index]
        );
    }
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.commitExpertResponse();
  });
  it(`КРОНА. Проверка статуса отчёта в карточке заказа.`, function () {
    allureReporter.generateReport({
      description: `Так как эксперт SRG указал стоимость
      с отклонением больше 30% от цены отчёта - отчёт должен принять статус "Верификация УРЗ".`,
    });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_bzo,
      TestDataKrona.Users.password.vtb.autotest_bzo
    );
    kronaNavigationBar.waitForLoad();
    kronaOrderDpaResidentialOrderCard.openOrderCardByOrderId(orderNumber);
    kronaOrderDpaResidentialOrderCard.openTab(
      KronaEnumOrderDpaResidentialOrderCardDataTabs.VERIFICATION
    );
    let errorMsg = "Статус ОТЧЁТА не соответствует ожидаемому.";
    expect(
      kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus.getText(),
      errorMsg
    ).includes(KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION);
    kronaOrderDpaResidentialOrderCard.VERIFICATION_DATA_TAB.$verificationReportStatus.scrollIntoView();
    makeScreenshot(this.test?.title!);
  });
  it(`КРОНА. Проверка статуса заказа в реестре заказов.`, function () {
    allureReporter.generateReport({
      description: `После успешной проверки статуса
        отчёта по заказу в карточке заказа - надо проверить соответствие статуса
        самого заказа в реестре "БЗО. Недвижимость".`,
    });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_ORDERS_DPA);
    kronaResultTable.waitForLoad();

    let orderStatus: WebdriverIO.Element = $(`//a[contains(text(),'${orderNumber}')]/../../td[8]`);
    let errorMsg = "Статус ЗАКАЗА не соответствует ожидаемому.";
    expect(orderStatus.getText(), errorMsg).includes("Верификация");
    orderStatus.scrollIntoView();
    makeScreenshot(this.test?.title!);
  });
  it(`КРОНА. Проверка окна принятия решения. Старый реестр`, function () {
    allureReporter.generateReport({
      description: `Переходим в страый реестр отчётов
      и проверяем работу окна принятия решения.`,
    });

    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();

    kronaFiltersBox.inputReportNumber(reportNumber);
    kronaFiltersBox.showResults();

    kronaDpaUziDecision.$dpaUziOpenModal.waitForClickable();
    kronaDpaUziDecision.$dpaUziOpenModal.click();
    kronaDpaUziDecision.waitForLoad();

    kronaDpaUziDecision.$dpaUziDecisionSelector.selectByIndex(0);
    expect(kronaDpaUziDecision.$dpaUziDecisionSelector.getValue()).to.be.equal("");
    expect(kronaDpaUziDecision.$dpaUziDecisionSelectorOptions[0].getText()).to.be.equal("");
    expect(kronaDpaUziDecision.$dpaUziPriceInput.isDisplayed()).to.be.false;
    expect(kronaDpaUziDecision.$dpaUziCommentTitle.getText()).to.be.equal("Комментарий");
    makeScreenshot(`Значение селектора 1`);

    kronaDpaUziDecision.$dpaUziDecisionSelector.selectByIndex(1);
    expect(kronaDpaUziDecision.$dpaUziDecisionSelector.getValue()).to.be.equal("accept");
    expect(kronaDpaUziDecision.$dpaUziDecisionSelectorOptions[1].getText()).to.include(
      "Принять стоимость в Отчете"
    );
    expect(kronaDpaUziDecision.$dpaUziPriceInput.isDisplayed()).to.be.false;
    expect(kronaDpaUziDecision.$dpaUziCommentTitle.getText()).to.be.equal("Комментарий");
    makeScreenshot(`Значение селектора 2`);

    kronaDpaUziDecision.$dpaUziDecisionSelector.selectByIndex(2);
    expect(kronaDpaUziDecision.$dpaUziDecisionSelector.getValue()).to.be.equal("reject");
    expect(kronaDpaUziDecision.$dpaUziDecisionSelectorOptions[2].getText()).to.include(
      "Отклонить стоимость в Отчете"
    );
    expect(kronaDpaUziDecision.$dpaUziPriceInput.isDisplayed()).to.be.true;
    expect(kronaDpaUziDecision.$dpaUziCommentTitle.getText()).to.be.equal("Комментарий в РОК");
    makeScreenshot(`Значение селектора 3`);

    kronaDpaUziDecision.$dpaUziFormButtonClose.waitForClickable();
    kronaDpaUziDecision.$dpaUziFormButtonClose.click();
    kronaDpaUziDecision.$dpaUziFormRoot.waitForDisplayed({ reverse: true });
    // makeScreenshot(this.test?.title!)
  });
  // it(`КРОНА. Проверка окна принятия решения. Реакт реестр`, function(){
  //   allureReporter.generateReport({description:``})
  //   kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_NEW)
  //   kronaFiltersBox.waitForLoad()

  //   kronaFiltersBox.inputReportNumber(reportNumber)
  //   kronaFiltersBox.showResults()

  //   const KronaDpaUziReact:WebdriverIO.Element = $(`//a[contains(text(),'Решение')]`)
  //   KronaDpaUziReact.waitForClickable()
  //   KronaDpaUziReact.click()

  //   // makeScreenshot(this.test?.title!)
  // })
});
