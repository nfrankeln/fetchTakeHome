import { useLoaderData, useSearchParams } from "react-router-dom"
import axios from "axios"
import DogCard from "./DogCard"
import { Box, Flex, FormControl, FormLabel, Select, SimpleGrid } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { PagePagination } from "./PagePagination"


export default function SearchResults(){
    const apiInfo = useLoaderData()
    const {dogs, next, pages } = apiInfo
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
        <Flex p={5} justifyContent={"flex-end"}>
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
        {dogs.map((dog)=>
        <Box key={`box-${dog.id}`} ><DogCard key={`dog-${dog.id}`} {...dog}/></Box>
        )}
      
        <Box>  
        
        <PagePagination currentPage={currentPage}
                        totalPages={pages}
                        onPageChange={(selectedPage) => {
                            setSearchParams((prevParams) => prevParams.set('page', `${selectedPage}`))
                            setSearchParams(searchParams);
                          }}  />
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
    const states = new URL(request.url).searchParams.get('states')
    const ageMin = new URL(request.url).searchParams.get('ageMin')
    const ageMax = new URL(request.url).searchParams.get('ageMax')
    const page = new URL(request.url).searchParams.get('page');
    const sort = new URL(request.url).searchParams.get('sort')
    let breeds = new URL(request.url).searchParams.get('breeds')
    
    if (states){
        console.log("statesArray",states)
      let response = await axios.post("https://frontend-take-home-service.fetch.com/locations/search",{'states':states})
      console.log("statesZip",response)

    }
    
    if (breeds){
        breeds = [breeds]
        breeds = breeds.join().split(',');
        params['breeds'] = breeds
    }
    if(ageMin){
        params['ageMin']=ageMin
    }
    if (ageMax){
        params['ageMax']=ageMax
    }
    
    if(page){
        params['from']=(page-1)*25
    }
    if(sort){
        params['sort']= sort
    }
    else{
        params['sort']="breed:asc"
    }
    let apiInfo ={
        "pages":null
    }
    let dogIds=null
    let total = 0
   

    try {
        let response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search',
        {params:params},
        {withCredentials: true,});
        dogIds = response.data.resultIds;
        total = Math.floor(response.data.total/response.data.resultIds.length)
        apiInfo['pages'] = total
      } catch (error) {
        console.log(error);
      }

try{
    let response = await axios.post("https://frontend-take-home-service.fetch.com/dogs",dogIds,{withCredentials: true})
    apiInfo['dogs'] = response.data
    const zipCodes = response.data.map((dog) => dog.zip_code)
    response = await axios.post("https://frontend-take-home-service.fetch.com/locations",zipCodes,{withCredentials: true})
    apiInfo['dogs'].forEach((dog, index) => {
        
          const location = response.data[index];
          dog.city = location.city;
          dog.state = location.state;
        }
      );
    return apiInfo
}
catch (error) {
    console.log(error);
  }
}