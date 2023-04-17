import axios from "axios"
import { useEffect } from "react"
import { useLoaderData, Link, Outlet } from "react-router-dom"
import SearchResults from "../components/SearchResults"

export default function SearchPage(){
    const {breedNames, dogIds} = useLoaderData()
    console.log(breedNames)
    
      
    return(<>
        <h1>SearchPage</h1>
       <form action="">
        <label htmlFor="">Search Breeds</label>
        <input type="text" />
       </form>
        <Outlet/>
        </>
    )
}

//Loaders

export async function breedsLoader() {
    let data = {}
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true,});
      data["breedNames"] = response.data;
    } catch (error) {
      console.log(error);
    }   

    return data

  }
  
