import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useForecast } from "../../contexts/ForecastContext";
import Button from "../..//ui/Button";

function TimeSeriesChart({ getData }) {
  const { series, model } = useForecast();
  const navigate = useNavigate();
  const { loading, data } = getData();

  function handleClick() {
    navigate("/forecast");
  }

  if (loading) return <Spinner />;
  return (
    <>
      <header className="flex justify-center items-center">
        <h1 className="text-xl">{series} Plot</h1>
      </header>
      <div className="">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center py-6">
        <Button onClick={handleClick}>
          Create {model} Forecast of {series}
        </Button>
      </div>
    </>
  );
}

export default TimeSeriesChart;
