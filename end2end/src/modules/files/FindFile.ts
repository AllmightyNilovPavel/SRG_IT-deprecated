import * as F_WFE from "./file.waitForFileExists";
import * as F_SIB from "./file.sizeInBytes";

/**
 * Функция ищет файл по заданному имени
 * в загрузочной директории (`options.downloadDir`)
 * и проверяет что он по размеру больше ожидаемого.
 *
 * Рекомендуется всегда вызывать через `await`
 *
 * @param FileName - часть имени файла который требуется найти
 * @param ExpectedMinimumFileSize - минимальный ожидаемый размер файла
 * @returns TRUE | FALSE
 */
export async function FindFile(FileName: string, ExpectedMinimumFileSize: number) {
  let RESULT: boolean = false;
  let fileSize: number = 0;

  let fileExist = F_WFE.checkFileExist(FileName, 50000) // Альтернативная проверка
    .then(
      (result) => {
        fileSize = F_SIB.getFileSizeInBytes(result); // считаем размер файла
        return true;
      },
      (reason) => {
        console.log(`Промис упал: ${reason}`);
        return false;
      }
    )
    // Этот блок отлавливает ошибки из предшествующего блока Then()
    .catch((reason) => {
      return false;
    });

  // Ждём инфы от функции поиска файла для проверки размера файла.
  if (await fileExist) {
    fileSize < ExpectedMinimumFileSize ? (RESULT = false) : (RESULT = true);
  } else {
    RESULT = false;
  }

  return RESULT;
}
