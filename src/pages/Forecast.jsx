import { useNavigate } from "react-router-dom";
import ForecastSeriesChart from "../features/forecast/ForecastSeriesChart";
import { useForecast } from "../contexts/ForecastContext";
import useInflation from "../features/plot/useInflation";
import useUnemployment from "../features/plot/useUnemployment";
import useIMACEC from "../features/plot/useIMACEC";
import useTPM from "../features/plot/useTPM";
import Button from "../ui/Button";
function Forecast() {
  const { series } = useForecast();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/plot");
  }
  return (
    <div>
      {series === "Inflation" && <ForecastSeriesChart getData={useInflation} />}
      {series === "Unemployment" && (
        <ForecastSeriesChart getData={useUnemployment} />
      )}
      {series === "IMACEC" && <ForecastSeriesChart getData={useIMACEC} />}
      {series === "TPM" && <ForecastSeriesChart getData={useTPM} />}

      <Button onClick={handleClick}>Go Back</Button>
    </div>
  );
}

export default Forecast;
