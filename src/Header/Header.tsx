import logo from "../assets/cineya2.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import Search from "./Search.tsx";
import Login from "../Auth/Login.tsx";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/movies", label: "Фильмы" },
  { to: "/newMovies", label: "Новинки" },
  { to: "/myList", label: "Моё" },
];

export default function Header() {
  const location = useLocation();
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-8 md:gap-16">
        <Link to="/" className="shrink-0" aria-label="Cineya — на главную">
          <img
            src={logo}
            alt="Логотип Cineya"
            className="w-15 md:w-20"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative text-sm font-light tracking-widest uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-yellow-400 after:transition-transform after:content-[''] hover:after:scale-x-100 ${isActive ? "text-yellow-400 after:scale-x-100" : "text-white/50 hover:text-white"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Search key={location.pathname} />
        <Login />
      </div>
    </header>
  );
}
