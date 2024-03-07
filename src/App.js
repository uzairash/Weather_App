import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import search_icon from "./img/transparency.png";

const defaultWeatherData = {
  location: {
    name: "",
    country: "",
    localtime: "",
  },
  current: {
    temp_c: "",
    condition: {
      text: "",
    },
    last_updated: "",
  },
};

const App = () => {
  const [location, setlocation] = useState("");
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [isSearched, setisSearched] = useState(false);

  useEffect(() => {
    SearchWeather("Islamabad");
  }, []);

  const SearchWeather = async (location) => {
    // try {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json?q=" + location,
      headers: {
        "X-RapidAPI-Key": "4be593fdaamsh2906fcd5688ca13p1b39d3jsnba279cd54bfb",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeatherData(response.data);
        setisSearched(true);
      })
      .catch(function (error) {
        console.error(error);
        setisSearched(false);
      });
  };

  function Geticon() {
    let condition = weatherData.current.condition.text;
    if (condition.includes("drizzle")) {
      var rainyImage = require("./img/rain.png");
      return (
        <>
          <img className="forecast_icons" src={rainyImage} alt="rainy icon" />
        </>
      );
    } else if (condition.includes("Sunny")) {
      var SunnyImage = require("./img/sun.png");
      return (
        <>
          <img className="forecast_icons" src={SunnyImage} alt="sun icon" />
        </>
      );
    } else if (condition.includes("cloud") || condition.includes("Overcast") || condition.includes("Clear")) {
      var cloudImage = require("./img/cloudy.png");
      return (
        <>
          <img className="forecast_icons" src={cloudImage} alt="sun icon" />
        </>
      );
    } else if (condition.includes("storm")) {
      var stormImage = require("./img/storm.png");
      return (
        <>
          <img className="forecast_icons" src={stormImage} alt="sun icon" />
        </>
      );
    } else {
      var rest_of_weathers = require("./img/cloudy.png");
      return (
        <>
          <img className="forecast_icons" src={rest_of_weathers} alt="sun icon" />
        </>
      );
    }
  }

  function getbg_img() {
    let Localtime = weatherData.location.localtime;
    let time = Localtime.substr(Localtime.indexOf(":") - 2, 2);

    console.log("time: " + time);
    if (time > 6 && time <= 18) {
      var day_time_img = require("./img/daytimebg.jpg");
      return day_time_img;
    } else if ((time >= 5 && time <= 6) || (time >= 17 && time <= 18)) {
      var sunset_bg_img = require("./img/sunset.jpg");
      return sunset_bg_img;
    } else {
      var night_time_img = require("./img/nighttimebg.jpg");
      return night_time_img;
    }
  }

  return (
    <div style={{ backgroundImage: `url(${getbg_img()})` }} className="Section1">
      <div className="container">
        <h1>Forecast Now </h1>
        <div className="Searchbox">
          <input
            className="search-Box"
            placeholder="Location"
            type="text"
            onChange={(event) => {
              setlocation(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                SearchWeather(location);
              }
            }}
          ></input>

          <button
            className="Button1"
            onClick={() => {
              SearchWeather(location);
            }}
          >
            <img className="search_icon" src={search_icon} alt="search icon" />
          </button>
        </div>

        {isSearched && weatherData != null ? (
          <div className="weatherinfo">
            <div className="flex-container">
              <div className="column1">
                <h2>
                  {weatherData.location.name}, {weatherData.location.country}
                </h2>
                <h3>Temperature: {weatherData.current.temp_c} </h3>
                <h3>condition: {weatherData.current.condition.text} </h3>
                <h3>Feels like: {weatherData.current.temp_c}</h3>
                <h5>Updated On: {weatherData.current.last_updated}</h5>
              </div>
              <div className="column2">
                {
                  Geticon()

                  // <img className="forecast_image" src={} alt="background" />
                }
              </div>
            </div>
          </div>
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    </div>
  );
};

export default App;
