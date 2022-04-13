import { KronaRequestsSelhozExposition } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.exposition";
import { KronaRequestsSelhozProperttyAccess } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.propertyAccess";
import { KronaRequestsSelhozThirdPartyBurdening } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.thirdPartyBurdening";
import { KronaRequestsSelhozValuationPurpose } from "pages/Krona/Enums/BankSpecific/selhoz/krona.enum.requests.selhoz.valuationPurpose";
import { RequestsBase } from "../../krona.requests.base";

export class KronaSelhozRequestsBase extends RequestsBase {
  get $selectorPropertyAccess() {
    return this.$root.$(`#propertyAccess`);
  }
  get $selectorValuationPurpose() {
    return this.$root.$(`#valuationPurpose`);
  }
  get $selectorThirdPartyBurdening() {
    return this.$root.$(`#thirdPartyBurdening`);
  }
  get $selectorExposition() {
    return this.$root.$(`#exposition`);
  }

  selectPropertyAccess(propertyAccess: KronaRequestsSelhozProperttyAccess) {
    let target = this.$selectorPropertyAccess;

    target.waitForExist();
    target.waitForDisplayed();
    target.selectByAttribute("value", propertyAccess);
  }
  selectValuationPurpose(valPurpose: KronaRequestsSelhozValuationPurpose) {
    let target = this.$selectorValuationPurpose;

    target.waitForExist();
    target.waitForDisplayed();
    target.selectByAttribute("value", valPurpose);
  }
  selectThirdPartyBurdening(burdening: KronaRequestsSelhozThirdPartyBurdening) {
    let target = this.$selectorThirdPartyBurdening;

    target.waitForExist();
    target.waitForDisplayed();
    target.selectByAttribute("value", burdening);
  }
  selectexposition(exposition: KronaRequestsSelhozExposition) {
    let target = this.$selectorExposition;

    target.waitForExist();
    target.waitForDisplayed();
    target.selectByAttribute("value", exposition);
  }
}
