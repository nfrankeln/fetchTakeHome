import { SimpleGrid, Text } from '@chakra-ui/react';
import DogCard from '../components/DogCard';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export default function FavoritesPage() {
  const favoriteDogs = useLoaderData();
  const [favorites, setFavorites] = useState(favoriteDogs);

  function removeFavorite(id) {
    console.log('remove');
    const updatedFavorites = favorites.filter((f) => f.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  }

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={'10px'}
      padding="10px"
    >
      {favorites.length > 0 ? (
        favorites.map((dog) => (
          <DogCard
            key={dog['id']}
            {...dog}
            onRemove={() => removeFavorite(dog['id'])}
          />
        ))
      ) : (
        <Text
          mt={10}
          textAlign={'center'}
          color={'purple.700'}
          fontWeight={'bold'}
          fontSize={'xl'}
        >
          Looks Like You don't have any Favorites
        </Text>
      )}
    </SimpleGrid>
  );
}

// Loader LocalStorage
export function getFavDogs() {
  const favorites_dogs = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites_dogs;
}
