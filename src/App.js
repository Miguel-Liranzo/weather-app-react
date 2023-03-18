import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const units = "units=imperial"

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&${units}&appid=5a5211c083d316c666d1d742db2831b3`;

  const searchLocation = (event) => {
    // After 'Enter' is pressed
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      // Reset text within Input box
      setLocation('');
    }

  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event  => setLocation(event.target.value)}
        onKeyUp={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null }
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            <p className="subtitle">{data.weather ? data.weather[0].description : null}</p>
          </div>
        </div>
      {data.name != undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
