export default function Daily({ weather, units }) {
  function mapDailyData(daily) {
    return daily.map(d => (
      <div class="col hourly-col">
        <p class="hourly-data"> {`${d.day}`} </p>
        <img class="daily-icon" src={`/images/icons/${d.icon}.png`}/>
        <p class="daily-data"> {`${d.max[units]}` + String.fromCharCode(176)} </p>
        <p class="daily-data"> {`${d.min[units]}` + String.fromCharCode(176)} </p>
      </div>
    ))
  }

  return (
    <div class="row hourly-row-inner">
      {mapDailyData(weather.daily)}
    </div>
  )
};
