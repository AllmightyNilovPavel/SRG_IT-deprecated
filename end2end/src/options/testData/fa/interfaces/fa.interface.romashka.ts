import { StringIterator } from "lodash";

export interface IFaRomashka {
  region: string;
  street: string;
  flat: string | number;
  floor: string | number;
  bankManager: string;
  buySellPrice: string | number;
}
