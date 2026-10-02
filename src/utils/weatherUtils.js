const WEATHER_CODE = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function convertTemperature(tempCelsius, unit) {
  if (unit === "F") {
    return (tempCelsius * 9) / 5 + 32;
  }
  return tempCelsius;
}

export function getWeatherCategory(code) {
  if (code === 0 || code === 1) return "sunny";
  if (code === 2 || code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if (code >= 51 && code <= 67) return "rainy";
  if (code >= 71 && code <= 77) return "snowy";
  if (code >= 80 && code <= 82) return "rainy";
  if (code >= 95) return "thunderstorm";
  return "cloudy";
}

export function getWeatherDescription(code) {
  return WEATHER_CODE[code] || "Unknown Condition";
}

export function formatTemperature(tempCelsius, unit = "C") {
  const converted = convertTemperature(tempCelsius, unit);
  return `${Math.round(converted)}°${unit}`;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-us", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function transformDailyForecast(daily) {
  return daily.time.map((date, index) => ({
    date: date,
    weatherCode: daily.weathercode[index],
    maxTemp: daily.temperature_2m_max[index],
    minTemp: daily.temperature_2m_min[index],
  }));
}
