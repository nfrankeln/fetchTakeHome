import axios from "axios"
import { Outlet } from "react-router-dom"
export default function Navbar(){
    axios.defaults.withCredentials = true;
    function logout(){
      axios.post("https://frontend-take-home-service.fetch.com/auth/logout",{withCredentials: true})
      .then(response => console.log(response))

    }
    function getDogs(){
        const breeds=["African Hunting Dog","Affenpinscher",
        "Afghan Hound"]
        
        axios.get("https://frontend-take-home-service.fetch.com/dogs/search",{params:{
            breeds:breeds,
        }})
        .then(response=>console.log(response.data.resultIds))
    }
    return(
        <>
        <h1>NavBar</h1>
        <button onClick={logout}>Logout</button>
    
        <Outlet/>
        </>
    )
}