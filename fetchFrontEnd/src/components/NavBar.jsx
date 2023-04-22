import axios from 'axios';

import { Outlet, useNavigate, Link as ReactLink } from 'react-router-dom';
import { Flex, Heading, Button, Link } from '@chakra-ui/react';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState();
  axios.defaults.withCredentials = true;
  function logout() {
    axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {
      withCredentials: true,
    })
    .then(setIsLoggedIn(false)).then(navigate('/'));
  }

  return (
    <>
      <Flex
        width={'100%'}
        p={10}
        bg={'purple.700'}
        alignItems={{ base: 'center', md: 'baseline' }}
        gap={5}
        justifyContent={{ base: 'center', md: 'space-between' }}
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Heading color={'white'} p={3}>
          Fetch and Adopt
        </Heading>

        {isLoggedIn && (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={5}
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            <Link
              as={ReactLink}
              color={'white'}
              fontSize={'md'}
              fontWeight={'700'}
              to={'/favorites'}
              textUnderlineOffset={4}
              _hover={{ textDecoration: 'underline' }}
              textDecoration={activeLink === '/favorites' && 'underline'}
              onClick={() => setActiveLink('/favorites')}
            >
              {' '}
              Favorites
            </Link>
            <Link
              as={ReactLink}
              color={'white'}
              fontSize={'md'}
              fontWeight={'700'}
              to={'/Search'}
              textUnderlineOffset={4}
              _hover={{ textDecoration: 'underline' }}
              textDecoration={activeLink === '/search' && 'underline'}
              onClick={() => setActiveLink('/search')}
            >
              Browse Dogs
            </Link>
            <Link
              as={ReactLink}
              color={'white'}
              fontSize={'md'}
              fontWeight={'700'}
              to={'/match'}
              textUnderlineOffset={4}
              _hover={{ textDecoration: 'underline' }}
              textDecoration={activeLink === '/match' && 'underline'}
              onClick={() => setActiveLink('/match')}
            >
              Match
            </Link>
            <Button
              color={'white'}
              bg={'purple.400'}
              fontSize={'lg'}
              _hover={{ bg: 'purple.300' }}
              onClick={logout}
            >
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
      {isLoggedIn ? <Outlet /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}
