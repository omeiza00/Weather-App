import {
  SunIcon,
  CloudIcon,
  CloudRainIcon,
  SnowflakeIcon,
  CloudFogIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import { getWeatherCategory } from "../utils/weatherUtils";

const ICON_MAP = {
  sunny: SunIcon,
  cloudy: CloudIcon,
  rainy: CloudRainIcon,
  snowy: SnowflakeIcon,
  foggy: CloudFogIcon,
  thunderstorm: LightningIcon,
};

function WeatherIcon({ code, size = 24, className }) {
  const category = getWeatherCategory(code);
  const Icon = ICON_MAP[category] || CloudIcon; // fallback icon just in case

  return <Icon size={size} weight="fill" className={className} />;
}

export default WeatherIcon;