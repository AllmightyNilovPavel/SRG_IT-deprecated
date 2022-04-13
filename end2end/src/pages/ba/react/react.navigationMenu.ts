import { react_NavMenuButtonsSecondary } from "./enums";

class ReactNavigationMenu {
  private get $navMenu_root() {
    return browser.$(`div[class*="MenuNavs_root"]`);
  }
  private get $navMenu_primary() {
    return this.$navMenu_root.$(`div[class*="menu1"]`);
  }
  private get $navMenu_secondary() {
    return this.$navMenu_root.$(`div[class*="menu2"]`);
  }

  navidateTo_secondary(button: react_NavMenuButtonsSecondary) {
    this.$navMenu_secondary.$(`a[href*="${button}"]`).click();
  }
}

export const reactNavMenu = new ReactNavigationMenu();
