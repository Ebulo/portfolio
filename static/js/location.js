function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    loc = {
      lat: "No Lat",
      lng: "No Lng",
      speed: "0 Km/Hr",
      altitude: "Sea Level",
    };
    alert("Please provide the Location Permission to continue using the app");
    getCurrentLocation();
  }
}

function showLocation(position) {
  lat = !position.coords.latitude ? "No Lat" : position.coords.latitude;
  lng = !position.coords.longitude ? "No Lng" : position.coords.longitude;
  speed = !position.coords.speed ? "0 Km/Hr" : position.coords.speed;
  altitude = !position.coords.altitude ? "Sea Level" : position.coords.altitude;
  loc = { lat: lat, lng: lng, speed: speed, altitude: altitude };
}
