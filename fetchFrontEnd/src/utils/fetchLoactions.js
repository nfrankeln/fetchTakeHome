import axios from 'axios';
/**
 * Sends a POST request to fetch location data for the specified zip codes.
 * @param {Array} zipCodes - An array of strings representing zip codes to fetch location data for.
 * @returns {Promise} A Promise object representing the array of location objects from the server response.
 */
export default async function fetchLocations(zipCodes) {
  try {
    const locationsResponse = await axios.post(
      'https://frontend-take-home-service.fetch.com/locations',
      zipCodes,
      { withCredentials: true }
    );
    if (locationsResponse.status !== 200) {
      throw new Error('Failed to fetch location data.');
    }
    return locationsResponse.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch location data.');
  }
}
