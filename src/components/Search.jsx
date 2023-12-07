import loadingImg from "../assets/loading.svg";
import enter from "../assets/enter-arrow.png";
import { useEffect, useState } from "react";

const Search = ({getWeather}) => {
  const [userInput, setUserInput] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCities = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${userInput}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f75833be79msh5262a737af35aa2p10b267jsn8568149c9da8",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setLoading(false);
      setCities(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search">
        <form onSubmit={getCities}>
          <input
            type="text"
            placeholder="Search location..."
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          {loading ? (
            <img src={loadingImg} alt="loading icon" className="spinner" />
          ) : (
            userInput.trim().length !== 0 && (
              <button type="submit" className="btn">
                <img src={enter} alt="enter icon" />
              </button>
            )
          )}
        </form>

        <div className="results">
          {cities &&
            cities.map((city) => (
              <div className="fs-6" key={city.id} onClick={() => getWeather(city)}>
                {city.name}, {city.region} - {city.country}
              </div>
            ))}
        </div>
      </div>
  );
};

export default Search;
