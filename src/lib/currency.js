export const DEFAULT_CURRENCY = {
  name: "US Dollar",
  code: "USD",
  symbol: "$",
  symbolPosition: "BEFORE",
  decimalPlaces: 2,
};

let activeCurrency = { ...DEFAULT_CURRENCY };

export function setActiveCurrency(currency) {
  if (!currency) return;
  activeCurrency = {
    ...DEFAULT_CURRENCY,
    ...currency,
    decimalPlaces: Number(currency.decimalPlaces ?? DEFAULT_CURRENCY.decimalPlaces),
  };
}

export function getActiveCurrency() {
  return activeCurrency;
}

export function formatMoney(value) {
  const num = Number(value ?? 0);
  const safe = Number.isNaN(num) ? 0 : num;
  const decimals = activeCurrency.decimalPlaces ?? 2;
  const formatted = safe.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (activeCurrency.symbolPosition === "AFTER") {
    return `${formatted} ${activeCurrency.symbol}`.trim();
  }

  return `${activeCurrency.symbol}${formatted}`;
}
