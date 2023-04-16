import { Outlet } from "react-router-dom"
export default function Navbar(){
    return(
        <>
        <h1>NavBar</h1>
        <Outlet/>
        </>
    )
}