import { B2P } from "options/testData/paySystems";
import { bestToPay } from "./b2p.main";

/**
 * Можно дёрнуть метод с кастомным Урлом и данными карты
 *
 * @param url который даётся после перехода на страницу оплаты (`Например: https://test.best2pay.net/webapi/Authorize?sector=906&id=992777&signature=NmQxZDVkZGYzMTVjN2RhZTZiNjYwNTlmMGRhNWJmODk%3D`)
 * @param dataObj
 */
export function fullPayByCardB2P(url: string, dataObj: B2P | any) {
  browser.url(url);
  bestToPay.waitForLoad(url);

  let cardData = JSON.parse(dataObj);
  console.log("Полученные тестовые данные", dataObj);
  console.log("Тестовые данные после парсинга: ", cardData);

  bestToPay.fillPaymentData_new(cardData);
}
