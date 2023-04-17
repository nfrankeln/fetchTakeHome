import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SearchPage, { breedsLoader } from './pages/SearchPage';
import SearchResults, { dogsLoader } from './components/SearchResults';
// , { breedsLoader }
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar/>}>
        <Route index element={<LoginPage/>}/>
        <Route path="search" element={<SearchPage/>} loader={breedsLoader}>
          <Route path=":breeds?/:zipCodes?/ageMin?/ageMax?/searchParams?" element={<SearchResults/>} loader={({params})=>dogsLoader(params)} />
          </Route>
        {/* <Route path="about" element={<MatchPage/>} /> */}
      </Route>
    )
  
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App
