import axios from "axios"
import { Outlet } from "react-router-dom"
export default function Navbar(){
    axios.defaults.withCredentials = true;
    function logout(){
      axios.post("https://frontend-take-home-service.fetch.com/auth/logout",{withCredentials: true})
      .then(response => console.log(response))

    }

    return(
        <>
        <h1>NavBar</h1>
        <button onClick={logout}>Logout</button>
    
        <Outlet/>
        </>
    )
}