import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function AgeSlider() {
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(20);
  const [sliderChanged, setSliderChanged] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    updateSearchParams(ageMin, ageMax);
  }, [sliderChanged]);

  function updateSearchParams(ageMin, ageMax) {
    if (ageMin === 0) {
      setSearchParams((prevParams) => prevParams.set('ageMin', `${ageMin}`));
      searchParams.delete('ageMin');
      setSearchParams(searchParams);
    }
    if (ageMax === 20) {
      setSearchParams((prevParams) => prevParams.set('ageMax', `${ageMax}`));
      searchParams.delete('ageMax');
      setSearchParams(searchParams);
    }
    if (ageMin > 0) {
      setSearchParams((prevParams) => prevParams.set('ageMin', `${ageMin}`));
    }
    if (ageMax < 20) {
      setSearchParams((prevParams) => prevParams.set('ageMax', `${ageMax}`));
    }
    searchParams.delete('page');
    setSearchParams(searchParams);
  }
  return (
    <>
      <Flex align="center" justify="center" direction="column">
        <Text>Age</Text>
        <RangeSlider
          aria-label={['min', 'max']}
          max={20}
          defaultValue={[0, 20]}
          onChangeEnd={() => setSliderChanged(!sliderChanged)}
          onChange={(val) => {
            setAgeMin(val[0]);
            setAgeMax(val[1]);
          }}
        >
          <RangeSliderTrack bg={'purple.200'}>
            <RangeSliderFilledTrack bg={'purple.500'} />
          </RangeSliderTrack>

          <RangeSliderThumb zIndex="0" boxSize={6} index={0}>
            <Box p={1}>{ageMin}</Box>
          </RangeSliderThumb>
          <RangeSliderThumb zIndex="0" boxSize={6} index={1}>
            <Box p={1}>{ageMax}</Box>
          </RangeSliderThumb>
        </RangeSlider>

        <Flex justify="space-between" w="100%">
          <Text>Min</Text>
          <Text>Max</Text>
        </Flex>
      </Flex>
    </>
  );
}
