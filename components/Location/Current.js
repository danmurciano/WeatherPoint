export default function Current({ weather, units, time }) {
  return (
    <div class="location-current">
      <div class="row location-row">
        <div class="col-6">
          <p class={`location-field-${time}`}> SUNRISE </p>
          <p class="location-data"> {`${weather.current.sunrise}`} </p>
        </div>
        <div class="col-6">
          <p class={`location-field-${time}`}> SUNSET </p>
          <p class="location-data"> {`${weather.current.sunset}`} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class={`location-field-${time}`}> CHANCE OF RAIN </p>
          <p class="location-data"> {`${(weather.current.chanceOfRain).toFixed(0)} %`} </p>
        </div>
        <div class="col-6">
          <p class={`location-field-${time}`}> PRECIPITATION </p>
          <p class="location-data"> {`${weather.current.precipitation[units]}`} </p>
        </div>

      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class={`location-field-${time}`}> HUMIDITY </p>
          <p class="location-data"> {`${weather.current.humidity} %`} </p>
        </div>
        <div class="col-6">
          <p class={`location-field-${time}`}> DEW POINT </p>
          <p class="location-data"> {`${weather.current.dewPoint[units]}` + String.fromCharCode(176)} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class={`location-field-${time}`}> WIND </p>
          <p class="location-data"> {`${weather.current.windDeg} ${weather.current.windSpeed[units]}`} </p>
        </div>
        <div class="col-6">
          <p class={`location-field-${time}`}> PRESSURE </p>
          <p class="location-data"> {`${weather.current.pressure} hPa`} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class={`location-field-${time}`}> VISIBILITY </p>
          <p class="location-data"> {`${weather.current.visibility[units]}`} </p>
        </div>
        <div class="col-6">
          <p class={`location-field-${time}`}> UV INDEX </p>
          <p class="location-data"> {`${weather.current.uvi}`} </p>
        </div>
      </div>
    </div>
  )
};
