/**
 * Adds location information to a list of dogs based on their zip codes.
 *
 * @param {Object[]} locations - An array of objects containing location information.
 * @param {Object[]} dogs - An array of objects containing dog information.
 */
export default function addLocationToDogs(locations, dogs) {
  let zipToLocation = {};

  for (let location of locations) {
    if (location) {
      zipToLocation[location.zip_code] = location;
    }
  }

  for (let dog of dogs) {
    let location = zipToLocation[dog.zip_code];
    if (location) {
      dog.location = location;
    }
  }
}
