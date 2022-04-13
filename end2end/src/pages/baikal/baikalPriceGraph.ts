export class BaikalPriceGraph {
  /** База таблицы графиков цен */
  public get $priceGraph_root() {
    return browser.$(`div[class*="GraphSelector_root"]`);
  }
  /** Блок отрисовки графиков */
  public get $priceGraph_priceChart() {
    return this.$priceGraph_root.$(`div[class*="Chart_graph"]`);
  }

  /** Шкала цен объектов */
  public get $$priceGraph_columnPrices() {
    return this.$priceGraph_root.$$(`div[class*="TitleRowRight"]`);
  }

  // ----------------------------------------------------------------
  //                            Функции
  // ----------------------------------------------------------------
}

/** Таблица графиков цен */
export const baikalPriceGraph = new BaikalPriceGraph();
