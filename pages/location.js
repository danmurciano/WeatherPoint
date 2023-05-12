import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Background from "../components/Location/Background";
import Header from "../components/_App/Header";
import UnitSelect from "../components/_App/UnitSelect";
import Current from "../components/Location/Current";
import Daily from "../components/Location/Daily";
import Hourly from "../components/Location/Hourly";
import { Icon, Menu } from "semantic-ui-react";
import { countries } from "../public/countries";
import weatherResponse from "../utils/weatherResponse";
import AppLoading from "../components/_App/AppLoading";
import baseUrl from "../utils/baseUrl";
import { AppContext } from '../components/_App/AppContext';
import getLocationName from "../utils/getLocationName";


export default function Location({ ...props }) {
  const { locationData, weatherData } = props;
  const { units, loading, setLoading, setConnected, location, setLocation } = useContext(AppContext);
  setLocation(locationData);
  setConnected(true);
  
  const weather = weatherResponse(weatherData);


  setTimeout(() => {
    if (loading) {
      setLoading(false);
    } 
  }, "2000");

  
  return (
    loading ? (
      <AppLoading loading={loading} />
    ) : (
      <>
        <div className={`page-main ${weather.background}`}>
          <Background conditions={weather.current.icon} />
          <Header />
          <div class="page-location ">
            <div class="location-main">
              <div class="location-results">
                <div class="location-border">
                  <div class={`row location-top-${weather.background}`}>
                    <div class="col-6">
                      <p class="location-city"> {location.city} </p>
                      <p class="location-country"> {location.regionAndCountry} </p>
                      <p>  {weather.coordinates} </p>
                      <img class="current-icon" src={`/images/icons/${weather.current.icon}.png`}/>
                      <p class="location-temp"> {`${weather.current.temp[units]}` + String.fromCharCode(176)} </p>
                      <p class="location-data"> {`Feels Like ${weather.current.feelsLike[units]}` + String.fromCharCode(176)} </p>
                    </div>
    
                    <div class="col-6">
                      <Current weather={weather} units={units} time={weather.timeOfDay}/>
                    </div>
                  </div>
                </div>
    
                <div class="location-border">
                  <div class={`location-top-${weather.background}`}>
                    <p class={`section-title-${weather.timeOfDay}`}> HOURLY FORECAST </p>
                    <div class="hourly-row">
                      <Hourly weather={weather} units={units}/>
                    </div>
                  </div>
                </div>
    
                <div class="location-border">
                  <div class={`location-top-${weather.background}`}>
                    <p class={`section-title-${weather.timeOfDay}`}> DAILY FORECAST </p>
                    <div class="hourly-row">
                      <Daily weather={weather} units={units}/>
                    </div>
                  </div>
                </div>
    
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export const getServerSideProps = async ({ query: { search } }) => {
  let l = search.split(",");
  const city = l[0];
  const region = l[1];
  const country = l[2];
  const lat = l[3];
  const lng = l[4];

  const locationData = getLocationName({ city, region, country, lat, lng });

  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=imperial&appid=${process.env.WEATHER_KEY}`;
  const weatherPayload = { headers: { "X-Requested-With": "XMLHttpRequest" } };
  const weatherResponse = await axios.get(weatherUrl);
  const weatherData = weatherResponse.data;

  return { props: { locationData, weatherData } };
};

