import axios from 'axios'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input,Text } from '@chakra-ui/react';

export default function LoginPage(){
    const { handleSubmit, formState: { errors, isSubmitting }, trigger, register, watch } = useForm( {reValidateMode: 'onChange' });
    const navigate = useNavigate()
    function login(data){
        axios.post('https://frontend-take-home-service.fetch.com/auth/login',{...data})
        .then(response => {
            // Login successful, do something with the auth cookie
            if (response.status === 200){
                console.log('navigating')
                navigate('search')
                
            }
            console.log("success",response)
          })
          .catch(error => {
            // Login failed, handle the error
            console.log("error",error)
          });
    }

    // #EDF2F7 gray 100

    
    return (
        <>
        <Container>
    <Flex width="full" align="center" justifyContent="center" flexDirection="column" bg={'whiteAlpha.700'} boxShadow="lg">
        <Box p={2}>
            <Heading>Login</Heading>
        </Box>

        <Box p={4}>
        <form onSubmit={handleSubmit(login)}>
            <FormControl isInvalid={errors.name} border={1} borderColor='#E2E8F0'>
               
                <FormLabel >Name<Text verticalAlign='super' as='span'>&lowast;</Text></FormLabel>
                <Input {...register("name",{ required: 'This is required'})}/>
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={errors.email} border={1} borderColor='#E2E8F0'>
            <FormLabel>Email<Text verticalAlign='super' as='span'>&lowast;</Text></FormLabel>
            <Input type='email' {...register("email",{ required: 'This is required'})} />
            <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <Button width="full" mt={4} bg={'purple.500'} color={'white'} type="submit"  isLoading={isSubmitting}>Login</Button>
        </form>
        </Box>
    </Flex>
    </Container>
        </>
    )
}