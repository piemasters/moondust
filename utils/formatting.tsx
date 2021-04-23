export const formatPercent = (number) => `${Number(number).toFixed(2)}%`;

export const formatCurrency = (number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(number);
