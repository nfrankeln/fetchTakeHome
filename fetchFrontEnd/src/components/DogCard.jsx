import { Card, CardBody, CardFooter,Flex, HStack, Heading, Image, Icon, Stack, Tag, Text, Box, Center } from "@chakra-ui/react";
import {AiFillHeart} from 'react-icons/ai'
export default function DogCard({name,img,age,breed,zip_code}){

    return(
        <>
        <Card maxW='sm' alignItems={"center"}>
        <CardBody>
            <Image src={img} boxSize={"xs"} objectFit={"cover"} borderRadius={"base"}/>
            <HStack justifyContent={"space-between"}>
            <Stack mt='2' spacing='2'>
            <Heading mb={1} size='lg'>{name},{age}</Heading> 
            <Text fontSize={"md"}>{breed}</Text>
            <Text fontSize={"md"}>Chicago, IL</Text>
            </Stack>
                <Flex p={2}  borderWidth={1} borderColor={"black"} borderRadius={"full"}>
                <Icon boxSize={10} as={AiFillHeart}/>
                </Flex>
            </HStack>
        </CardBody>
        <CardFooter></CardFooter>
        </Card>
        </>
    )
}