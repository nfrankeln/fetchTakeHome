import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  VStack,
  Heading,
  Image,
  Icon,
  Text,
} from '@chakra-ui/react';
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai';
export default function DogCard({ name, img, age, breed, zip_code, location }) {
  return (
    <>
      <Card maxW="xs" boxShadow={'md'} alignItems={'center'} >
        <CardBody p={0}>
          <Image
            boxSize={['xs', 'xs']}
            src={img}
            objectFit={'cover'}
            borderRadius={'base'}
            borderBottomRadius={0}
          />
          <VStack
            pt={5}
            pr={3}
            pl={5}
            justifyContent={'space-between'}
            alignItems={'flex-start'}
          >
            <Heading color={'purple.700'} mb={2} size="lg">
              {name} {age}yrs
            </Heading>
            <HStack w={'100%'} justify={'space-between'}>
              <VStack alignItems={'flex-start'}>
                <Text color={'purple.400'} fontSize={'md'}>{breed}</Text>
                <Text color={'purple.400'} fontSize={'md'}>
                  {location
                    ? `${location.city}, ${location.state}`
                    : `zip code, ${zip_code}`}
                </Text>
              </VStack>
              
                <Icon boxSize={10} color={'purple.400'} as={AiOutlineHeart} _hover={{color: "purple.700"}} />
             
            </HStack>
          </VStack>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
