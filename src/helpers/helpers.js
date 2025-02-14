export function prepareTimeSeriesData(data) {
  const transformedActualData = data.map((d) => ({
    date: d.date,
    value: d.value,
    actual: d.value,
    forecast: null,
  }));
  return transformedActualData;
}

export function prepareForecastData(data) {
  const transformedActualData = data.map((d) => ({
    date: d.date,
    value: d.value,
    actual: null,
    forecast: d.value,
  }));
  return transformedActualData;
}
