import { FormControl,FormLabel,Input,InputGroup, FormErrorMessage, InputRightElement, Button } from "@chakra-ui/react"

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom"

export default function LocationSearch(){
    const { handleSubmit, formState: { errors, isSubmitting }, trigger, register, watch } = useForm();
    let [searchParams, setSearchParams] = useSearchParams();
    let params = new URL(document.location).searchParams;
    
     function getGeoData(data){
        const zipCode = [data['zipCode']]
        setSearchParams(prev => prev.set('zipCodes', zipCode))
        searchParams.delete('pages')

        setSearchParams(searchParams)
    }
            
     
         
           
        
    
    
    
    return(

        <form w={{base:'100%',md:'35%'}} onSubmit={handleSubmit(getGeoData)}>
        <FormControl isInvalid={errors.zipCode} >
                <FormLabel>Near:</FormLabel>
                <InputGroup>
                <Input
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
                <Button type="submit" pl={15} pr={15} >Sumbit</Button>
                </InputRightElement>
                </InputGroup>
            <FormErrorMessage>
                    {errors.zipCode && errors.zipCode.message}
                </FormErrorMessage>
            </FormControl>
        </form>
    )
}