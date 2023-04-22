import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  filter,
} from '@chakra-ui/react';
import Trie from '../utils/trie';
import { useEffect, useState , useRef} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function BreedsFilter() {
  const [breedNames, setBreedNames] = useState();
  const [trie, setTrie] = useState(null);
  const [input, setinput] = useState('');
  const inputRef = useRef(null);
  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    const modifiedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setinput(modifiedValue);
  };
  
  const [selectedBreeds, setSelectedBreeds] = useState(new Set());
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://frontend-take-home-service.fetch.com/dogs/breeds',
          { withCredentials: true }
        );
        setBreedNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBreeds.size > 0) {
      setSearchParams((prevParams) =>
        prevParams.set('breeds', [...selectedBreeds].join(','))
      );
      searchParams.delete('page');
      setSearchParams(searchParams);
    } else {
      searchParams.delete('breeds');
      setSearchParams(searchParams);
    }
  }, [selectedBreeds, setSelectedBreeds]);

  const addItem = (item) => {
    setSelectedBreeds((prev) => new Set(prev).add(item));
  };

  const removeItem = (item) => {
    setSelectedBreeds((prev) => {
      const next = new Set(prev);

      next.delete(item);

      return next;
    });
  };

  useEffect(() => {
    if (breedNames) {
      const trieInstance = new Trie();
      breedNames.forEach((name) => trieInstance.insert(name));
      setTrie(trieInstance);
    }
  }, [breedNames]);

  return (
    <Menu zIndex={'dropdown'} flip={false} autoSelect={true} boundary={'scrollParent'} preventOverflow={true} closeOnSelect={false} >
      <MenuButton
        bg={'purple.400'}
        _hover={{ bg: 'purple.300' }}
        color={'white'}
        as={Button}
      >
        Breeds
      </MenuButton>
      <MenuList flexDirection={'column'}>
        <MenuItem>
          <Input
            onClick={(e) => e.stopPropagation()}
            ref={inputRef} onChange={handleInputChange}
            type="text"
          />
        </MenuItem>
        
        <MenuList  maxHeight="50vh" overflowY="scroll">
          <CheckboxGroup>
            {trie &&
              trie.autocomplete(input).map((name) => (
                <MenuItem
                  as={Checkbox}
                  value={name}
                  onChange={(e) => {
                    e.target.checked ? addItem(name) : removeItem(name);
                  }}
                  key={name}
                >
                  {name}
                </MenuItem>
              ))}
          </CheckboxGroup>
        </MenuList>
      </MenuList>
    </Menu>
  );
}
