import axios from 'axios';

/**
 * Makes a request to login to the API.
 *
 * @param {Object} data - An object containing the email and name fields.
 * @returns {Promise<boolean>} - A Promise that resolves with a boolean indicating if the login was successful.
 * @throws {Error} - If the API request fails.
 * @see {@link https://frontend-take-home.fetch.com/}
 */
export default async function login(data) {
  try {
    const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', { ...data }, { withCredentials: true });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
}
