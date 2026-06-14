import logo from './assets/cineya.png';
import {Routes, Route, NavLink, useLocation} from "react-router-dom";
import Movies from "./Pages/Movies/Movies.tsx";
import Home from "./Pages/Home/Home.tsx";
import NewMovies from "./Pages/New Film/NewMovies.tsx";
import MyList from "./Pages/My List/MyList.tsx";
import PageFilm from "./Pages/Components/PageFilm.tsx";
import Search from "./Search.tsx";




function App() {
    const location = useLocation()

    return (
        <div className="text-white">
            <header className="flex items-center justify-between px-8 py-4 bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
                <img src={logo} alt='логотип сайта' className='w-12'/>

                <nav className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`
                        }
                    >Главная</NavLink>
                    <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                            `text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`
                        }
                    >Фильмы</NavLink>
                    <NavLink
                        to="/newMovies"
                        className={({ isActive }) =>
                            `text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`
                        }
                    >Новинки</NavLink>
                    <NavLink
                        to="/myList"
                        className={({ isActive }) =>
                            `text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`
                        }
                    >Моё</NavLink>
                </nav>

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
