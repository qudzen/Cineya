import {NavLink} from "react-router-dom";
import {FaFilm, FaHeart, FaHome, FaStar} from "react-icons/fa";

export default function HeaderMobile() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-white/10 flex justify-around pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-light tracking-widest uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${isActive ? 'text-yellow-400' : 'text-white/30'}`}>
                <FaHome size={20} aria-hidden="true"/><span>Главная</span>
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-light tracking-widest uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${isActive ? 'text-yellow-400' : 'text-white/30'}`}>
                <FaFilm size={20} aria-hidden="true"/><span>Фильмы</span>
            </NavLink>
            <NavLink to="/newMovies" className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-light tracking-widest uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${isActive ? 'text-yellow-400' : 'text-white/30'}`}>
                <FaStar size={20} aria-hidden="true"/><span>Новинки</span>
            </NavLink>
            <NavLink to="/myList" className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-light tracking-widest uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${isActive ? 'text-yellow-400' : 'text-white/30'}`}>
                <FaHeart size={20} aria-hidden="true"/><span>Моё</span>
            </NavLink>
        </nav>
    )
}
