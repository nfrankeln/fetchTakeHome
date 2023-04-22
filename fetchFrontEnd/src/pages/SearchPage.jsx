import { Outlet } from 'react-router-dom';

import SplitScreenLayout from '../layouts/SplitScreenLayout';
import { Flex, Box } from '@chakra-ui/react';
import Filters from '../components/Filters';

export default function SearchPage() {
  return (
    <>
      <Box>
        <SplitScreenLayout>
          <Flex
            border={'thin'}
            p={5}
            flexDirection="column"
            justifyContent={'center'}
          >
            <Filters />
          </Flex>
          <Outlet />
        </SplitScreenLayout>
      </Box>
    </>
  );
}
