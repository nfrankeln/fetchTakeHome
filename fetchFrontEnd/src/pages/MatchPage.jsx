import { Container, Heading } from '@chakra-ui/react';
import { getFavDogs } from './FavoritesPage';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import DogCard from '../components/DogCard';

export default function MatchPage() {
  const match = useLoaderData();
  console.log(match);
  return (
    <Container>
      <Heading>Your New Best Friend</Heading>
      <DogCard {...match} />
    </Container>
  );
}

// Loader
export async function getMatch() {
  const favorites = getFavDogs();
  if (favorites.length > 0) {
    const dogIds = favorites.map((dog) => dog.id);
    console.log(dogIds);
    const response = await axios.post(
      'https://frontend-take-home-service.fetch.com/dogs/match',
      dogIds,
      { withCredentials: 'include' }
    );
    const match = favorites.filter((dog) => dog.id === response.data.match);
    return match[0];
  }
}
