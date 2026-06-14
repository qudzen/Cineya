import {Routes, Route} from "react-router-dom";
import Movies from "./Pages/Movies/Movies.tsx";
import Home from "./Pages/Home/Home.tsx";
import NewMovies from "./Pages/New Film/NewMovies.tsx";
import MyList from "./Pages/My List/MyList.tsx";
import PageFilm from "./Pages/Components/PageFilm.tsx";
import HeaderMobile from "./Header/HeaderMobile.tsx";
import Header from "./Header/Header.tsx";




function App() {

    return (
        <div className="text-white">
            <Header />
            <HeaderMobile />
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
