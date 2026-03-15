import { Link, NavLink, Outlet } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

const navItemClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded px-3 py-2 text-sm ${isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`;

export function PublicLayout(): JSX.Element {
  const loggedIn = isLoggedIn();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            Dewaye
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/medicines" className={navItemClass}>
              Browse Medicines
            </NavLink>
            <NavLink to="/pharmacies" className={navItemClass}>
              Browse Pharmacies
            </NavLink>
            {loggedIn ? (
              <>
                <NavLink to="/manage" className={navItemClass}>
                  Manage
                </NavLink>
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="rounded bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

