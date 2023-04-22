import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SearchResults from './components/SearchResults';
import FavoritesPage, { getFavDogs } from './pages/FavoritesPage';
import MatchPage, { getMatch } from './pages/MatchPage';

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
