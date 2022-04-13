import * as fse from "fs-extra";
import { join } from "path";

/**
 * Функция рекурсивной очистки директории
 * @param dir
 */
export function clearDirectory(dir: string) {
  let list = fse.readdirSync(dir);

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < list.length; i++) {
    let filename = join(dir, list[i]);
    let stat = fse.statSync(filename);

    if (filename == "." || filename == "..") {
      // pass these files
    } else if (stat.isDirectory()) {
      // rmdir recursively
      clearDirectory(filename);
    } else {
      // rm fiilename
      fse.unlinkSync(filename);
    }
  }
  fse.rmdirSync(dir);
}
