import { useLoaderData, Link, useParams } from "react-router-dom"
import axios from "axios"
import DogCard from "./DogCard"
export default function SearchResults(){
    const dogs = useLoaderData()
    console.log(dogs)
    return(
        <>
        <div>SearchResults</div>
        {dogs.map((dog)=>
        <li><DogCard {...dog}/></li>
        )}
        </>
    )
}
//Loaders
export async function dogsLoader(params){
    console.log(params)
    // const { breeds, zipCodes, ageMin, ageMax ,searchParams} = useParams()
    // const hasParams = breeds || zipCodes || ageMin || ageMax || searchParams;
    // console.log(hasParams)
    let dogIds=null
    try {
        let params = {}
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search',
        {params:{sort:'breed:asc'}},
        {withCredentials: true,});
        console.log(response);
        dogIds = response.data.resultIds;
      } catch (error) {
        console.log(error);
      }

try{
    let dogObjects = null
    const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs",dogIds,{withCredentials: true})
    dogObjects = response.data
    return dogObjects
}
catch (error) {
    console.log(error);
  }
}