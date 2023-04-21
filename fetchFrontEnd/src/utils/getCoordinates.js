import axios from 'axios';
export default async function getCoordinates(zipCode) {
  const response = await axios.post(
    'https://frontend-take-home-service.fetch.com/locations',
    [zipCode],
    { withCredentials: true }
  );
  const { latitude, longitude } = response.data[0];
  return { latitude, longitude };
}
