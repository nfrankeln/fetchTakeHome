import axios from 'axios'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
    const { handleSubmit, formState: { errors }, trigger, register, watch } = useForm();
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



    
    return (
        <>
        <p>Login Page</p>
        <form onSubmit={handleSubmit(login)}>
            
            <label htmlFor="">Name</label>
            <input type="text" {...register("name",{ required: true})}/>
            
            <label htmlFor="">Email</label>
            <input type="text" {...register("email",{ required: true})}/>
          
            <input type="submit" />
        </form>
        </>
    )
}