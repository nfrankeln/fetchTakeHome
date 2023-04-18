import axios from "axios"
import { useEffect } from "react"
import { useLoaderData, Link, Outlet } from "react-router-dom"
import SearchResults from "../components/SearchResults"
import BreedSearchMenu from "../components/BreedsFilter"
import SplitScreenLayout from "../layouts/SplitScreenLayout"
import { Stack,Box } from "@chakra-ui/react"


export default function SearchPage(){
    const {breedNames, dogIds} = useLoaderData()
   
    return(<>
        <SplitScreenLayout>
            <Box p={5}>
                <BreedSearchMenu breedNames={breedNames}/>
            </Box>
        <Outlet/>
        </SplitScreenLayout>
        
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
  
