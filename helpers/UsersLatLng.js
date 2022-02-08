import * as Permissions from 'expo-permissions';

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};

export async function getPlace(lat, long) {
  let place = "";
  const url = "https://us1.locationiq.com/v1/reverse.php?key=ed6533dfd15ca5&lat=" + lat + "&lon=" + long + "&format=json";
  await fetch(url).then(res => res.json())
    .then(
      (result) => {
        place = result.display_name
      },
      (error) => {
        console.log(error);
      }
    );
  return place;

};

export async function functionLocationAsync() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  var finalStatus = status;
  while (finalStatus !== 'granted') {
    let { stat } = await Permissions.askAsync(Permissions.LOCATION);
    finalStatus = stat
  }
  if (finalStatus == 'granted') {
    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        long: pos.coords.longitude,
        lat: pos.coords.latitude,
      };
    };
    const coords = await getCoords();
    return coords;
  } else {
    return null;
  }

};

export async function findLocation() {
  const coord = await functionLocationAsync();
  const place = await getPlace(coord.lat, coord.long);
  const obj = {
    latitude: coord.lat,
    longitude: coord.long,
    name: place,
    manual: false
  }
  return obj;
}
