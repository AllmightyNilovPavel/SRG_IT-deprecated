import { KronaCompanyCardBase } from "./krona.companyCard.base";
import { KronaCompanyCardFunctions } from "./krona.companyCard.functions";

class KronaCompanyCard {
  BASE = new KronaCompanyCardBase();
  FUNCTIONS = new KronaCompanyCardFunctions();
}

export const kronaCompanyCard = new KronaCompanyCard();
