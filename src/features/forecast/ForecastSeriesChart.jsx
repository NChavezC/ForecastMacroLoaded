import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  prepareForecastData,
  prepareTimeSeriesData,
} from "../../helpers/helpers";
import Spinner from "../../ui/Spinner";
import Papa from "papaparse";
import { useForecastData } from "./useForecastData";
import { useForecast } from "../../contexts/ForecastContext";
import Button from "../../ui/Button";

function ForecastSeriesChart({ getData }) {
  const { series, model } = useForecast();

  const { loading: loadingData, data: original } = getData();
  console.log(original);

  const { loading: loadingForecast, data: forecast } = useForecastData({
    model,
    series,
  });
  console.log(forecast);

  const mergeOriginal = prepareTimeSeriesData(original);

  const mergeForecast = prepareForecastData(forecast);

  const mergedData = [...mergeOriginal, ...mergeForecast];

  function downloadForecastOnly() {
    const csvData = mergeForecast.map((row) => ({
      date: row.date,
      forecast: row.forecast,
    }));

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "forecast_only.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadFullData() {
    const fullData = [
      ...mergeOriginal.map((row) => ({
        date: row.date,
        value: row.value,
        data: "original",
      })),
      ...mergeForecast.map((row) => ({
        date: row.date,
        value: row.value,
        data: "forecast",
      })),
    ];

    const csvString = Papa.unparse(fullData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "full_data_with_forecast.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (loadingForecast || loadingData) return <Spinner />;
  return (
    <>
      <header className="flex justify-center items-center">
        <h1 className="text-xl">
          {series} Forecast with {model} Model
        </h1>
      </header>
      <div className="">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={600} height={300} data={mergedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Actual Data Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="blue"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />

            {/* Forecast Data Line (Starts at the correct position) */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="red"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
          <Button
            onClick={downloadForecastOnly}
            disabled={loadingForecast || loadingData}
          >
            Download Forecast Only in CSV
          </Button>
          <Button
            onClick={downloadFullData}
            disabled={loadingForecast || loadingData}
          >
            Download Full Data (Original + Forecast) in CSV
          </Button>
        </div>
      </div>
    </>
  );
}

export default ForecastSeriesChart;
