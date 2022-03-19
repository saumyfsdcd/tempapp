import { useState } from "react";
import React from "react";
import "./App.css";

const Weather = () => {
  const [search, setSearch] = useState();
  const [temp, settemp] = useState();
  const [desc, setDesc] = useState();
  const [city, setCity] = useState();
  const [found, setFound] = useState(true);
//   const [img, setImg] = useState()

  const change = (e) => {
    setSearch(e.target.value);
  };

  const click = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0b3cea8ab82fea188593da42e31213f8&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 404) {
          setFound(false);
        } else {
          setFound(true);
        }
        settemp(`the temperature in ${data.name} is ` + data.main.temp + " degree celsius");
        setCity(data.name);
        setDesc(
          `the weather at ${data.name} is ` + data.weather[0].description
        );
        console.log(data);
      });
  };

//   const i=`http://openweathermap.org/img/wn/${img}@2x.png`

  return (
    <div className="d">
      {found ? (
        <div>
          <div className="searchbar">
            <input
              placeholder="Enter the city..."
              type="text"
              onChange={change}
            />
            <button onClick={click}>Search</button>
          </div>

          <div className="other">
            <h1>{city}</h1>
            <h2>{desc}</h2>
            <p>{temp}</p>
            {/* <img src={i} alt="" /> */}
          </div>
        </div>
      ) : (
        <div>
          <p>the city you entered either not exist or else you are a monkey.</p>
          <p>try searching the city again with right spelling</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
