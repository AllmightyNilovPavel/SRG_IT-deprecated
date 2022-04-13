export class ReactFooter {
  private get $footer_root() {
    return browser.$(`class*="Footer_root"`);
  }

  get $facebook_banner() {
    return this.$footer_root.$(`a[href*="facebook"]`);
  }
}
/** Футер БО */
export const reactFooter = new ReactFooter();
