import { ArrowBendDoubleUpRightIcon } from "@phosphor-icons/react";
import '../styles/WeatherDetails.css'


function StatCard({label, value}) {
    return(
        <div className="stat-card">
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
        </div>
    )
}


function WeatherDetails({windSpeed, humidity, uvIndex, visibility}) {
  return (
    <section className="stats-section">
        <p className="section-label"> <ArrowBendDoubleUpRightIcon size={24} weight="bold" />Weather Details</p>

        <div className="stats-grid">
            <StatCard label='Wind' value={`${windSpeed} km/h`}/>
            <StatCard label='Humidity' value={`${humidity}%`}/>
            <StatCard label='UV Index' value={`${uvIndex} UV`}/>
            <StatCard label='Visibility' value={`${(visibility/1000).toFixed(1)} km`}/>
        </div>
    </section>
  )
}

export default WeatherDetails;