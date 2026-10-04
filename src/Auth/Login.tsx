import { useAuth } from "./useAuth.tsx";
import { loginWithYandex } from "./YandexLogin.ts";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
  };

  useEffect(() => {
    if (!showConfirm) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowConfirm(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showConfirm]);

  return (
    <>
      {user ? (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          title={user.login}
          aria-label={`Выйти из аккаунта ${user.login}`}
          className="cursor-pointer"
        >
          {user.default_avatar_id ? (
            <img
              src={`https://avatars.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`}
              alt={user.login}
              className="w-8 h-8 rounded-full ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-yellow-400 ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]">
              <FaUser size={16} aria-hidden="true" />
            </div>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={loginWithYandex}
          aria-label="Войти через Яндекс"
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/40 hover:border-yellow-400 hover:text-yellow-400 transition-colors cursor-pointer"
        >
          <FaUser size={16} aria-hidden="true" />
        </button>
      )}

      {showConfirm && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 overscroll-contain"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <h2 id="logout-title" className="text-lg font-bold text-white">Выйти из аккаунта?</h2>
            <p className="mt-2 text-sm font-light text-white/50">
              Вы уверены, что хотите выйти?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-full border border-white/20 px-5 py-2 text-xs font-light uppercase tracking-widest text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="rounded-full border border-yellow-400 px-5 py-2 text-xs font-light uppercase tracking-widest text-yellow-400 transition-colors hover:bg-yellow-400/10"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
