import options from "options";

/**
 * Функция находит первый элемент на странице содержащий указанный в параметре текст
 *
 * @param textToFind любой текст(не точное совпадение)
 */
export function FindElementByText(textToFind: string): WebdriverIO.Element {
  if (options.debug) console.log(`Мы собираемся искать элемент содержащий текст: ${textToFind}`);

  let foundElement = $(`//*[contains(.,"${textToFind}")]`);

  if (foundElement !== null) return foundElement;
  else
    throw new Error(
      `Не удалось найти элемент на странице ${browser.getUrl()} содержащий текст "${textToFind}".`
    );
}
