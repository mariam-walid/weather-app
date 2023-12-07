import { useState } from "react";
import logo from "./assets/Logo.svg";
import "./App.css";
import Search from "./components/Search";
import loading from "./assets/loading.svg";
import enter from "./assets/enter-arrow.png";
import Weather from "./components/Weather";

function App() {
  const apiKey = "bfd085e38b0217bc7244f7d7a22ba80e";
  // const [userInput, setUserInput] = useState("");
  // const [cities, setCities] = useState([]);
  // const [loadingCities, setLoadingCities] = useState(false);

  // const [currentWeather, setCurrentWeather] = useState(null);
  // const [forecast, setForecast] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async (city) => {
    try {
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}&units=metric`
      );
      const currentWeather = await weather.json();
      console.log(currentWeather);
      // setCurrentWeather(currentWeather);

      const forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecast.json();
      console.log(forecastData);
      // setForecast(forecastData);

      setWeatherData({
        city,
        currentWeather,
        forecastData: forecastData.list.filter((day) =>
          day.dt_txt.includes("12:00:00")
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center gap-4">
      {weatherData ? (
        <>
        {/* <Search getWeather={getWeather} /> */}
        <Weather data={weatherData} />
        </>
      ) : (
        <>
          <div className="mb-5">
            <img src={logo} alt="weather app logo" />
          </div>
          <div className="welcome d-flex flex-column">
            <p className="fs-2">
              Welcome to <span>TypeWeather</span>
            </p>
            <p className="description fs-3">
              Choose a location to see the weather forecast
            </p>
          </div>
          <Search getWeather={getWeather} />
        </>
      )}
      {/* <Weather weatherData={weatherData} /> */}
    </div>
  );
}

export default App;
