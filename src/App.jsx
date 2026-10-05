import "./App.css";

import { useState, useEffect } from "react";
import { getWeatherData } from "./services/weatherService";
import { getUserLocation, reverseGeocode } from "./services/locationService";
import {
  getWeatherCategory,
  transformDailyForecast,
} from "./utils/weatherUtils";
import {
  ArrowClockwiseIcon,
  NavigationArrowIcon,
  // StarIcon,
} from "@phosphor-icons/react";
// import FavoritesBar from "./components/FavoritesBar";

import Loading from "./components/Loading";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import SearchBar from "./components/SearchBar";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentCoords, setCurrentCoords] = useState(null);
  const [geoCoords, setGeoCoords] = useState(null);
  const [geoLocationName, setGeoLocationName] = useState("");
  const [locationSource, setLocationSource] = useState("geo");
  const [unit, setUnit] = useState("C");
  // const [favorites, setFavorites] = useState(() => {
  //   const stored = localStorage.getItem("weatherAppFavorites");
  //   return stored ? JSON.parse(stored) : [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("weatherAppFavorites", JSON.stringify(favorites));
  // }, [favorites]);

  // const isFavorite = currentCoords
  //   ? favorites.some(
  //       (fav) =>
  //         fav.latitude === currentCoords.latitude &&
  //         fav.longitude === currentCoords.longitude,
  //     )
  //   : false;

  // const toggleFavorite = () => {
  //   if (!currentCoords) return;

  //   if (isFavorite) {
  //     // Remove it — keep every favorite EXCEPT the one matching current coords
  //     setFavorites(
  //       favorites.filter(
  //         (fav) =>
  //           !(
  //             fav.latitude === currentCoords.latitude &&
  //             fav.longitude === currentCoords.longitude
  //           ),
  //       ),
  //     );
  //   } else {
  //     // Add it
  //     setFavorites([
  //       ...favorites,
  //       {
  //         name: locationName,
  //         latitude: currentCoords.latitude,
  //         longitude: currentCoords.longitude,
  //       },
  //     ]);
  //   }
  // };

  // const handleFavoriteSelect = (favorite) => {
  //   setLocationSource("search"); // treat it like a searched location
  //   loadWeather(favorite.latitude, favorite.longitude, favorite.name);
  // };

  useEffect(() => {
    if (!weatherData) return;

    const category = getWeatherCategory(weatherData.current.weather_code);

    document.body.className = document.body.className
      .split(" ")
      .filter((cls) => !cls.startsWith("bg-"))
      .join(" ");

    document.body.classList.add(`bg-${category}`);
  }, [weatherData]);

  const loadWeather = async (latitude, longitude, name) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
      setLocationName(name);
      setCurrentCoords({ latitude, longitude });
    } catch (error) {
      setError(error.message || "Could not load weathTheyer data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (!currentCoords) return;
    loadWeather(currentCoords.latitude, currentCoords.longitude, locationName);
  };

  const handleLocationSelect = (location) => {
    const displayName = location.admin1
      ? `${location.name}, ${location.admin1}`
      : `${location.name}, ${location.country}`;

    setLocationSource("search");
    loadWeather(location.latitude, location.longitude, displayName);
  };

  const handleUseMyLocation = () => {
    if (!geoCoords) return;
    setLocationSource("geo");
    loadWeather(geoCoords.latitude, geoCoords.longitude, geoLocationName);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();

        let locationName = "Your current location";
        try {
          locationName = await reverseGeocode(latitude, longitude);
        } catch {
          // ..
        }

        setGeoCoords({ latitude, longitude });
        setGeoLocationName(locationName);
        setLocationSource("geo");

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
      {loading && <Loading />}

      {!loading && <SearchBar onLocationSelect={handleLocationSelect} />}

      {error && <p className="error">{error}</p>}

      {!loading && !error && weatherData && (
        <div className="weather-content-fade">
          <div className="action-row">
            <div className="unit-toggle">
              <button
                className={unit === "C" ? "unit-btn active" : "unit-btn"}
                onClick={() => setUnit("C")}
              >
                °C
              </button>
              <button
                className={unit === "F" ? "unit-btn active" : "unit-btn"}
                onClick={() => setUnit("F")}
              >
                °F
              </button>
            </div>

            {/* <button className="action-btn star-btn" onClick={toggleFavorite}>
              <StarIcon size={16} weight={isFavorite ? "fill" : "bold"} />
            </button> */}

            {locationSource === "search" && geoCoords && (
              <button className="action-btn" onClick={handleUseMyLocation}>
                <NavigationArrowIcon size={16} weight="bold" /> Use my location
              </button>
            )}

            <button className="action-btn" onClick={handleRefresh}>
              <ArrowClockwiseIcon size={16} weight="bold" /> Refresh
            </button>
          </div>

          {/* {favorites.length > 0 && (
            <FavoritesBar
              favorites={favorites}
              onSelect={handleFavoriteSelect}
            />
          )} */}

          <CurrentWeather
            weather={weatherData.current}
            feelsLike={weatherData.current.apparent_temperature}
            locationName={locationName}
            unit={unit}
          />

          <WeatherDetails
            windSpeed={weatherData.current.wind_speed_10m}
            humidity={weatherData.current.relative_humidity_2m}
            uvIndex={weatherData.current.uv_index}
            visibility={weatherData.current.visibility}
          />

          <Forecast
            forecastData={transformDailyForecast(weatherData.daily)}
            unit={unit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
