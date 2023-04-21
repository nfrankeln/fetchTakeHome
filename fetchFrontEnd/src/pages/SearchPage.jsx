import axios from 'axios';

import { useLoaderData, Outlet } from 'react-router-dom';

import SplitScreenLayout from '../layouts/SplitScreenLayout';
import { Flex, Box } from '@chakra-ui/react';
import Filters from '../components/Filters';

export default function SearchPage() {
  console.log('rerender');
  return (
    <>
      <Box >
      <SplitScreenLayout>
        <Flex border={'thin'} p={5} flexDirection="column" justifyContent={'center'}>
          <Filters />
        </Flex>
        <Outlet />
      </SplitScreenLayout>
      </Box>
    </>
  );
}
