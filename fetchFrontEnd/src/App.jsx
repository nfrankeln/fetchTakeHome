import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar/>}>
        <Route index element={<LoginPage/>}/>
        {/* <Route path="search" element={<SearchPage/>} />
        <Route path="about" element={<MatchPage/>} /> */}
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App
