import logo from './assets/cineya.png';
import {Routes, Route, NavLink, useLocation} from "react-router-dom";
import Movies from "./Pages/Movies/Movies.tsx";
import Home from "./Pages/Home/Home.tsx";
import NewMovies from "./Pages/NewMovies.tsx";
import MyList from "./Pages/MyList.tsx";
import PageFilm from "./Pages/Components/PageFilm.tsx";
import Search from "./Search.tsx";




function App() {
    const location = useLocation()

    return (
        <div className="bg-black text-white">
            <header className="flex flex-row">
                <img src={logo} alt='логотип сайта' className='lg:w-15'/>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/movies">Фильмы</NavLink>
                <NavLink to="/newMovies">Новинки</NavLink>
                <NavLink to="/myList">Моё</NavLink>
                <Search key={location.pathname}/>
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
