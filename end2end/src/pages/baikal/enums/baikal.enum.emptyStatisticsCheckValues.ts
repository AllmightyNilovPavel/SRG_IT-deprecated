/** enums для проверки пустых значений в статистике (они проверяются при построчной проверке таблицы статистики) */
export enum BaikalEnumEmptyStatisticsCheckValues {
  EMPTY_1 = "",
  EMPTY_2 = "несколько секунд / несколько секунд",
  EMPTY_3 = "/",
  EMPTY_4 = "0.0%",
  EMPTY_5 = "(0.0%)",
  EMPTY_6 = "(/)",
  EMPTY_7 = "(?%)",
  EMPTY_8 = "(?%) / (?%)",
  EMPTY_9 = "0",
  EMPTY_10 = "0/0",
  EMPTY_11 = "<Number format error> / <Number format error>",
  EMPTY_12 = "?%",
  EMPTY_13 = "( / )",
  EMPTY_14 = "(?%)\n" + "(?%) / (?%)",
  EMPTY_15 = " / ",
  EMPTY_16 = "()",
}
