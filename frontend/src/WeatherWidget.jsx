import React, { useEffect, useState } from "react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Sample API Fetch (Replace with a real API)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=28.7041&longitude=77.1025&current_weather=true")
      .then((response) => response.json())
      .then((data) => setWeather(data.current_weather))
      .catch((error) => console.error("Error fetching weather:", error));
  }, []);

  return (
    <div
      className="p-4 rounded-lg shadow-md text-center hover:bg-[rgb(168,85,85,0.2)] transition duration-300"
      style={{ backgroundColor: 'rgb(168, 85, 85)' }}
    >
      <h3 className="text-lg font-bold text-white">🌤️ Weather Update</h3>
      {weather ? (
        <p className="text-sm text-white">
          Temperature: {weather.temperature}°C | Wind: {weather.windspeed} km/h
        </p>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;