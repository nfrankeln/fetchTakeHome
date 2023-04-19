import { Flex, Heading,} from "@chakra-ui/react"
import Trie from '../utils/trie'
import { useEffect,useState,useRef } from "react"
import { useSearchParams } from "react-router-dom";
import AgeSlider from "./AgeSlider";
import BreedsFilter from "./BreedsFilter";
export default function Filters({breedNames}){
    


  

    return (<>
        <Flex justify={"center"} direction={"column"} gap={{base:3,md:10}}>
        <Heading textAlign={'center'}>Filters</Heading>
        <BreedsFilter breedNames={breedNames}/>
        <AgeSlider/>
        </Flex>
        </>
      );
    }