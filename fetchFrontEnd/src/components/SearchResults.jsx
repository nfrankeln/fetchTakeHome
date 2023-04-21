import { useLoaderData, useSearchParams } from 'react-router-dom';
import fetchLocationsFromZip from '../utils/fetchLocationsFromZip';
import fetchDogIds from '../utils/fetchDogIds';
import fetchDogsById from '../utils/fetchDogsById';
import fetchLocations from '../utils/fetchLoactions';
import addLocationToDogs from '../helpers/addLocationToDogs';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PagePagination } from './PagePagination';
import LocationSearch from './LocationSearch';
import Dogs from './Dogs';
import SortMenu from './SortMenu';

export default function SearchResults() {
  const [data, setData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const repsonse = await dogsLoader(searchParams);
      setData(repsonse);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page')) || 1); // set page state to the value of 'page' query parameter, or 1 if it's not present
  }, [currentPage, setCurrentPage, searchParams]);

  return (
    <>
      <Flex p={5} justifyContent={'space-between'} alignItems={'flex-end'} flexDirection={'row-reverse'}>
        <LocationSearch />
       
        <SortMenu />
      </Flex>

      <SimpleGrid minChildWidth={'275px'} spacing={6} padding="10px">
        {data.dogs && <Dogs dogs={data.dogs} />}
      </SimpleGrid>
      {data.totalPages > 0 && (
        <PagePagination
        
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={(selectedPage) => {
            setSearchParams((prevParams) =>
              prevParams.set('page', `${selectedPage}`)
            );
            setSearchParams(searchParams);
          }}
        />
      )}
    </>
  );
}
async function dogsLoader(searchParams) {
  const params = {
    from: 0,
    sort: 'breed:asc',
  };

  const zipCode = searchParams.get('zipCodes');
  const ageMin = searchParams.get('ageMin');
  const ageMax = searchParams.get('ageMax');
  const page = searchParams.get('page');
  const sort = searchParams.get('sort');
  let breeds = searchParams.get('breeds');

  if (zipCode) {
    const response = await fetchLocationsFromZip(zipCode);

    if (response.length > 0) {
      params.zipCodes = response.map((location) => location.zip_code);
    }
  }
  if (breeds) {
    breeds = breeds.split(',');
    params.breeds = breeds;
  }
  if (ageMin) {
    params.ageMin = ageMin;
  }
  if (ageMax) {
    params.ageMax = ageMax;
  }
  if (page) {
    params.from = (page - 1) * 25;
  }
  if (sort) {
    params.sort = sort;
  }

  // try {
  const { dogIds, totalDogs } = await fetchDogIds(params);
  let totalPages = Math.floor(totalDogs / dogIds.length);
  let dogObjects = await fetchDogsById(dogIds);

  if (dogObjects.length < 1) {
    dogObjects = false;
    totalPages = 0;
  } else {
    const zipCodes = dogObjects.map((dog) => dog.zip_code);
    const locationObjects = await fetchLocations(zipCodes);
    addLocationToDogs(locationObjects, dogObjects);
  }

  return { dogs: dogObjects, totalPages: totalPages };
}
