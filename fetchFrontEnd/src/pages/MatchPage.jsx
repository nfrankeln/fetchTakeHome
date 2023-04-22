import { Card, Container, Heading } from '@chakra-ui/react';
import { getFavDogs } from './FavoritesPage';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import DogCard from '../components/DogCard';

export default function MatchPage() {
  const match = useLoaderData();
  console.log(match);
  return (
    <Container>
      {match ? (
        <>
          <Heading>Your New Best Friend</Heading>
          <DogCard {...match} />
        </>
      ) : (
        <Heading>You need to add some favorites to get a match</Heading>
      )}
    </Container>
  );
}

// Loader
export async function getMatch() {
  const favorites = getFavDogs();
  if (favorites.length > 0 && favorites !== null) {
    const dogIds = favorites.map((dog) => dog.id);
    console.log(dogIds);
    const response = await axios.post(
      'https://frontend-take-home-service.fetch.com/dogs/match',
      dogIds,
      { withCredentials: 'include' }
    );
    const match = favorites.filter((dog) => dog.id === response.data.match);
    if (match) {
      return match[0];
    }
  }
  return null;
}
