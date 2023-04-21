import { SimpleGrid } from "@chakra-ui/react"
import DogCard from "../components/DogCard"
import { useLoaderData } from "react-router-dom"

export default function FavoritesPage(){
    useLoaderData()

    return


    (
        <SimpleGrid>

        <DogCard/>

            
        </SimpleGrid>





    )
}
// Loader LocalStorage
export function getFavDogs(){
    const favData = JSON.parse(localStorage.getItem('favoriteDogs'));
    return favData
 }