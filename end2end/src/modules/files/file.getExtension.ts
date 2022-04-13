import * as fse from "fs-extra";
import * as path from "path";

/**
 * Функция поиска полного имени файла (с расширением) в директории.
 * Если известна только часть.
 *
 * @param downloadDir - директория для поиска файла
 * @param fileName - имя файла расширение которого требуется найти
 * @returns имя файла вместе с расширением в виде `string`
 */
export function getFileExtension(downloadDir: string, fileName: string) {
  let fileNameWithExtension: string;

  let dirCont = fse.readdirSync(downloadDir);
  console.log(`
-----------------------------
${dirCont.toString()}
-----------------------------
`);

  let files = dirCont.filter(function (elm) {
    return elm.match(fileName);
  });
  // let fileExist = F_WFE.waitForFileExists(path.join(downloadDir,files[0]),100000)

  try {
    fileNameWithExtension = path.basename(files[0]);
  } catch (error) {
    throw new Error("Файл не был найден");
  }

  return fileNameWithExtension!;
}
