# Аннотация к AllureReportGenerator

## Что это такое?

Функционал описанный в файле `allureReportGenerator.ts` является обёрткой над
стандартным пакетом `Allure Report`, для более удобного формирования тестовых отчётов
при выполнении тестов.

## Зачем нужно?

Функционал был реализован длятого чтобы вручную не прописывать параметры отчёта
для каждого шага каждого теста, а один раз перед началом теста инициализировать
параметры запуска и передавать их в каждый шаг теста.

## Примеры использования.

**Инициализация**

- Перед началом выполнения каждого теста, в блоке `describe` нужно установить общие
  параметры для выполнения тестов

```ts
  describe(`testname`, function() {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  ...
  it('step name', function(){
    ...
  });
  ...
  ...
  });
```
