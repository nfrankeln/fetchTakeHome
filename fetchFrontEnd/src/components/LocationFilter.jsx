import { HStack, Menu, MenuButton, MenuItem, MenuList,CheckboxGroup, Input, Checkbox } from "@chakra-ui/react";
import Trie from "../utils/trie";
import { states } from "../utils/states";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function LocationFilter(){
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;
    
    // Build a trie for autocomplete, fill with to uppercase to implement case agnostic autocomplete
    const trie = new Trie() 
    Object.keys(states).forEach(stateName => {
    trie.insert(stateName.toUpperCase());
    });

const [matches,setMatches]= useState([])
const [filteredStatesAbrev,setfilteredStatesAbrev]=useState([])

useEffect(()=>{
 setMatches(trie.autocomplete(""))
}
,[])

useEffect(()=>{
    if (filteredStatesAbrev.length > 0){
    updateSearchParams(filteredStatesAbrev)
    }
    else{
        searchParams.delete('states')
      setSearchParams(searchParams)
    }
},[filteredStatesAbrev])

function updateSearchParams(filteredStatesAbrev){
    setSearchParams((prevParams) => prevParams.set('states', `${filteredStatesAbrev}`))
    searchParams.delete('page')
    setSearchParams(searchParams)}
   

    return(

        <HStack>
            <Menu>
                <MenuButton>State</MenuButton>
                <MenuList>
                <MenuItem ><Input onClick={e => e.stopPropagation()} onChange={(e)=>setMatches(trie.autocomplete(e.target.value.toUpperCase()))} type="text"/></MenuItem>
                <MenuList  maxHeight='50vh' overflowY='scroll' >
              <CheckboxGroup>
            {Object.keys(states).map((state) => (
              <MenuItem display={matches.includes(state.toUpperCase()) ? "block": "none"} 
              as={Checkbox} key={state}
              onChange={(e) =>
                setfilteredStatesAbrev((prev) =>
                  e.target.checked ? [...prev, states[state]] : prev.filter((abrev) => abrev !== states[state])
                )
              }
              >
                {state}
              
              </MenuItem>
            ))}
            </CheckboxGroup>
            </MenuList>
                </MenuList>
            </Menu>



        </HStack>


    )


}