import axios from "axios";
import getBoundingBox from "./getBoundingBox";
import  getCoordinates  from "./getCoordinates";


/**
 * Fetches a list of locations within a certain distance of a given zip code.
 *
 * @param {string} zipCode - The zip code to search for.
 * @returns {Promise<Array>} - A Promise that resolves with an array of location objects from the API response data.
 * @throws {Error} - If the API call fails.
 * @see {@link https://frontend-take-home.fetch.com/}
 */
export default async function fetchLocationsFromZip(zipCode) {
  const { latitude, longitude } = await getCoordinates(zipCode);
  const geoBoundingBox = getBoundingBox(latitude, longitude, 15);

  try {
    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/locations/search",
      { geoBoundingBox, size: 100 },
      { withCredentials: true }
    );

    const results = response.data.results;

    if (Array.isArray(results) && results.some((r) => r !== null)) {
      return results.filter((r) => r !== null);
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Failed to fetch locations from API");
  }
}
