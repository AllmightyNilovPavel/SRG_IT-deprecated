export const TestDataPaySystems = {
  best2pay: {
    cardNum: "5209 2045 8386 6906",
    cardDate: "1121",
    cardholderName: "Nilov",
    cardCvc: "294",
    email: "nilovpd@srgroup.ru",
  },
  best2payRoman: {
    cardNum: "4809 3888 8965 5340",
    cardDate: "0522",
    cardholderName: "Lysyuk",
    cardCvc: "195",
    email: "LysyukRS@srgroup.ru",
  },

  payKeeper: {},
};

export interface B2P {
  cardNum: string;
  cardDate: string;
  cardholderName: string;
  cardCvc: string;
  email: string;
}
