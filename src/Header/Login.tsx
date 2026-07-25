import { useAuth } from "../Pages/Hooks/useAuth";
import { loginWithYandex } from "../YandexLogin";
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
          className="text-sm font-light tracking-widest uppercase text-white/50 hover:text-yellow-400 transition-colors"
        >
          Войти
        </button>
      )}
    </>
  );
}
