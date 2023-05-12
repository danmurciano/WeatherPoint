export default function getLocationName(location) {
  const { city, region, country, lat, lng } = location;
  const latitude = lat;
  const longitude = lng;

  let regionAndCountry;
  if (region !== "" && region !== city) {
    regionAndCountry = `${region}, ${country}`;
  } else {
    regionAndCountry = country;
  }

  const label = `${city}, ${regionAndCountry}`;
  const queryString = `${city},${region},${country},${latitude},${longitude}`;


  return { city, region, country, latitude, longitude, regionAndCountry, label, queryString }
}
