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
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<LoginPage />} />
        <Route path="search" element={<SearchPage />}>
          <Route path=":breed?/:page?/:sort?" element={<SearchResults />} />
        </Route>
        <Route path='favorites' element={<FavoritesPage/>} loader={getFavDogs} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
