import { AllureReporterProducts, AllureReporterSeverity } from "../enum";

export interface AllureReportGeneratorArgs {
  /** Окружение */
  env?: IAllureTestEnv;
  /** Важность */
  severity?: AllureReporterSeverity;
  /** Продукт */
  product?: AllureReporterProducts;
  /** Заголовок теста / Краткое описание */
  story?: string;
  /** Полное описание */
  description?: string;
  /** Номер задачи в JIRA */
  issueId?: string;
  /** Дополнительные аргументы */
  additionalArguments?: argument[];
}

interface argument {
  argName: string;
  argValue: string | number;
}

interface IAllureTestEnv {
  name: string;
  value: string;
}
