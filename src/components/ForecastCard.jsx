import {
  formatDate,
  getWeatherDescription,
  formatTemperature,
} from "../utils/weatherUtils";
import "../styles/ForecastCard.css";
import WeatherIcon from "./WeatherIcon";

function ForecastCard({ date, maxTemp, minTemp, weatherCode, unit }) {
  return (
    <div className="forecast-card">
      <p className="forecast-date">{formatDate(date)}</p>
      <WeatherIcon code={weatherCode} size={28} className="forecast-icon" />
      <p className="forecast-condition">{getWeatherDescription(weatherCode)}</p>

      <div className="forecast-temps">
        <span className="temp-max">High: {formatTemperature(maxTemp, unit)}</span>
        <span className="temp-min">Low: {formatTemperature(minTemp, unit)}</span>
      </div>
    </div>
  );
}

export default ForecastCard;
