import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../lib/auth";

const navItemClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded px-3 py-2 text-sm ${isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`;

export function Layout(): JSX.Element {
  const navigate = useNavigate();

  function onLogout(): void {
    clearToken();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-semibold text-slate-900">
              Dewaye
            </Link>
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
              ← Back to Public Site
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/manage" end className={navItemClass}>
              Dashboard
            </NavLink>
            <NavLink to="/manage/pharmacies" className={navItemClass}>
              Pharmacies
            </NavLink>
            <NavLink to="/manage/medicines" className={navItemClass}>
              Medicines
            </NavLink>
            <NavLink to="/manage/inventory" className={navItemClass}>
              Inventory
            </NavLink>
            <button
              type="button"
              onClick={onLogout}
              className="rounded bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
