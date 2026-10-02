import ForecastCard from "./ForecastCard";
import { ArrowBendDoubleUpRightIcon } from "@phosphor-icons/react";
import "../styles/Forecast.css";

function Forecast({ forecastData, unit }) {
  return (
    <section className="forecast-section">
      <p className="forecast-section-label">
        <ArrowBendDoubleUpRightIcon size={20} weight="bold" />
        6-Day Forecast
      </p>

      <div className="forecast-list">
        {forecastData.map((day) => (
          <ForecastCard
            key={day.date}
            date={day.date}
            maxTemp={day.maxTemp}
            minTemp={day.minTemp}
            weatherCode={day.weatherCode}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
}

export default Forecast;
