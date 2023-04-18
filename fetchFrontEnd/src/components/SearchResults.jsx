import { useLoaderData, Link, useParams,useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import DogCard from "./DogCard"
import { Box, Button, Menu, MenuButton, MenuList, SimpleGrid } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { PagePagination } from "./PagePagination"

export default function SearchResults(){
    const apiInfo = useLoaderData()
    const {dogs, next, pages } = apiInfo
    const [currentPage,setCurrentPage]=useState(1)
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;
    
    useEffect(() => {
        setCurrentPage(parseInt(params.get('page')) || 1); // set page state to the value of 'page' query parameter, or 1 if it's not present
      }, [setCurrentPage, params]);

    const navigate = useNavigate()
    console.log("render")
    console.log(apiInfo)
    
    
    return(
        <>
        <SimpleGrid minChildWidth='300px' spacing={5} padding='10px'>
        {dogs.map((dog)=>
        <Box key={`box-${dog.id}`} ><DogCard key={`dog-${dog.id}`} {...dog}/></Box>
        )}
        
        <Box>
          
        <PagePagination currentPage={currentPage} totalPages={pages} onPageChange={(selectedPage)=>setSearchParams(`?page=${selectedPage}`)} />
     
        </Box>
        </SimpleGrid>
        </>
    )
}
//Loaders
export async function dogsLoader({request}){
    let params = {
        'from':0
    }
    const page = new URL(request.url).searchParams.get('page');
    
    if(page){
        params['from']=(page-1)*25
    }
   
    
    


    // const location = queryParams.get("location")
    // const { breeds, zipCodes, ageMin, ageMax ,searchParams} = useParams()
    // const hasParams = breeds || zipCodes || ageMin || ageMax || searchParams;
    // console.log(hasParams)
    let apiInfo ={
        "pages":null,
        "next":null,
        "prev":null
    }

    let dogIds=null
   
    try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search',
        {params:params},
        {withCredentials: true,});
        dogIds = response.data.resultIds;
        apiInfo['pages'] = (response.data.total/response.data.resultIds.length)
        apiInfo['next']  = response.data.next
      } catch (error) {
        console.log(error);
      }

try{
    const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs",dogIds,{withCredentials: true})
    apiInfo['dogs'] = response.data
    return apiInfo
}
catch (error) {
    console.log(error);
  }
}