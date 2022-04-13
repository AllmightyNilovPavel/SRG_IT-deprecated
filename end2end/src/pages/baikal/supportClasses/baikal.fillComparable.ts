import { debugLogging } from "modules";
import { IBaikalFillComparableProps } from "options/testData/baikal";
import { BaikalCalculationBetaCalculation } from "../beta";

export class BaikalFillComparable extends BaikalCalculationBetaCalculation {
  private readonly analog_number: number;
  private readonly props: IBaikalFillComparableProps;

  /**
   *
   * @param analog_number - Номер аналога
   * @param props - Данные для заполнения аналога
   * */
  constructor(analog_number: number, props: IBaikalFillComparableProps) {
    super(), (this.analog_number = analog_number);
    this.props = props;
  }

  fillComparable() {
    if (this.props.AdSource) {
      this.inputOriginalAdSource(this.analog_number, this.props.AdSource);
    }
    if (this.props.OfferPrice) {
      this.inputOfferPrice(this.analog_number, this.props.OfferPrice);
    }
    if (this.props.reselect_address) {
      this.reselectAddress(this.analog_number);
    }
    if (this.props.BidAdjustment) {
      this.inputBidAdjustment(this.analog_number, this.props.BidAdjustment);
    }
    if (this.props.WallMaterial) {
      this.selectWallMaterial(this.analog_number, this.props.WallMaterial);
    }
    if (this.props.HouseBuiltYear) {
      this.inputHouseBuiltYear(this.analog_number, this.props.HouseBuiltYear);
    }
    if (this.props.Storeys) {
      this.inputStoreys(this.analog_number, this.props.Storeys);
    }
    if (this.props.Floor) {
      this.inputFloor(this.analog_number, this.props.Floor);
    }
    if (this.props.Rooms) {
      this.inputRooms(this.analog_number, this.props.Rooms);
    }
    if (this.props.Repairs) {
      this.selectRepairs(this.analog_number, this.props.Repairs);
    }
    if (this.props.SquareIncludingSummer) {
      this.inputSquareIncludingSummer(this.analog_number, this.props.SquareIncludingSummer);
    }
    if (this.props.SquareExcludingSummer) {
      this.inputSquareExcludingSummer(this.analog_number, this.props.SquareExcludingSummer);
    }
    if (this.props.LivingSquare) {
      this.inputLivingSquare(this.analog_number, this.props.LivingSquare);
    }
    if (this.props.KitchenSquare) {
      this.inputKitchenSquare(this.analog_number, this.props.KitchenSquare);
    }
    if (this.props.Furniture) {
      this.selectFurniture(this.analog_number, this.props.Furniture);
    }
    if (this.props.disable_analog) {
      this.disableAnalog(this.analog_number);
    }

    // Проверяем правильно ли записались все значения
    // и если не правильно - перезапускаем процедуру заполнения этого аналога
    Object.entries(this.props).forEach((value) => {
      let propertyName = value[0];
      let propertyValue = value[1];
      debugLogging(`Имя ${propertyName}, Значение: ${propertyValue}`);

      if (propertyName != "reselect_address" && propertyName != "disable_analog") {
        let check = this[`getValueOf${propertyName}`](this.analog_number);
        debugLogging(`Проверочное поле: ${check} = ${propertyValue} ?`);
        if (check != propertyValue) this.fillComparable();
      }
    });
  }
}
