import { PathLike } from "fs";
import * as fse from "fs-extra";
import { debugLogging } from "modules";
import options from "options";
import * as path from "path";
import { setInterval, setTimeout } from "timers";

/**
 * Метод который ищет файл в указанной директории
 * за отведённый промежуток времени.
 * @param filePath
 * @param timeout
 * @returns Promise<boolean>
 */
export function checkFileExist(fileName: string, timeout: number): Promise<PathLike> {
  return new Promise(function (resolve, reject) {
    debugLogging(`Имя файла переданное в метод: ${fileName}`);
    let newDir: string;
    let fileNameModified: string = fileName + `.`;
    debugLogging(`Имя файла без расширения: ${fileNameModified}`);
    let fileNameWithExt: string;

    // Считываем директорию куда скчиваются файлы
    const files = fse.readdirSync(options.downloadDir);
    debugLogging(`-------------------------------------------------------------------------`);
    files.forEach((file) => {
      debugLogging(`Файл сам по себе: ${file}`);
      if (file.match(fileNameModified)) {
        fileNameWithExt = file;
        newDir = path.join(options.downloadDir + "/" + fileNameWithExt);
        debugLogging(`File path: ${newDir}`);
      }
    });
    debugLogging(`-------------------------------------------------------------------------`);

    // Ищем файл конкретно по имени
    function watchForFileBasename() {
      if (fse.pathExistsSync(newDir)) {
        clearInterval(intervalFileCheckBasename);
        clearTimeout(final);
        debugLogging(`Нашёл файл по имени: ${fileNameWithExt} в директории ${newDir}`);
        resolve(newDir);
      }
    }
    // Запускаем функции поиска по интервалам
    const intervalFileCheckBasename = setInterval(watchForFileBasename, timeout / 10);
    // Если не находим ничего за отведённое время - всё дропаем
    const final = setTimeout(() => {
      debugLogging(`Поиск файла не удался.`);
      clearInterval(intervalFileCheckBasename);
      reject(new Error(`Файл не появился в системе после заданного интервала времени: ${timeout}`));
    }, timeout);
  });
}
