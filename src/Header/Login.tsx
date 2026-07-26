import { useAuth } from "../Pages/Hooks/useAuth";
import { loginWithYandex } from "../YandexLogin";
import { FaUser } from "react-icons/fa";

export default function AuthButton() {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={logout}
        >
          <img
            src={`https://avatars.yandex.net/get-yapic/${user.avatar_id}/islands-50`}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-light text-white/70">{user.login}</span>
        </div>
      ) : (
        <button
          onClick={loginWithYandex}
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/40 hover:border-yellow-400 hover:text-yellow-400 transition-colors cursor-pointer"
        >
          <FaUser size={16} />
        </button>
      )}
    </>
  );
}
