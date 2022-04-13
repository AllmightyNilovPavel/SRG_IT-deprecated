class BaLandingPage {
  path = "/landing";

  get $button_LandingRegister() {
    return browser.$("body > main > section.one-section > div > div > a");
  }
}

export const baLandingPage = new BaLandingPage();
