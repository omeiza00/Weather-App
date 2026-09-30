import { formatDate, getWeatherDescription, formatTemperature } from "../utils/weatherUtils"
import '../styles/ForecastCard.css'
import WeatherIcon from "./WeatherIcon"

function ForecastCard({date, maxTemp, minTemp, weatherCode}) {
  return (
    <div className="forecast-card">
        <p className="forecast-date">{formatDate(date)}</p>
        <WeatherIcon code={weatherCode} size={28} className="forecast-icon" />
        <p className="forecast-condition">{getWeatherDescription(weatherCode)}</p>

        <div className="forecast-temps">
            <span className="temp-max">H: {formatTemperature(maxTemp)}</span>
            <span className="temp-min">L: {formatTemperature(minTemp)}</span>
        </div>
    </div>
  )
}

export default ForecastCard