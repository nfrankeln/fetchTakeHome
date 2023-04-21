import axios from 'axios';
/**
 * Fetches a list of dog IDs and the total number of dogs that match a set of search parameters.
 *
 * @param {Object} params - The search parameters for the dogs.
 * @returns {Promise<Object>} - A Promise that resolves with an object containing an array of dog IDs and the total number of dogs that match the search parameters.
 * @throws {Error} - If the API call fails.
 * @see {@link https://frontend-take-home.fetch.com/}
 */
export default async function fetchDogIds(params) {
  try {
    const response = await axios.get(
      'https://frontend-take-home-service.fetch.com/dogs/search',
      { params: params },
      { withCredentials: true }
    );

    const dogIds = response.data.resultIds;
    const totalDogs = response.data.total;

    return { dogIds, totalDogs };
  } catch (error) {
    throw new Error('Failed to fetch dog IDs');
  }
}
