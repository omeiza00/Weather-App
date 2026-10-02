import "../styles/Loading.css";
import { CloudIcon } from "@phosphor-icons/react";

function Loading() {
  return (
    <div className="loading">
      <CloudIcon size={48} weight="fill" className="loading-icon" />
      <p>Loading weather data...</p>
    </div>
  );
}

export default Loading;
