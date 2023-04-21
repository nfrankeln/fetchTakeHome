import { Flex, Button, Heading, Center } from '@chakra-ui/react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  function logout() {
    axios
      .post('https://frontend-take-home-service.fetch.com/auth/logout', {
        withCredentials: true,
      })
      .then((response) => navigate('/'));
  }

  return (
    <>
      <Flex width={'100%'}  p={10} bg={'purple.700'} alignItems={"baseline"} justifyContent={"space-between"}>
      <Heading color={'white'}  p={3}>Fetch and Adopt</Heading>
      <Button color={'white'} bg={'purple.400'} fontSize={'lg'} _hover={{bg: "purple.300"}} onClick={logout}>Logout</Button>
      </Flex>
      <Outlet />
    </>
  );
}
