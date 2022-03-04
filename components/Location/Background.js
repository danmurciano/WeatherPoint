export default function Background({ conditions }) {
  const stars = ["stars1", "stars2", "stars3"];
  const clouds_clear = ["clouds0-a"];
  const clouds_a = ["clouds0-a", "clouds1"];
  const clouds_a_night = ["clouds1-n"];
  const clouds_b = ["clouds1", "clouds3"];
  const clouds_b_night = ["clouds1-n", "clouds3-n"];
  const clouds_c = ["clouds1", "clouds2", "clouds3-d"];
  const clouds_c_night = ["clouds1-n", "clouds2-n", "clouds3-n"];
  const drizzle = ["rain1", "rain3"];
  const rain = ["rain1", "rain2", "rain3", "rain4"];
  const snow = ["snow1", "snow2", "snow3", "snow4"];
  const fog = ["clouds1", "clouds2"];
  const fog_night = ["clouds1-n", "clouds2-n"];

  let animationSet = ["stars1", "stars2", "stars3", "clouds1-b"];
  switch(conditions) {
    case "01d":
    animationSet = clouds_clear;
    break;
    case "01n":
    animationSet = [...stars, "clouds0-n"];
    break;
    case "02d":
    animationSet = clouds_a;
    break;
    case "02n":
    animationSet = clouds_a_night;
    break;
    case "03d":
    animationSet = clouds_b;
    break;
    case "03n":
    animationSet = clouds_b_night;
    break;
    case "04d":
    animationSet = clouds_c;
    break;
    case "04n":
    animationSet = clouds_c_night;
    break;
    case "09d":
    animationSet = [...clouds_c, ...drizzle];
    break;
    case "09n":
    animationSet = [...clouds_c_night, ...drizzle];
    break;
    case "10d":
    animationSet = [...clouds_c, ...rain];
    break;
    case "10n":
    animationSet = [...clouds_c_night, ...rain];
    break;
    case "11d":
    animationSet = [...clouds_c, ...rain];
    break;
    case "11n":
    animationSet = [...clouds_c_night, ...rain];
    break;
    case "13d":
    animationSet = [...clouds_c, ...snow];
    break;
    case "13n":
    animationSet = [...clouds_c_night, ...snow];
    break;
    case "50d":
    animationSet = fog;
    break;
    case "50n":
    animationSet = clouds_c_night;
    break;
  }


  function mapAnimations(animationSet) {
    return animationSet.map(element => (
      <div id={element}/>
    ));
  }

  return (
    <>
      {mapAnimations(animationSet)}
    </>
  );
}
