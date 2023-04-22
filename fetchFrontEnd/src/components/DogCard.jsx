import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  VStack,
  Heading,
  Image,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';

export default function DogCard({
  name,
  img,
  age,
  breed,
  zip_code,
  location,
  id,
  onRemove,
}) {
  const [favorite, setFavorite] = useState(false);


  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some((dog) => dog.id === id);
    setFavorite(isFavorite);
  }, [id]);

  const handleFavoriteClick = () => {
    const dog = { id, name, img, age, breed, zip_code, location };
    const favorites =
      JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorite) {
      const updatedFavorites = favorites.filter((f) => f.id !== id);
      localStorage.setItem(
        'favorites',
        JSON.stringify(updatedFavorites)
      );
      if (onRemove) {
        onRemove(id);
      }
    } else {
      const updatedFavorites = [...favorites, dog];
      localStorage.setItem(
        'favorites',
        JSON.stringify(updatedFavorites)
      );
    }
    setFavorite(!favorite);
  };

  return (
    <>
      <Card maxW="xs" boxShadow={'md'} alignItems={'center'}>
        <CardBody margin={0} p={0}>
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
                <Text color={'purple.400'} fontSize={'md'}>
                  {breed}
                </Text>
                <Text color={'purple.400'} fontSize={'md'}>
                  {location
                    ? `${location.city}, ${location.state}`
                    : `zip code, ${zip_code}`}
                </Text>
              </VStack>
              <Icon
                boxSize={10}
                color={favorite ? 'purple.700' : 'purple.400'}
                as={favorite ? AiFillHeart : AiOutlineHeart}
                _hover={{ color: 'purple.700' }}
                onClick={handleFavoriteClick}
              />
            </HStack>
          </VStack>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
