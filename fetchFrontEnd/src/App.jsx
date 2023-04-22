import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';


import SearchResults from './components/SearchResults';
import FavoritesPage, { getFavDogs } from './pages/FavoritesPage';
import MatchPage, { getMatch } from './pages/MatchPage';

import { lazy } from 'react';

const SearchPage = lazy(()=>import('./pages/SearchPage'))
const Navbar = lazy(()=> import('./components/NavBar'))

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="search" element={<SearchPage />}>
          <Route path=":breed?/:page?/:sort?" element={<SearchResults />} />
        </Route>
        <Route
          path="favorites"
          element={<FavoritesPage />}
          loader={getFavDogs}
        />
        <Route path="match" element={<MatchPage />} loader={getMatch}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
