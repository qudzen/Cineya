import logo from './assets/cineya.png';
import {Routes, Route, NavLink} from "react-router-dom";
import Movies from "./Pages/Movies.tsx";
import Home from "./Pages/Home/Home.tsx";
import NewMovies from "./Pages/NewMovies.tsx";
import MyList from "./Pages/MyList.tsx";
import PageFilm from "./Pages/PageFilm.tsx";
import Search from "./Pages/Search.tsx";

function App() {

    return (
        <div className="bg-white text-black">
            <header className="flex flex-row">
                <img src={logo} alt='логотип сайта' className='lg:w-15'/>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/movies">Фильмы</NavLink>
                <NavLink to="/newMovies">Новинки</NavLink>
                <NavLink to="/myList">Моё</NavLink>
                <Search />
            </header>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/newMovies' element={<NewMovies />} />
              <Route path='/myList' element={<MyList />} />
              <Route path='/movie/:id' element={<PageFilm />} />
          </Routes>
        </div>
    )
}

export default App
