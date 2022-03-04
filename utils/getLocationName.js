export default function getLocationName(location) {
  location = location.split(",");
  if (location[1] !== "" && location[1] !== location[0]) {
    return location[0] + " | " + location[1] + ", "  + location[2];
  } else {
    return location[0] + " | " + location[2];
  }
}
