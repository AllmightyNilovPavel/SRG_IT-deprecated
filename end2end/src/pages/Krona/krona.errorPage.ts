class KronaErrorPage {
  get $errorBody() {
    return $(`body.background-error div.alert.alert-danger`);
  }

  get $alertMessage() {
    return $(`div.alert.alert-danger`);
  }

  get $alertStackTrace() {
    return $(`figure.stack-trace-block`);
  }
}
/**
 * Класс для работы со страницей появляющейся в Кроне при возникновении
 * какой-либо ошибки, чаще всего - при скачивании файлов.
 */
export const kronaErrorPage = new KronaErrorPage();
