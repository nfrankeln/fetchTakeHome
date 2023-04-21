import { useSearchParams } from 'react-router-dom';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
export default function SortMenu() {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <FormControl w={{ base: '100%', md: '25%' }}>
      <Select
        onChange={(e) => {
          setSearchParams((prev) => prev.set('sort', `${e.target.value}`));
          searchParams.delete('page');
          setSearchParams(searchParams);
        }}
        maxW={{ base: '300px', lg: '400px' }}
        bg={'purple.100'}
        borderRadius="full"
        border="1px"
        borderColor={'purple.200'}
      >
        <option value="breed:asc">Breed A-Z</option>
        <option value="breed:desc">Breed Z-A</option>
        <option value="age:asc">Youngest</option>
        <option value="age:desc">Oldest</option>
      </Select>
    </FormControl>
  );
}
