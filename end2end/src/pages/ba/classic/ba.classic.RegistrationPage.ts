class RegistrationPage {
  path = "/register.html";

  /** Описание Элементов страницы */
  /** имейл */
  get $input_email() {
    return browser.$("#email");
  }
  get $input_password() {
    // пароль
    return browser.$("#password");
  }
  get $input_passwordConfirm() {
    // повтор пароля
    return browser.$("#password1");
  }
  get $input_lastName() {
    // фамилия
    return browser.$("#lastName");
  }
  get $input_firstName() {
    // имя
    return browser.$("#firstName");
  }
  get $input_middleName() {
    // отчество
    return browser.$("#middleName");
  }
  /** Работаю На ... */
  private get $selector_workFor() {
    return browser.$("#workFor");
  }
  get $input_companyName() {
    // наименование компании
    return browser.$(`input[name="companyData.title"]`);
  }
  get $input_companyInn() {
    // инн
    return browser.$(`input[name="companyData.inn"]`);
  }
  get $input_compnayKpp() {
    // кпп
    return browser.$(`input[name="companyData.kpp"]`);
  }
  get $checkbox_filial() {
    // чекбокс наличия филиала
    return browser.$("#noBranch");
  }
  get $input_filialName() {
    // название филиала
    return browser.$(`input[name="companyData.branch"]`);
  }

  // Функции
  selectCompanyType(companyType: string) {
    companyType === "company"
      ? this.$selector_workFor.selectByAttribute("value", "company")
      : this.$selector_workFor.selectByAttribute("value", "individual");
  }
}
/** Страница регистрации */
export const registrationPage = new RegistrationPage();
