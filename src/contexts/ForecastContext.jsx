import { createContext, useContext, useState } from "react";

const ForecastContext = createContext();

function ForecastProvider({ children }) {
  const [model, setModel] = useState("ARIMA");
  const [series, setSeries] = useState("Inflation");
  return (
    <ForecastContext.Provider value={{ model, setModel, series, setSeries }}>
      {children}
    </ForecastContext.Provider>
  );
}

function useForecast() {
  const context = useContext(ForecastContext);
  if (context === undefined)
    throw new Error("ForecastContext was used outside ForecastProvider.");
  return context;
}

export { ForecastProvider, useForecast };
