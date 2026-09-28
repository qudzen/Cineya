import { useAuth } from "../Pages/Hooks/useAuth";
import { loginWithYandex } from "../YandexLogin";
import { FaUser } from "react-icons/fa";

export default function AuthButton() {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <div
          className="cursor-pointer"
          onClick={logout}
          title={user.login}
        >
          {user.default_avatar_id ? (
            <img
              src={`https://avatars.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`}
              alt={user.login}
              className="w-8 h-8 rounded-full ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-yellow-400 ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]">
              <FaUser size={16} />
            </div>
          )}
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
