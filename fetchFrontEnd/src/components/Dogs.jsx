import { Box } from '@chakra-ui/react';
import DogCard from './DogCard';

export default function Dogs({ dogs }) {
  return (
    <>
      {dogs ? (
        dogs.map((dog) => (
          <Box key={`box-${dog.id}`}>
            <DogCard key={`dog-${dog.id}`} {...dog} />
          </Box>
        ))
      ) : (
        <div>No Dogs Found!</div>
      )}
    </>
  );
}
