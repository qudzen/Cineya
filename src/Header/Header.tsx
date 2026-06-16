import logo from "../assets/cineya.png";
import {NavLink, useLocation} from "react-router-dom";
import Search from "./Search.tsx";

export default function Header() {
    const location = useLocation()
    return (
        <header
            className="flex items-center justify-between px-4 md:px-8 py-4 bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
            <div className="flex items-center gap-8 md:gap-16">
                <img src={logo} alt='логотип сайта' className='w-10 md:w-12'/>

                <nav className="hidden md:flex items-center gap-12">
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            `text-sm font-light tracking-widest uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`
                        }
                    >Главная</NavLink>
                    <NavLink
                        to="/movies"
                        className={({isActive}) =>
                            `text-sm font-light tracking-widest uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`
                        }
                    >Фильмы</NavLink>
                    <NavLink
                        to="/newMovies"
                        className={({isActive}) =>
                            `text-sm font-light tracking-widest uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`
                        }
                    >Новинки</NavLink>
                    <NavLink
                        to="/myList"
                        className={({isActive}) =>
                            `text-sm font-light tracking-widest uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`
                        }
                    >Моё</NavLink>
                </nav>
            </div>

            <Search key={location.pathname}/>
        </header>
    )
}