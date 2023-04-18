import {Button, Center, Checkbox, Input, Menu, MenuButton, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text } from "@chakra-ui/react"
import Trie from '../utils/trie'
import { useEffect,useState,useRef } from "react"
export default function BreedFilter({breedNames}){
    const [trie, setTrie] = useState(null);
    const [input,setinput]= useState("")

    useEffect(() => {
      const trieInstance = new Trie();
      breedNames.forEach((name) => trieInstance.insert(name.toLowerCase()));
      setTrie(trieInstance);
    }, [breedNames]);


    return (
        <Menu closeOnSelect={false} offset={[0,0]}>

          <MenuButton as={Button} >Breeds</MenuButton>
          <MenuList flexDirection={"column"}>
           <MenuItem ><Input onClick={e => e.stopPropagation()} onChange={(e)=>setinput(e.target.value)} type="text"/></MenuItem>
            <MenuList maxHeight='50vh' overflowY='scroll' >
            {trie && trie.autocomplete(input.toLowerCase()).map((name) => (
              <MenuItem key={name}>{name}</MenuItem>
            ))}
            </MenuList>
          </MenuList>
        </Menu>
      );
    }