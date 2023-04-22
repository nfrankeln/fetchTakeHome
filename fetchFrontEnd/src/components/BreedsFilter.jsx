import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Trie from "../utils/trie";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function BreedsFilter() {
  const [breedNames, setBreedNames] = useState();
  const [trie, setTrie] = useState(null);
  const [input, setInput] = useState("");
  const [selectedBreeds, setSelectedBreeds] = useState(new Set());
  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, onOpen } = useDisclosure();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
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
        prevParams.set("breeds", [...selectedBreeds].join(","))
      );
      searchParams.delete("page");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("breeds");
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Menu zIndex={"dropdown"} closeOnSelect={false}  >
      <MenuButton
        bg={"purple.400"}
        _hover={{ bg: "purple.300" }}
        color={"white"}
        onClick={onOpen}
        as={Button}
      >
        Breeds
      </MenuButton>
      <MenuList flexDirection={"column"} 
       sx={{
        "&[data-popper-placement^='bottom']": {
          transform: "translate3d(0, 0, 0) !important",
        },
      }}
      portalProps={{ position: "relative" }}
      
      onClose={() => setInput("")}>
        <MenuItem>
          <Input
            ref={inputRef}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
          />
        </MenuItem>
        <MenuList maxHeight="50vh"
         sx={{
          "&[data-popper-placement^='bottom']": {
            transform: "translate3d(0, 0, 0) !important",
          },
        }}
        portalProps={{ position: "relative" }}
        overflowY="scroll">
          <CheckboxGroup>
            {trie &&
              trie.autocomplete(input).map((name) => (
                <MenuItem
                  as={Checkbox}
                  value={name}
                  isChecked={selectedBreeds.has(name)}
                  onChange={(e) => {
                    e.target.checked 
 ? addItem(name) : removeItem(name);
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
