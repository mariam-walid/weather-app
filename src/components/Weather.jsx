const Weather = ({ data }) => {
  console.log(data);
  return (
    <div className="container">
      <div className="row justify-content-between flex-column gy-3 flex-lg-row">
        <div
          className="weatherCard col-12 col-lg-5 p-4 d-flex flex-column justify-content-between gap-5"
          style={{
            backgroundImage: `url(/weather/bg/${data.currentWeather.weather[0].icon}.png)`,
          }}
        >
          <div className="d-flex justify-content-between ">
            <div className="d-flex flex-column gap-2">
              <p className="m-0 cityName">
                {data.city.name}, {data.city.countryCode}
              </p>
              <p className="m-0 date">{new Date().toDateString()}</p>
            </div>
            <div>
              <p className="time"> {new Date().toLocaleTimeString()} </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-6">
              <p className="temp fs-1">{data.currentWeather.main.temp}ºc</p>
              <p className="tempDescription m-0 d-flex flex-column gap-1 fs-5">
                <span>{data.currentWeather.main.temp_max}ºc / {data.currentWeather.main.temp_min}ºc</span>
                <span>{data.currentWeather.weather[0].description}</span>
              </p>
            </div>
            <div className="col-5">
              <img
                src={`/weather/icons/${data.currentWeather.weather[0].icon}.svg`}
                alt="weather-icon"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7 d-flex flex-column gap-3 p-0 px-lg-2">
          <div className="details d-flex flex-column gap-2">
            <p className="title">Today's weather details</p>
            <div>
              <div className="item">
                <p className="label">Feels like</p>
                <p className="value">{data.currentWeather.main.feels_like}ºc</p>
              </div>
              {/* <div className="item">
                <p className="label">Probability of rain</p>
                <p className="value">0%</p>
              </div> */}
              <div className="item">
                <p className="label">Wind speed</p>
                <p className="value">{data.currentWeather.wind.speed} m/s</p>
              </div>
              <div className="item">
                <p className="label">Air humidity</p>
                <p className="value">{data.currentWeather.main.humidity}%</p>
              </div>
              <div className="item">
                <p className="label">Pressure</p>
                <p className="value">
                  {" "}
                  {data.currentWeather.main.pressure} hPa{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="forecast d-flex flex-column gap-2">
            <p className="title">5 day forecast</p>
            <div className="d-flex justify-content-between align-items-start">
              {data.forecastData.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center justify-content-between"
                >
                  <p className="dayName">
                    {" "}
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}{" "}
                  </p>
                  <img
                    src={`/weather/icons/${item.weather[0].icon}.svg`}
                    alt="weather-icon"
                    className="img-fluid"
                  />
                  <p className="desc d-none d-md-block">{item.weather[0].description}</p>
                  <div className="d-flex gap-2 flex-column flex-md-row">
                  <span className="maxTemp">{item.main.temp_max}ºc</span>
                  <span className="minTemp">{item.main.temp_min}ºc</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
