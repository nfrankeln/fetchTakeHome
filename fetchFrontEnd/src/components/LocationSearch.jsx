import {
  FormControl,
  Input,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

export default function LocationSearch() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  let [searchParams, setSearchParams] = useSearchParams();

  function getGeoData(data) {
    const zipCode = [data['zipCode']];
    setSearchParams((prev) => prev.set('zipCodes', zipCode));
    searchParams.delete('pages');

    setSearchParams(searchParams);
  }

  return (
    <form w={{ base: '100%', md: '35%' }} onSubmit={handleSubmit(getGeoData)}>
      <FormControl isInvalid={errors.zipCode}>
        <InputGroup>
          <Input
            bg={'purple.100'}
            borderRadius="full"
            border="1px"
            {...register('zipCode', {
              required: 'Zip code is required',
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: 'Please enter a valid zip code',
              },
            })}
            type="number"
            placeholder="Zip Code..."
          />

          <InputRightElement w={'35%'}>
            <Button
              bg={'purple.400'}
              borderRightRadius={'full'}
              color={'white'}
              _hover={{ bg: 'purple.300' }}
              type="submit"
            >
              Sumbit
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.zipCode && errors.zipCode.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}
