import { Card, CardBody, CardFooter,Flex, HStack,VStack ,Heading, Image, Icon, Stack, Tag, Text, Box, Center } from "@chakra-ui/react";
import {AiFillHeart} from 'react-icons/ai'
export default function DogCard({name,img,age,breed,zip_code}){

    return(
        <>
        <Card maxW='xs' boxShadow={'md'}  alignItems={"center"}>
        <CardBody p={0}>
            <Image boxSize={['xs','xs']} src={img} objectFit={"cover"} borderRadius={"base"} borderBottomRadius={0}/>
            <VStack pt={5} pr={3} pl={5} justifyContent={"space-between"} alignItems={'flex-start'}>
        
            <Heading mb={2} size='lg'>{name} {age}yrs</Heading> 
                <HStack w={'100%'} justify={"space-between"}>
                <VStack alignItems={'flex-start'}>
                <Text fontSize={"md"}>{breed}</Text>
                <Text fontSize={"md"}>Chicago, IL {zip_code} </Text>
                </VStack>
                <Flex p={2}  borderWidth={1} borderColor={"black"} borderRadius={"full"}>
                <Icon boxSize={10} as={AiFillHeart}/>
                </Flex>
                </HStack>
            </VStack>
        </CardBody>
        <CardFooter></CardFooter>
        </Card>
        </>
    )
}