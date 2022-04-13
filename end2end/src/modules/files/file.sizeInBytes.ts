import * as fse from "fs-extra";

export function getFileSizeInBytes(FilePathFull: fse.PathLike) {
  // let fileCheck: boolean;
  // let fileContents: Buffer;
  // let fileStats: fse.Stats;
  // let fileSize: number;

  let fileCheck = fse.existsSync(`${FilePathFull.toString()}`);
  if (fileCheck === true) {
    // let fileContents = fse.readFileSync(`${FilePathFull.toString()}`);
    let fileStats = fse.statSync(`${FilePathFull.toString()}`);
    let fileSize = fileStats.size;
    return fileSize;
  } else return -1;
}
