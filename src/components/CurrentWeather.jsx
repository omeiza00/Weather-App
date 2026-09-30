import {
  formatTemperature,
  getWeatherDescription,
} from "../utils/weatherUtils";
import { ArrowBendDoubleUpRightIcon } from "@phosphor-icons/react";
import '../styles/CurrentWeather.css'

function CurrentWeather({ weather, feelsLike, locationName }) {
  return (
    <section className="current-weather">
      <div>
        <p className="current-weather-label"><ArrowBendDoubleUpRightIcon size={24} weight="bold" />Current Weather Status</p>

       <div className="weather-temp-div">
        <h1 className="temperature">
          {formatTemperature(weather.temperature_2m)}
        </h1>
        <p className="temp-condition">
          {getWeatherDescription(weather.weather_code)}
        </p>
        </div>

        <div className="weather-status-details">
            <div className="status-detail">
                <p className="status-detail-value">{locationName}</p>
                <p className="status-detail-label">Location</p>
            </div>

            <div className="status-detail">
                <p className="status-detail-value">{weather.wind_speed_10m} km/h</p>
                <p className="status-detail-label">Wind</p>
            </div>

            <div className="status-detail">
                <p className="status-detail-value">{formatTemperature(feelsLike)}</p>
                <p className="status-detail-label">Feels Like</p>
            </div>

            <div className="status-detail">
                <p className="status-detail-value">{getWeatherDescription(weather.weather_code)}</p>
                <p className="status-detail-label">Condition</p>
            </div>
        </div>
      </div>

     
    </section>
  );
}

export default CurrentWeather;
