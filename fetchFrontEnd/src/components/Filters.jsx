import { Flex, Heading } from '@chakra-ui/react';
import AgeSlider from './AgeSlider';
import BreedsFilter from './BreedsFilter';

// import LocationFilter from "./LocationFilter";
export default function Filters() {
  return (
    <>
      <Flex justify={'center'} direction={'column'} gap={{ base: 3, md: 20 }}>
        <Heading color={'purple.700'} textAlign={'center'}>
          Filters
        </Heading>
        <AgeSlider />
        <BreedsFilter />
      </Flex>
    </>
  );
}
