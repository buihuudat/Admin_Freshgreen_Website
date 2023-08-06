const locale: string = "vi-VN";
const options: { style: string; currency: string } = {
  style: "currency",
  currency: "VND",
};

export const formattedAmount = (amount: number): string =>
  new Intl.NumberFormat(locale, options).format(amount);
