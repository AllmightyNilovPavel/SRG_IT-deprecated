import { set } from "lodash";
import * as path from "path";
import { EnvOptionsProd } from "./hosts.prod";
import { EnvOptionsTest } from "./hosts.test";
const deepmerge = require("deepmerge");

export let options = deepmerge(
  process.env.ENVIRONMENT === "PROD" ? EnvOptionsProd : EnvOptionsTest,
  {
    parallel: 4,
    downloadDir: path.join(__dirname, "../..", "/.reports/downloads"),
    debug: 0,

    /** Тестовые Даты */
    Date: {
      today: new Date().toLocaleDateString(),
      // startOfCurrentWeek: new Date(),
      startOfCurrentMonth: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toLocaleDateString(),
      startOfCurrentYear: new Date(new Date().getFullYear(), 1, 1).toLocaleDateString(),
    },
  }
);

Object.entries(process.env)
  .filter(([key]) => /^option_/i.test(key))
  .filter(([key, val]) => !!val)
  .forEach(([key, val]) => set(options, key.replace(/^option_/, "").replace(/_/, "."), val));

if (options.debug) {
  console.log("Окружение после мержа: ", process.env.ENVIRONMENT);
  console.log(JSON.stringify({ options }, void 0, 2));
}

/** Настройки */
export default options;
