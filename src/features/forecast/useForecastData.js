import { useState, useEffect } from "react";
import * as d3 from "d3";

export function useForecastData({ model, series }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchCsv() {
    d3.csv(`/${series}/forecast_${model}.csv`)
      .then((parsedData) => {
        const formattedData = parsedData.map((d) => ({
          date: d.date,
          value: parseFloat(d.value),
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCsv();
  }, [setData, setLoading, setError]);

  return { data, loading, error };
}
