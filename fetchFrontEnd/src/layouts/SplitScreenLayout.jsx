import { Grid, GridItem } from "@chakra-ui/react";

export default function SplitScreenLayout({children})
{
    const [sideBar,main] = children
    return(
        <Grid templateColumns='repeat(12, 1fr)' bg={"blue.200"}>

        <GridItem as='aside' colSpan={{base:12, md:4, xl:2}} bg={"purple.100"} minHeight={{base: '10vh' ,lg:'100vh'}}>
            {sideBar}
        </GridItem>

        <GridItem as="main" colSpan={{base:12, md:8, xl:10}}bg={"yellow.100"}>
            {main}
        </GridItem>
        
        </Grid>
    )
}