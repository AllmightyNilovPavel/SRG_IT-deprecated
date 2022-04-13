require("source-map-support/register");
require("source-map-support").install({
  environment: "node",
  hookRequire: true,
});
const fse = require("fs-extra");
const path = require("path");
const { default: AllureReporter } = require("@wdio/allure-reporter");
const parallel = Number(process.env.option_parallel || "4")
const downloadDir = path.join(__dirname, "/.reports/downloads");
const screenshotPath = path.join(__dirname,"/.reports/screenshots");
let specFileName

exports.config = {
  // ======================================================================================================
  //                                         Конфиг для запускатора
  // ======================================================================================================
  /** Файлыкоторые не нужно запускать */
  exclude: [
    // 'path/to/excluded/files'
  ],
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  host: "127.0.0.1",
  hostname: "localhost",
  //
  // Override default path ('/wd/hub') for chromedriver service.
  // path: "/wd/hub",
  // port: "4444",
  // path: "/",
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      // transpileOnly: true,
      // compilerOptions: {
      //   baseUrl: "./src",
      // },
      // files: true,
      project: "tsconfig.json",
      // baseUrl: "./src",
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      baseUrl: "./",
    },
  },
  runner: "local",
  screenshotPath: screenshotPath,
  specs: ["src/spec/**"],
  sync: true,

  outputDir: "./.reports/logs",
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "info",
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: "",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 50000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  /** 
  * Общий параметр для определения максимального количества
  * одновременно запущенных экземпляров браузера.
  * 
  * Будет перезаписан таким же параметром из настроек
  * для отдельных браузеров.
  */
  maxInstances: parallel,
  //
  // capabilities: [
  //   {
  //     // maxInstances can get overwritten per capability. So if you have an in-house Selenium
  //     // grid with only 5 firefox instances available you can make sure that not more than
  //     // 5 instances get started at a time.
  //     maxInstances: 1,
  //     //
  //     browserName: "chrome",
  //     // If outputDir is provided WebdriverIO can capture driver session logs
  //     // it is possible to configure which logTypes to include/exclude.
  //     // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
  //     // excludeDriverLogs: ['bugreport', 'server'],
  //   },
  // ],
  //
  capabilities: [
    {
      /** 
       * Параметр для определения максимального количества
       * одновременно запущенных экземпляров браузера.
       */
      maxInstances: parallel,
      browserName: "chrome",
      "goog:chromeOptions": {
        // binary: "/usr/bin/chrome",
        args:
          process.env.headless || process.env.docker
            ? [
                // "--remote-debugging-address=0.0.0.0",
                // "--remote-debugging-port=9515",
                "headless",
                "window-size=1280,900",
                "incognito",
                "--no-sandbox",
                // "disable-software-rasterizer",
                "disable-dev-shm-usage",
                "disable-gpu",
                "disable-extensions",
              ]
            : [
                "--no-sandbox",
                "--disable-gpu",
                "--incognito",
                "--disable-extensions",
                "--window-size=1280,900"
              ],

        prefs: {
          directory_upgrade: true,
          prompt_for_download: false,
          "download.default_directory": downloadDir,
        },
      },
    },
  ],
// ======================================================================================================
//                                      Команды для запуска групп тестов
// ======================================================================================================
  suites: {
    smoke_krona: ["src/spec/Krona/SmokeTest/**"],
    smoke_fa: ["src/spec/fa/SmokeTest/**"],
    smoke_ba_classic: ["src/spec/ba/classic/smoke/**"],
    smoke_ba_react: ["src/spec/ba/react/smoke/**"],
    alltest_krona: ["src/spec/Krona/**"],
    alltest_fa: ["src/spec/fa/**"],
    alltest_ba: ["src/spec/ba/**"],
    release: [
      "src/spec/Krona/SmokeTest/**",
      "src/spec/ba/classic/smoke/**",
      "src/spec/fa/SmokeTest/**",
    ],
    integration: ["src/spec/BusinessProcesses/**"],
  },
// ======================================================================================================
//                                         Тестовые сервисы
// ======================================================================================================
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    [
      "chromedriver",
      {
        logFileName: "wdio-chromedriver.log", // default
        outputDir: "driver-logs", // overwrites the config.outputDir
        // port: 4444,
        // path: "/", // "--silent"
        args: [
          "--whitelisted-ips=127.0.0.1",
          // "--enable-chrome-logs",
        ],
      },
    ],
  ],
  // chromeDriverArgs: [
  // "--port=4444",
  //   "--url-base='/'",
  //   `--binary=./node_modules/puppeteer/.local-chromium/linux-706915/chrome-linux/chrome`,
  // ],
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "mocha",
  //
  // The number of times to retry the entire specfile when it fails as a whole

  specFileRetries: require("os").platform() === "linux" ? 0 : 0,

  // Delay in seconds between the spec file retry attempts
  specFileRetriesDelay: 0,
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: false,

  /** Options to be passed to Mocha.
  * See the full list at http://mochajs.org/
  */ 
  mochaOpts: {
    ui: "bdd",
    require: ["tsconfig-paths/register"],
    bail: true,
    /** timeout вычисляется как "минута * секунду * милисекунду" */
    timeout: 5 * 60 * 1000,
    retries: 1,
    // retries: require("os").platform() === "linux" ? 3 : 1,
  },

  /** 
    * Настройки для генераторов тестовых отчётов для стандартного Ввода\Вывода (консоли).
    * 
    * Генератор поддерживаемый по дефолту - 'dot'.
    * дополнительная инфа: https://webdriver.io/docs/dot-reporter.html
  */
  reporters: [
    [
      "dot",
      {
        outputDir: "./.reports",
      },
    ],
    [
      "spec",
      {
        outputDir: "./.reports",
      },
    ],
    /** По настройкам для этого блока смотри
    * @link https://webdriver.io/docs/allure-reporter/#configuration
    */
    [
      "allure",
      {
        outputDir: "./.reports/allure",
        // outputDir: allureCurrentRunDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: false,
        tmsLinkTemplate:'https://AllureTestOps/{}',
        issueLinkTemplate:'https://srgroup.atlassian.net/browse/{}'
      },
    ],
    [
      "junit",
      {
        outputDir: "./.reports/junit",
      },
    ],
  ],
  // ======================================================================================================
  //                                              Hooks
  // ======================================================================================================
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Запускается перед тем как стартанут ВСЕ другие процессы.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    // Подготовка папки куда будут скачиваться файлы
    if (!fse.existsSync(downloadDir)) {
      fse.mkdirSync(downloadDir);
    } else {
      fse.emptyDir(downloadDir)
    }
    // Подготовка папки куда будут сохраняться скриншоты
    if (!fse.existsSync(screenshotPath)) {
      fse.mkdirSync(screenshotPath);
    } else {
      fse.emptyDir(screenshotPath)
    }
    if(!fse.existsSync(screenshotPath))
      fse.mkdirSync(screenshotPath)
  },

  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
  },

  /**
   * Группа методов которые выполняются непосредственно перед запуском теста.
   * В этой точке у нас есть доступ ко всем глобальным переменным типа `browser`.
   * 
   * Это идеальное место чтобы настраивать кастомные команды.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs - список тестовых файлов которые будут запущены.
   */
  before: function (capabilities, specs) {
    specFileName = specs[0]
    // require("chromedriver").start();
    // require("ts-node").register({
    //   files: true,
    // });
    // ------------ Кастомные команды ----------------
    browser.overwriteCommand(
      "scrollIntoView",
      function (origScrollIntoView) {
        return origScrollIntoView({ block: "center", inline: "center" });
      },
      true
    );
  },

  /**
   * Выполняется непосредственно перед тем как будет выполнена
   * любая команда принадлежащая классу WebdriverIO.
   * 
   * @param {String} commandName - имя исполняемой команды
   * @param {Array} args - аргументы которые получит команда
   */
  beforeCommand: function (commandName, args) {
  },

  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest: function (test) {
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  beforeHook: function () {
  },
  /**
   * Тут тоже не понятно когда будет выполнено
   * @param {*} result 
   * @param {*} capabilities 
   * @param {*} specs 
   */
  after: function (result, capabilities, specs){
    console.log(`Выполнение команд блока 'after'.`);
    var filename = test.title.replace(/\s+/g, '_').replace(/[.]+/g,'_');

    if(result === 1){
      AllureReporter.addArgument('ErrorUrl',browser.getUrl());
      AllureReporter.addArgument('Error Timestamp',new Date().toISOString());

      browser.maximizeWindow()
      browser.saveScreenshot(`${screenshotPath}/${filename}_afterTest.png`);
    } 
  },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  afterHook: function () {
  },
  /**
   * Всё описанное в этом блоке будет выполнено после каждого `IT` (в Mocha/Jasmine).
   * @param {Object} test test details
   */
  afterTest: function (test, context, {error, passed}) {
    var filename = test.title.replace(/[\.\s]+/g, "_").replace(/_+$/, "").replace(/(?:[']|["])/g, "");
    var filePath = path.join(this.screenshotPath,'/', filename + '.png');
    const errorPage = browser.$(`//div[@class="alert alert-danger" and @role='alert']/strong`)

    if(!passed){
      if(errorPage.isDisplayed()) AllureReporter.addArgument('Error Code', errorPage.match(/\[\d+\_\d+\]/g)[0]);
      AllureReporter.addArgument('Error Url', browser.getUrl());
      AllureReporter.addArgument('Error Timestamp', new Date().toISOString()); 
      browser.maximizeWindow();
      browser.saveScreenshot(filePath);
    } else {
      AllureReporter.addArgument('Test Url', browser.getUrl());
      AllureReporter.addArgument('Test execution timestamp', new Date().toISOString()); 
      // AllureReporter.addArgument('Test file name: ', specFileName);
      browser.saveScreenshot(filePath);
    }
  },
  /**
   * Вообще не очень понятно после чего эти команды будут выполнены.
   * @param {*} test 
   * @param {*} context 
   * @param {*} param2 
   */
  afterStep: function (test, context, { error, result, duration, passed, retries }) {
  //   var filename = test.title.replace(/\s+/g, '_').replace(/[.]+/g,'_');

  //   if (error) {
  //     console.log(`На шаге "${test.title}" произошла ошибка. На странице ${browser.getUrl()}.`)
  //     console.log(`Код ошибки: `,error);
  //     browser.saveScreenshot(`${screenshotPath}/${filename}`);
  //   }
  //   if(!test.passed || result.error){
  //     console.log(`На шаге "${test.title}" произошла ошибка. На странице ${browser.getUrl()}.`)
  //     console.log(`Код ошибки: `,result.error);
  //     browser.saveScreenshot(`${screenshotPath}/${filename}`);
  //   }
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
    // if (error) {
    //   console.log(`Произошла ошибка при выполнении команды ${commandName}. Текст ошибки ${error}`);
    //   browser.takeScreenshot();
    // }
  },

  /**
   * Блок команды которые выполняются после блока `DESCRIBE`(т.е. всех тестов одного файла).
   * 
   * У нас всё ещё есть доступ ко всем глобальным переменным используемых в тестах в этом блоке.
   * @param {Number} result  - 0 - тест УСПЕШЕН, 1 - тест НЕ УСПЕШЕН
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {
    var filename = test.title.replace(/\s+/g, '_').replace(/[.]+/g,'_');
    var filePath = path.join(this.screenshotPath,'/', filename, '.png');

    if(result === 1){
      AllureReporter.addArgument('Error Url',browser.getUrl());
      AllureReporter.addArgument('Error Timestamp',new Date().toISOString());
      // console.log('Specs: ',JSON.stringify(specs,0,2));
      browser.maximizeWindow();
      browser.saveScreenshot(filePath);
    } else {
      AllureReporter.addArgument('Test file name: ', specs[0]);
      console.log('Specs: ',JSON.stringify(specs,0,2));
      browser.maximizeWindow();
      browser.saveScreenshot(filePath);
    }
  },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: function (config, capabilities, specs) {
  //   browser.deleteAllCookies();
  //   browser.deleteSession();
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function(exitCode, config, capabilities, results) {
  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  onReload: function(oldSessionId, newSessionId) {
  }
};
