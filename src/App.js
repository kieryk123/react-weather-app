import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.search();
  }

  render() {
    return (
      <div className="card">
        <h1>Check actual weather</h1>
        <form onSubmit={this.updateSearch}>
          <label>Enter city: </label>
          <input className="input" ref="cityName" type="text" required />
          <input className="btn" type="submit" />
        </form>
        <h3>City: {this.state.city}</h3>
        <p>Temperature: {this.state.temp} Celsius</p>
        <p>Humidity: {this.state.hum}%</p>
        <p>Pressure: {this.state.pr} hPa</p>
      </div>
    );
  }

  search(city = 'Warsaw') {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}?forecast?id=524901&APPID=a5f75eaf1905f8b2375a0ba961f96e5e`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        let temp = data.main.temp - 273.15;
        temp = temp.toFixed(1);

        this.setState({
          city: data.name,
          temp: temp,
          hum: data.main.humidity,
          pr: data.main.pressure
        });
      })
      .catch((error) => {
        console.error('Invalid city name');
        alert('This city does not exist!');
      })
  }

  updateSearch(e) {
    e.preventDefault();
    let cityName = this.refs.cityName.value;
    this.search(cityName);

    this.refs.cityName.value = '';
  }
}

export default App;
