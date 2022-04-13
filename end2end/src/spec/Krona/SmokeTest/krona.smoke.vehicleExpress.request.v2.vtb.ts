import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaVehicleExpressOrderCard_v2,
  KronaVehicleTransmissionTypes,
  KronaVehicleFuelType,
  KronaVehicleOwners,
  KronaVehicleIncidents,
  KronaVehicleTireState,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. ВТБ. Новый запрос Экспресс ТС - версия 2.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону. Под ВТБ.`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_vehicle,
      TestDataKrona.Users.password.vtb.autotest_vehicle
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть страницу нового запроса`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.VEHICLE_REPORTS_EXPRESS_NEW_v2);
    kronaVehicleExpressOrderCard_v2.$input_Vin.waitForDisplayed({ timeout: 1000, reverse: false });
  });
  it(`Заполнение ВИН номера`, function () {
    allureReporter.generateReport();
    expect(kronaVehicleExpressOrderCard_v2.$input_Vin.isEnabled()).to.be.true;
    kronaVehicleExpressOrderCard_v2.$input_Vin.setValue(TestDataKrona.Vehicle.VIN);
    expect(kronaVehicleExpressOrderCard_v2.$checkbox_nonStdVin.isExisting()).to.be.true;
    kronaVehicleExpressOrderCard_v2.$checkbox_nonStdVin.click();
  });
  it(`Выбор производителя`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.setVehicleVendor(TestDataKrona.Vehicle.Vendor);
  });
  it(`Ввод даты выпуска`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.$input_releaseDate.click();
    expect(kronaVehicleExpressOrderCard_v2.$input_releaseDate.isFocused()).to.be.true;
    kronaVehicleExpressOrderCard_v2.setReleaseDate(
      TestDataKrona.Vehicle.releaseMonth,
      TestDataKrona.Vehicle.releaseYear
    );
  });
  it(`Выбор модели`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.setVehicleModel(TestDataKrona.Vehicle.Model);
  });
  it(`Заполнение Топлива,КПП и Мощности`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.selectFuel(KronaVehicleFuelType.PETROL);
    kronaVehicleExpressOrderCard_v2.select_transmission(KronaVehicleTransmissionTypes.AUTO);
    kronaVehicleExpressOrderCard_v2.$input_enginePower.setValue(TestDataKrona.Vehicle.EnginePower);
  });
  it(`Получение списка модификаций`, function () {
    allureReporter.generateReport();
    expect(kronaVehicleExpressOrderCard_v2.$button_getModifications.isClickable()).to.be.true;
    kronaVehicleExpressOrderCard_v2.$button_getModifications.click();
    kronaVehicleExpressOrderCard_v2.$selector_modification.waitForEnabled({
      timeout: 2000,
      reverse: false,
    });
  });
  it(`Выбрать тип модификации`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.$selector_modification.selectByIndex(
      TestDataKrona.Vehicle.Modification
    );
  });
  it(`Заполнить оставшиеся поля`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.$input_Mileage.setValue(TestDataKrona.Vehicle.Mileage);
    kronaVehicleExpressOrderCard_v2.select_owners(KronaVehicleOwners.ONE);
    kronaVehicleExpressOrderCard_v2.select_incidents(KronaVehicleIncidents.NO);
    kronaVehicleExpressOrderCard_v2.select_tireState(KronaVehicleTireState.GOOD);
  });
  it(`Отправить запрос и получить ответ`, function () {
    allureReporter.generateReport();
    kronaVehicleExpressOrderCard_v2.$button_send.scrollIntoView();
    kronaVehicleExpressOrderCard_v2.$button_send.click();
    kronaVehicleExpressOrderCard_v2.$table_Result.waitForDisplayed({
      timeout: 15000,
      reverse: false,
    });
    makeScreenshot("SMOKE_СозданиеЗапросаЭкспрессТс_версия2");
  });
});
