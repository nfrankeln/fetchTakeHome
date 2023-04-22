import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

import login from '../utils/login';

export default function LoginPage({ setIsLoggedIn }) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ reValidateMode: 'onChange' });
  const navigate = useNavigate();

  async function onSubmit(data) {
    const response = await login(data);
    if (response) {
      setIsLoggedIn(true);
      navigate('search');
    }
  }

  return (
    <Container>
      <Stack mt={12} spacing={4} align="center">
        <Heading>Login</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name} border={1} borderColor="#E2E8F0">
            <FormLabel>
              Name
              <Text verticalAlign="super" as="span">
                &lowast;
              </Text>
            </FormLabel>
            <Input {...register('name', { required: 'This is required' })} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.email}
            border={1}
            borderColor="#E2E8F0"
          >
            <FormLabel>
              Email
              <Text verticalAlign="super" as="span">
                &lowast;
              </Text>
            </FormLabel>
            <Input
              type="email"
              {...register('email', { required: 'This is required' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            width="full"
            mt={4}
            bg={'purple.500'}
            color={'white'}
            type="submit"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </form>
      </Stack>
    </Container>
  );
}
