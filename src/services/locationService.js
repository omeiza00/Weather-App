export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supportted by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        reject(err);
      },
    );
  });
}

export async function reverseGeocode(latitude, longitude) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not determine location name.");
  }

  const data = await response.json();

  return (
    data.city ||
    data.locality ||
    data.principalSubdivision ||
    "Unknown location"
  );
}
