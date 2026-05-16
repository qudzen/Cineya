import logo from './assets/cineya.png';
import {Routes, Route, NavLink} from "react-router-dom";
import Movies from "./Pages/Movies.tsx";
import Home from "./Pages/Home.tsx";

function App() {

    return (
        <>
            <header>
                <img src={logo} alt='логотип сайта' className='lg:w-15'/>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/movies">Фильмы</NavLink>
            </header>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />} />
          </Routes>
        </>
    )
}

export default App
