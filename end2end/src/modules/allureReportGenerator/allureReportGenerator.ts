import AllureReporter from "@wdio/allure-reporter";
import { AllureReporterProducts, AllureReporterSeverity } from "./enum";
import { AllureReportGeneratorArgs } from "./types";

/**
 * Этот класс являяется обёрткой для генератора тестовых отчётов.
 * Его нужно инициализировать перед началом выполнения каждого теста.
 */
export class AllureReporterHelper {
  private readonly baseObject: AllureReportGeneratorArgs;

  constructor(baseObject: AllureReportGeneratorArgs) {
    this.baseObject = baseObject;
  }

  /** Метод генерации тестового отчёта
   *
   * Дополнительную инфу по настройкам можно найти на странице:
   * @link https://webdriver.io/docs/allure-reporter/#supported-allure-api
   *
   * Метод принимает на вход стандартный набор аргументов
   * которые потом можно изменять и дополнять в последующих вызовах.
   * @param extraArgs `typeof AllureReportGeneratorArgs`
   *
   * @author Сергей Шумлянский | Нилов Павел
   * @version 1.3.0
   */
  generateReport(extraArgs?: AllureReportGeneratorArgs): void {
    const {
      env,
      severity = AllureReporterSeverity.NORMAL,
      product = AllureReporterProducts.EMPTY,
      story,
      description,
      issueId,
      additionalArguments,
    } = { ...this.baseObject, ...extraArgs };

    // Добавление информации о тестовом окружении
    if (env) AllureReporter.addEnvironment(env.name, env.value);
    // Добавляем показатель критичности
    AllureReporter.addSeverity(severity);
    // Делаем привязку теста к продукту
    AllureReporter.addFeature(product);
    // Добавляем "историю" - краткое описание
    if (story) AllureReporter.addStory(story);
    // добавляем полное описание шага
    if (description) AllureReporter.addDescription(description, "markdown");
    // добавляем информацию о принадлежности теста к задаче в Jira
    if (issueId) AllureReporter.addIssue(`${issueId}`);
    // добавление тестовых аргументов
    if (additionalArguments) {
      additionalArguments.forEach((argument) =>
        AllureReporter.addArgument(argument.argName, argument.argValue)
      );
    }
  }
}
