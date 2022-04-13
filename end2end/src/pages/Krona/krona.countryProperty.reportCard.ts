class KronaCountryPropertyReportCard {
  path = "/country_property/report";

  /** Информационный блок по объекту */
  get $countryPropRep_summary() {
    return $("#summary");
  }
}

/** Карточка объекта "Жилой Дом" */
export const kronaCountryPropertyReportCard = new KronaCountryPropertyReportCard();
