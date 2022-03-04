export default function Hourly({ weather, units }) {
  function mapHourlyData(hourly) {
    return hourly.map(h => (
      <div class="col hourly-col">
        <p class="hourly-data"> {`${h.time}`} </p>
        <img class="daily-icon" src={`/images/icons/${h.icon}.png`}/>
        <p class="daily-data"> {`${h.temp[units]}` + String.fromCharCode(176)} </p>
      </div>
    ))
  }


  return (
    <div class="row hourly-row-inner">
      {mapHourlyData(weather.hourly.slice(0, 8))}
    </div>
  )
};
