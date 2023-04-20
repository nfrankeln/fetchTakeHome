import {Button, Checkbox, CheckboxGroup, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Trie from "../utils/trie";
import { useEffect,useState} from "react"
import { useSearchParams } from "react-router-dom";


export default function BreedsFilter({breedNames}){
    
    const [trie, setTrie] = useState(null);
    const [input,setinput]= useState("")
    const [selectedBreeds, setSelectedBreeds] = useState(new Set())
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;
    useEffect(()=>{
    if(selectedBreeds.size > 0){
      setSearchParams((prevParams) => prevParams.set('breeds', [...selectedBreeds].join(",")))
                            searchParams.delete('page')
                            setSearchParams(searchParams)}

    else {
        searchParams.delete('breeds')
      setSearchParams(searchParams)
    }},[selectedBreeds,setSelectedBreeds])
   

    const addItem = item => {
      setSelectedBreeds(prev => new Set(prev).add(item));
    }
  
    const removeItem = item => {
      setSelectedBreeds(prev => {
        const next = new Set(prev);
  
        next.delete(item);
  
        return next;
      });
    }

    useEffect(() => {
      const trieInstance = new Trie();
      breedNames.forEach((name) => trieInstance.insert(name));
      setTrie(trieInstance);
    }, [breedNames]);
    
    
    
    return(







        <Menu zIndex={"dropdown"}  closeOnSelect={false} offset={[0,0]}>

          <MenuButton as={Button} >Breeds</MenuButton>
          <MenuList flexDirection={"column"}>
           <MenuItem ><Input onClick={e => e.stopPropagation()} onChange={(e)=>setinput(e.target.value)} type="text"/></MenuItem>
            <MenuList  maxHeight='50vh' overflowY='scroll' >
              <CheckboxGroup>
            {trie && trie.autocomplete(input).map((name) => (
              <MenuItem as={Checkbox}  onChange={(e)=>{e.target.checked ?  addItem(name) : removeItem(name) }} key={name}>{name}</MenuItem>
            ))}
            </CheckboxGroup>
            </MenuList>
          </MenuList>
        </Menu>
    )
}