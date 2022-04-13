import { kronaExpertRequestCard } from "../Krona";
import { baikalHeaderBeta } from "./beta";
import { BaikalEnumHeader } from "./enums";

/**
 * После того как разрабы пофиксят баг, удалить этот метод.
 * На текущий момент он позволяет авторизоваться в Байкале и избежать бага, когда Байкал попадает в /demo режим.
 * */
export function baikalDemoToBetaAuthHelper() {
  browser.pause(1000);
  console.log(`Текущий URL = ${browser.getUrl()}`);

  if (
    !browser.$(`//div[contains(@class,'Header_root')]//a[contains(text(),'Карта')]`).isClickable()
  ) {
    console.log(`Из-за бага перекинуло на /demo режим`);
    console.log(`Закрываем текущее окно Байкала`);
    browser.closeWindow();
    console.log(`Переключение на окно КРОНЫ`);
    browser.switchWindow("9r");
    console.log(`Из окна КРОНЫ еще раз нажимаем кнопку "Открыть в Байкале"`);
    kronaExpertRequestCard.$button_GoToBaikal.click();
    console.log(`Переключение на окно Байкала`);
    browser.switchWindow("baikal");
    baikalHeaderBeta.goToSection(BaikalEnumHeader.MAP);
  }
}
