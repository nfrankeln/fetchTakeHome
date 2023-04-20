import { useLoaderData, useSearchParams } from "react-router-dom"
import DogCard from "./DogCard"
import { Box, Flex, FormControl, FormLabel, Input, Select, SimpleGrid } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { PagePagination } from "./PagePagination"
import LocationSearch from "./LocationSearch"
import FilterTags from "./FilterTags"
import  fetchLocationsFromZip  from "../utils/fetchLocationsFromZip"
import  fetchDogIds  from "../utils/fetchDogIds"
import  fetchDogsById  from "../utils/fetchDogsById"
import  fetchLocations  from "../utils/fetchLoactions"
import  addLocationToDogs  from "../helpers/addLocationToDogs"


export default function SearchResults(){
    const apiInfo = useLoaderData()
    const {dogs, pages } = apiInfo
    const [currentPage,setCurrentPage]=useState(1)
    const [sort,setSort] = useState('breed:asc')
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;
    
    useEffect(() => {
        setCurrentPage(parseInt(params.get('page')) || 1); // set page state to the value of 'page' query parameter, or 1 if it's not present
        setSort(params.get('sort') || 'breed:asc' )
    }, [setCurrentPage, setSort, params]);

    
    
    return(
        <>
        <Flex p={5} justifyContent={"space-between"}>
            
            <LocationSearch/>
            <FilterTags/>


            <FormControl w={{base:'100%',md:'25%'}}>
                <FormLabel>Sort By:</FormLabel>
        <Select onChange={(e)=>
            {
            setSearchParams(prev => prev.set('sort',`${e.target.value}`))
            searchParams.delete('page')
            setSearchParams(searchParams)
        }}
             maxW={{base:'300px', lg:"400px"}} 
             bg={"purple.100"} 
             borderRadius="full"
            border="1px"
            borderColor={"purple.200"}
            >
            <option value='breed:asc'>Breed A-Z</option>
            <option value='breed:desc'>Breed Z-A</option>
            <option value='age:asc'>Youngest</option>
            <option value='age:desc'>Oldest</option>
        </Select>
        </FormControl>
        </Flex>

        <SimpleGrid minChildWidth={'275px'} spacing={6} padding='10px'>
        {
        dogs ?
        dogs.map((dog)=>
        <Box key={`box-${dog.id}`} ><DogCard key={`dog-${dog.id}`} {...dog}/></Box>
        ) :
            <div>No Dogs Found!</div>
        
        }
      
        <Box>  
        
        { pages > 0 && <PagePagination currentPage={currentPage}
                        totalPages={pages}
                        onPageChange={(selectedPage) => {
                            setSearchParams((prevParams) => prevParams.set('page', `${selectedPage}`))
                            setSearchParams(searchParams);
                          }}  /> }
        </Box>
        </SimpleGrid>
        </>
    )
}
//Loaders
export async function dogsLoader({ request }) {
    const params = {
      from: 0,
      sort: "breed:asc"
    };
  
    const urlSearchParams = new URL(request.url).searchParams;
    const zipCodes = urlSearchParams.get("zipCodes");
    const ageMin = urlSearchParams.get("ageMin");
    const ageMax = urlSearchParams.get("ageMax");
    const page = urlSearchParams.get("page");
    const sort = urlSearchParams.get("sort");
    let breeds = urlSearchParams.get("breeds");
  
//if a zip code was sent get zipCodes around it 
    if (zipCodes) {
     const response = await fetchLocationsFromZip(zipCodes)
     if(response.length>0){
        params.zipCodes = response.map(
            (location) => location.zip_code
          );
     }
      
    }
//  
    if (breeds) {
      breeds = breeds.split(",");
        console.log(breeds)
      params.breeds = breeds
    }
    if (ageMin) {
      params.ageMin = ageMin;
    }
    if (ageMax) {
      params.ageMax = ageMax;
    }
    if (page) {
      params.from = (page - 1) * 25;
    }
    if (sort) {
      params.sort = sort;
    }
    const apiInfo = {
      pages: null
    };
    try {
      const {dogIds,totalDogs} = await fetchDogIds(params)
      console.log(dogIds)
      const total = Math.floor(totalDogs / dogIds.length);
      console.log(total)
      apiInfo.pages = total;

      const dogObjects = await fetchDogsById(dogIds)
      console.log(dogObjects)
      if (dogObjects.length < 1){
        apiInfo.dogs=0
        return apiInfo
      }
      const zipCodes = dogObjects.map((dog) => dog.zip_code);
      console.log(zipCodes)
      const locationObjects = await fetchLocations(zipCodes)
      console.log(locationObjects)
      addLocationToDogs(locationObjects,dogObjects)
      apiInfo.dogs = dogObjects
    } catch (error) {
      console.log(error);
    }
  
    return apiInfo;
  }
  