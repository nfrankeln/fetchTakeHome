import { Box, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
export default function AgeSlider(){
    const [minAge,setMinAge]= useState(0)
    const [maxAge,setMaxAge]= useState(20)
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;

    useEffect(()=>{
      if(minAge > 0){
        setSearchParams((prevParams) => prevParams.set('minAge', `${minAge}`))}
      if(maxAge < 20){
        setSearchParams((prevParams) => prevParams.set('maxAge', `${maxAge}`))}
      searchParams.delete('page')
      setSearchParams(searchParams)
  
      
      },[])
   
    return(
        <>
        
        <Flex align="center" justify="center" direction="column" >
        <Text>Age</Text>
        <RangeSlider aria-label={['min', 'max']}
         max={20} defaultValue={[0,20]}
         onChangeEnd={() => {}}
         onChange={(val)=>{setMinAge(val[0]);setMaxAge(val[1])}}
         >
          <RangeSliderTrack bg={"purple.200"} >
            <RangeSliderFilledTrack bg={"purple.500"}/>
          </RangeSliderTrack>

          <RangeSliderThumb zIndex="0" boxSize={6} index={0}>
            <Box p={1}>{minAge}</Box>  
          </RangeSliderThumb>
          <RangeSliderThumb zIndex="0" boxSize={6} index={1}> 
          <Box p={1}>{maxAge}</Box> 
          </RangeSliderThumb>
          </RangeSlider>
          
          <Flex justify="space-between" w="100%">
            <Text>Min</Text>
            <Text>Max</Text>
          </Flex>
        
        </Flex>
        </>

    )
}