import { Grid, GridItem } from '@chakra-ui/react';

export default function SplitScreenLayout({ children }) {
  const [sideBar, main] = children;
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      justifyItems={{ base: 'center', md: 'normal' }}
    >
      <GridItem
        border={'solid'}
        minW={{ base: '100%' }}
        pt={{ base: 0, md: 8, lg: 8 }}
        as="aside"
        colSpan={{ base: 12, md: 4, xl: 2 }}
        minHeight={{ base: '10vh', md: '100vh' }}
      >
        {sideBar}
      </GridItem>

      <GridItem
        pt={{ base: 0, md: 8, lg: 8 }}
        as="main"
        border={{ base: 'none', md: 'solid' }}
        colSpan={{ base: 12, md: 8, xl: 10 }}
      >
        {main}
      </GridItem>
    </Grid>
  );
}
