import { Grid, GridItem } from "@chakra-ui/react";

export default function SplitScreenLayout({children})
{
    const [sideBar,main] = children
    return(
        <Grid templateColumns='repeat(12, 1fr)'>

        <GridItem as='aside' pt={{base:3,md:24}} colSpan={{base:12, md:4, xl:2}}  minHeight={{base: '10vh' ,lg:'100vh'}}>
            {sideBar}
        </GridItem>

        <GridItem as="main" colSpan={{base:12, md:8, xl:10}}>
            {main}
        </GridItem>
        
        </Grid>
    )
}