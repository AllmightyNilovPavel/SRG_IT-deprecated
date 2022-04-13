export class BaikalHeader {
  get $logo() {
    //
    return browser.$(`a[href="/baikal/"]`);
  }
  get $button_map() {
    //
    return browser.$(`a[href*="/baikal/map"]`);
  }
  get $button_backToKrona() {
    //
    return browser.$(`a[href*="9r/expert/request/"]`);
  }
  get $button_newObject() {
    //
    return browser.$(`a[href="#"]`);
  }
  get $button_backToRbRequests() {
    //
    return browser.$(`a[href*="/9r/rbRequests"]`);
  }
}

export const baikalHeader = new BaikalHeader();
