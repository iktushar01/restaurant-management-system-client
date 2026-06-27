import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { currencyService } from "@/services/currencyService";
import { DEFAULT_CURRENCY, formatMoney, setActiveCurrency } from "@/lib/currency";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [loading, setLoading] = useState(true);

  const refreshCurrency = useCallback(async () => {
    try {
      const res = await currencyService.getDefault();
      setActiveCurrency(res.data);
      setCurrency(res.data);
    } catch {
      setActiveCurrency(DEFAULT_CURRENCY);
      setCurrency(DEFAULT_CURRENCY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveCurrency(DEFAULT_CURRENCY);
      setCurrency(DEFAULT_CURRENCY);
      setLoading(false);
      return;
    }

    setLoading(true);
    refreshCurrency();
  }, [isAuthenticated, refreshCurrency]);

  const value = useMemo(
    () => ({
      currency,
      loading,
      refreshCurrency,
      formatMoney,
    }),
    [currency, loading, refreshCurrency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    return {
      currency: DEFAULT_CURRENCY,
      loading: false,
      refreshCurrency: async () => {},
      formatMoney,
    };
  }
  return ctx;
}

export default CurrencyProvider;
