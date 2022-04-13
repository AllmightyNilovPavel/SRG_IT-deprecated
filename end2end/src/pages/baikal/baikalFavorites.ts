export class BaikalFavorites {
  /** Таблица избранного */
  get $favorites_tableMain() {
    return browser.$(`div[class*="Favorite_root"]`);
  }
  /** Кнопка "Открыть расчётник" */
  get $favorites_buttonOpenCalc() {
    return this.$favorites_tableMain.$(`a[href*="/baikal/calculations"]`);
  }
  /** Содержимое таблицы избранного */
  get $favorites_tableContent() {
    return this.$favorites_tableMain.$(`div[class*="Favorite_content"]`);
  }

  public get $favorites_objInFav() {
    return browser.$(`//*[@id="root"]/div/div[2]/div/div[2]/div[2]/table/tbody/tr[2]/td[2]/a`);
  }
}

/** Таблица избранного */
export const baikalFavorites = new BaikalFavorites();
