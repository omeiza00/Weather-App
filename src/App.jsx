import "./App.css";

import { useState, useEffect } from "react";
import { getWeatherData } from "./services/weatherService";
import { getUserLocation, reverseGeocode } from "./services/locationService";
import { getWeatherCategory, transformDailyForecast } from "./utils/weatherUtils";

import Loading from "./components/Loading";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast"
import SearchBar from "./components/SearchBar"

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!weatherData) return;

    const category = getWeatherCategory(weatherData.current.weather_code)

    document.body.className = document.body.className.split(' ').filter((cls) => !cls.startsWith('bg-')).join(' ');

    document.body.classList.add(`bg-${category}`);
  }, [weatherData])

  const loadWeather = async (latitude, longitude, name) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
      setLocationName(name);
    } catch (error) {
      setError(error.message || "Could not load weathTheyer data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    const displayName = location.admin1
      ? `${location.name}, ${location.admin1}`
      : `${location.name}, ${location.country}`;

      loadWeather(location.latitude, location.longitude, displayName)
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();

        let locationName = 'Your current location';
        try {
          locationName = await reverseGeocode(latitude, longitude)
        } catch {
          // ..
        }
        await loadWeather(latitude, longitude, locationName);
      } catch (error) {
        setLoading(false);
        if (error.code === 1) {
          setError(
            "Location access was denied. Please search for a location instead.",
          );
        } else {
          setError(
            "Could not detect your location. Please search for a location instead.",
          );
        }
      }
    };

    init();
  }, []);

  return (
    <div className="app">

    <SearchBar onLocationSelect = {handleLocationSelect}/>

      {loading && <Loading />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && weatherData && (
        <div className="weather-content-fade">
          <CurrentWeather
            weather={weatherData.current}
            feelsLike={weatherData.current.apparent_temperature}
            locationName={locationName}
          />
          
          <WeatherDetails
            windSpeed={weatherData.current.wind_speed_10m}
            humidity={weatherData.current.relative_humidity_2m}
            uvIndex={weatherData.current.uv_index}
            visibility={weatherData.current.visibility}
          />
          
          <Forecast forecastData={transformDailyForecast(weatherData.daily)}/>

         </div>
      )}
    </div>
  );
}

export default App;
