export default function weatherResponse(weather) {
  const userTime = new Date;
  const userOffset = userTime.getTimezoneOffset() * 60;


  function latitude(lat) {
    let direction;
    if (lat >= 0) {
      direction = "N";
    } else {
      direction = "S"
    }
    return Math.abs(lat).toFixed(1) + direction;
  };

  function longitude(lon) {
    let direction;
    if (lon >= 0) {
      direction = "E";
    } else {
      direction = "W"
    }
    return Math.abs(lon).toFixed(1) + direction;
  };

  function timeConvert(epoch, offset) {
    const date = new Date((epoch + offset + userOffset) * 1000);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString("en-US", options);
  };

  function getDay(epoch, offset) {
    const date = new Date((epoch + offset + userOffset) * 1000);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  function getHour(epoch, offset) {
    const date = new Date((epoch + offset + userOffset) * 1000);
    const options = { hour: 'numeric' };
    return date.toLocaleTimeString("en-US", options);
  };


  function tempConvertF(calvin) {
    return Math.round((calvin - 273.15) * 1.8 + 32);
  };

  function tempConvertC(tempF) {
    return Math.round((tempF - 32) / 1.8);
  };


  function windDirection(deg) {
    const x = deg / 22.5 + 0.5;
    let dir1;
    let dir2;

    switch(true) {
      case (x >= 15 || x < 2):
      dir1 = "N";
      break;
      case (x >= 3 && x < 6):
      dir1 = "E";
      break;
      case (x >= 7 && x < 10):
      dir1 = "S";
      break;
      case (x >= 11 && x < 14):
      dir1 = "W";
      break;
      default:
      dir1 = "";
    }

    switch(true) {
      case (x >= 1 && x < 4):
      dir2 = "NE";
      break;
      case (x >= 5 && x < 8):
      dir2 = "SE";
      break;
      case (x >= 9 && x < 12):
      dir2 = "SW";
      break;
      case (x >= 13 && x < 16):
      dir2 = "NW";
      break;
      default:
      dir2 = "";
    }
    return dir1 + dir2;
  };


  const coordinates = latitude(weather.lat) + ", " + longitude(weather.lon);


  const current = {
    sunrise: timeConvert(weather.current.sunrise, weather.timezone_offset),
    sunset: timeConvert(weather.current.sunset, weather.timezone_offset),
    conditions: weather.current.weather[0].description,
    icon: weather.current.weather[0].icon,
    temp: [
      Math.round(weather.current.temp),
      tempConvertC(weather.current.temp)
    ],
    dewPoint: [
      Math.round(weather.current.dew_point),
      tempConvertC(weather.current.dew_point)
    ],
    feelsLike: [
      Math.round(weather.current.feels_like),
      tempConvertC(weather.current.feels_like)
    ],
    chanceOfRain: weather.hourly[0].pop * 100,
    precipitation: [
      weather.minutely ? ((weather.minutely[0].precipitation) / 25.4).toFixed(1) : 0 + " in",
      weather.minutely ? (weather.minutely[0].precipitation).toFixed(1) : 0 + " mm"
    ],
    humidity: weather.current.humidity,
    windSpeed: [
      Math.round(weather.current.wind_speed) + " mph",
      Math.round(weather.current.wind_speed * 1.609) + " kmh"
    ],
    windDeg: windDirection(weather.current.wind_deg),
    pressure: weather.current.pressure,
    visibility: [
      (weather.current.visibility / 1609.34).toFixed(1) + " mi",
      (weather.current.visibility / 1000).toFixed(1) + " km"
    ],
    uvi: Math.round(weather.current.uvi)
  }


  function mapDailyData(daily) {
    return daily.map(d => ({
      day: getDay(d.dt, weather.timezone_offset),
      icon: d.weather[0].icon,
      max: [
        Math.round(d.temp.max),
        tempConvertC(d.temp.max)
      ],
      min: [
        Math.round(d.temp.min),
        tempConvertC(d.temp.min)
      ],
      humidity: d.humidity,
      windSpeed: [
        Math.round(d.wind_speed),
        Math.round(d.wind_speed * 1.609)
      ],
      windDeg: windDirection(d.wind_deg)
    }))
  }

  const daily = mapDailyData(weather.daily);


  function mapHourlyData(hourly) {
    return hourly.map(h => ({
      time: getHour(h.dt, weather.timezone_offset),
      icon: h.weather[0].icon,
      temp: [
        Math.round(h.temp),
        tempConvertC(h.temp)
      ]
    }))
  }

  const hourlyNow = {
    time: "Now",
    icon: weather.current.weather[0].icon,
    temp: [
      Math.round(weather.current.temp),
      tempConvertC(weather.current.temp)
    ]
  }

  let hourly = mapHourlyData(weather.hourly.slice(1, 24));
  hourly.unshift(hourlyNow);


  // Get appropriate background
  const timeOfDay = weather.current.weather[0].icon.substring(2,3);
  const conditions = weather.current.weather[0].icon.substring(0,2);
  const clear = ["01", "02"];
  const overcast = ["03", "04", "09", "10", "11", "13", "50"];

  let background = "day-clear"
  if (timeOfDay === "d" && clear.includes(conditions)) {
    background = "day-clear";
  } else if (timeOfDay === "d" && overcast.includes(conditions)) {
    background = "day-overcast"
  } else if (timeOfDay === "n" && clear.includes(conditions)) {
    background = "night-clear";
  } else if (timeOfDay === "n" && overcast.includes(conditions)) {
    background = "night-overcast";
  }


  return { coordinates, current, daily, hourly, timeOfDay, background };
}



// Example Response

// {
//   "lat": 33.44,
//   "lon": -94.04,
//   "timezone": "America/Chicago",
//   "timezone_offset": -21600,
//   "current": {
//     "dt": 1595243443,
//     "sunrise": 1608124431,
//     "sunset": 1608160224,
//     "temp": 274.75,
//     "feels_like": 270.4,
//     "pressure": 1017,
//     "humidity": 96,
//     "dew_point": 274.18,
//     "uvi": 0,
//     "clouds": 90,
//     "visibility": 6437,
//     "wind_speed": 3.6,
//     "wind_deg": 320,
//     "weather": [
//       {
//         "id": 701,
//         "main": "Mist",
//         "description": "mist",
//         "icon": "50n"
//       }
//     ]
//   },
//     "hourly": [
//     {
//       "dt": 1595242800,
//       "temp": 274.75,
//       "feels_like": 271.22,
//       "pressure": 1017,
//       "humidity": 96,
//       "dew_point": 274.18,
//       "uvi": 0,
//       "clouds": 90,
//       "visibility": 1765,
//       "wind_speed": 2.43,
//       "wind_deg": 303,
//       "weather": [
//         {
//           "id": 804,
//           "main": "Clouds",
//           "description": "overcast clouds",
//           "icon": "04n"
//         }
//       ],
//       "pop": 0.1
//     },
//     ...
//   }
// "daily": [
//         {
//       "dt": 1595268000,
//       "sunrise": 1608124431,
//       "sunset": 1608160224,
//       "temp": {
//         "day": 278.14,
//         "min": 273.15,
//         "max": 279.4,
//         "night": 273.15,
//         "eve": 275.82,
//         "morn": 275.35
//       },
//       "feels_like": {
//         "day": 273.53,
//         "night": 270.26,
//         "eve": 271.89,
//         "morn": 272.11
//       },
//       "pressure": 1021,
//       "humidity": 70,
//       "dew_point": 273.27,
//       "wind_speed": 3.74,
//       "wind_deg": 323,
//       "weather": [
//         {
//           "id": 803,
//           "main": "Clouds",
//           "description": "broken clouds",
//           "icon": "04d"
//         }
//       ],
//       "clouds": 60,
//       "pop": 0.84,
//       "uvi": 2.41
//     },
//     ...
//     },
// "alerts": [
//     {
//       "sender_name": "NWS Tulsa (Eastern Oklahoma)",
//       "event": "Heat Advisory",
//       "start": 1597341600,
//       "end": 1597366800,
//       "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible."
//     },
//     ...
//   ]
