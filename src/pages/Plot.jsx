import Dropdown from "../ui/Dropdown";
import { useForecast } from "../contexts/ForecastContext";
import TimeSeriesChart from "../features/plot/TimeSeriesChart";
import useInflation from "../features/plot/useInflation";
import useUnemployment from "../features/plot/useUnemployment";
import useIMACEC from "../features/plot/useIMACEC";
import useTPM from "../features/plot/useTPM";

function Plot() {
  const { model, setModel, series, setSeries } = useForecast();
  return (
    <div className="grid grid-rows-2 grid-cols-[.3fr_1fr]">
      <div className="row-start-1 row-end-2 col-start-1 col-end-2">
        <label>Select Macroeconomic Variable</label>
        <Dropdown
          options={["Inflation", "Unemployment", "IMACEC", "TPM"]}
          state={series}
          setState={setSeries}
        />
        {series === "IMACEC" && (
          <p className="text-sm text-red-600">
            Índice Mensual de Actividad Económica
          </p>
        )}
        {series === "TPM" && (
          <p className="text-sm text-red-600">Tasa de Política Monetaria</p>
        )}
      </div>
      <div className="row-start-2 row-end-3 col-start-1 col-end-2">
        <label>Select Model</label>
        <Dropdown
          options={["ARIMA", "SARIMA", "HoltWinters"]}
          state={model}
          setState={setModel}
        />
        {model === "HoltWinters" && (
          <p className="text-sm text-red-600">Triple Exponential Smoothing</p>
        )}
      </div>
      <div className="row-start-1 row-end-3 col-start-2 col-end-3">
        {series === "Inflation" && <TimeSeriesChart getData={useInflation} />}
        {series === "Unemployment" && (
          <TimeSeriesChart getData={useUnemployment} />
        )}
        {series === "IMACEC" && <TimeSeriesChart getData={useIMACEC} />}
        {series === "TPM" && <TimeSeriesChart getData={useTPM} />}
      </div>
    </div>
  );
}

export default Plot;
