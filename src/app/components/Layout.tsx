import { Outlet, Link, useLocation } from "react-router";
import { BookHeart, PenLine, Home } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-white to-pink-50 flex flex-col max-w-[430px] mx-auto">
      {/* iOS Status Bar */}
      <div className="h-12 bg-white/90 backdrop-blur-xl flex items-center justify-center border-b border-pink-100">
        <span className="text-sm">9:41</span>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl px-6 py-4 border-b border-pink-100">
        <h1 className="text-3xl tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">ifeel</h1>
        <p className="text-sm text-gray-500 mt-1">understand your emotions</p>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* iOS Tab Bar */}
      <nav className="bg-white/90 backdrop-blur-xl border-t border-pink-100 px-6 py-2 pb-6">
        <div className="flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
              isActive("/") && !isActive("/diary") && !isActive("/editor")
                ? "text-pink-500"
                : "text-gray-400"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/diary"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
              isActive("/diary") ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <BookHeart className="w-6 h-6" />
            <span className="text-xs">Diary</span>
          </Link>
          <Link
            to="/editor"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
              isActive("/editor") ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <PenLine className="w-6 h-6" />
            <span className="text-xs">Text Editor</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}