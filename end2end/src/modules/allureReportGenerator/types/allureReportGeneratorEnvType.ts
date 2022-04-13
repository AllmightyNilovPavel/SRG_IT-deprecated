import options from "options";

export const AllureTestEnv = {
  EnvBA: {
    name: "BA_HOST",
    value: options.ba.host,
  },
  EnvKrona: {
    name: "KRONA_HOST",
    value: options.krona.host,
  },
  EnvFA: {
    name: "FA_HOST",
    value: options.fa.host,
  },
  EnvExpress: {
    name: "EXPRESS_HOST",
    value: options.ExpressSite.host_basic,
  },
  EnvDR: {
    name: "EXPRESS_DR",
    value: "test.srg-it.ru/express.dr",
  },
  EnvBaikal: {
    name: "BAIKAL_HOST",
    value: options.Baikal.host,
  },
};
