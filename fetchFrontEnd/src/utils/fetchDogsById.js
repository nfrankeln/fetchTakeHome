import axios from "axios";
/**
 * Fetches a list of dog objects from the API based on a given list of dog IDs.
 *
 * @param {Array<string>} dogIds - An array of dog IDs to search for.
 * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of dog objects.
 * @see {@link https://frontend-take-home.fetch.com/}
 */
export default async function fetchDogsById(dogIds) {
    try {
      const dogsResponse = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        dogIds,
        { withCredentials: true }
      );
      
      let dogObjects = dogsResponse.data;
 
    // TODO: Modify dogObjects here as needed
    //   dogObjects = dogObjects.map((dog) => {
    //     return {
    //       id: dog.id,
    //       name: dog.name,
    //       breed: dog.breed,
    //       imageUrl: dog.imageUrl,
    //       age: dog.age,
    //       weight: dog.weight
    //     }
    //   });
  
      return dogObjects;
    } catch (error) {
      throw new Error("Failed to fetch dog objects from API.");
    }
  }
  