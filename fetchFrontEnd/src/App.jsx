import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SearchPage, { breedsLoader } from './pages/SearchPage';
import SearchResults, { dogsLoader } from './components/SearchResults';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar/>}>
        <Route index element={<LoginPage/>}/>
        <Route path="search" element={<SearchPage/>} loader={breedsLoader}>
          <Route path=":breed?/:page?/:sort?" element={<SearchResults/>} loader={dogsLoader} />
          </Route>
      </Route>
    )
  
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App
