const WEATTHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = " https://geocoding-api.open-meteo.com/v1/search";

export async function getWeatherData(latitude, longitude) {
  const url = 
  `${WEATTHER_API}?latitude=${latitude}&longitude=${longitude}` + 
  `&current=temperature_2m,wind_speed_10m,weather_code,apparent_temperature,relative_humidity_2m,uv_index,visibility` + 
  `&daily=weathercode,temperature_2m_max,temperature_2m_min` + 
  `&forecast_days=6` +
  `&timezone=auto`;

  console.log('Fetching:', url)

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  const data = await response.json();
  return data;
}


export async function searchLocations(query) {
    const url = `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to search locations');
    }

    const data = await response.json();
    return data.results || [];
}