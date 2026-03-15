import { Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/auth";

export function HomePage(): JSX.Element {
  const loggedIn = isLoggedIn();

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">Welcome to Dewaye</h1>
        <p className="text-lg text-slate-600">
          Your comprehensive pharmacy management and medicine discovery platform
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Browse Medicines</h2>
          <p className="mb-4 text-slate-600">
            Explore our complete catalog of medicines. Search by name, filter by category, and check availability.
          </p>
          <Link
            to="/medicines"
            className="inline-block rounded bg-slate-900 px-4 py-2 font-medium text-white hover:bg-black"
          >
            Browse Medicines →
          </Link>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Find Pharmacies</h2>
          <p className="mb-4 text-slate-600">
            Discover pharmacy locations near you. View contact information and find the nearest pharmacy.
          </p>
          <Link
            to="/pharmacies"
            className="inline-block rounded bg-slate-900 px-4 py-2 font-medium text-white hover:bg-black"
          >
            Browse Pharmacies →
          </Link>
        </div>
      </div>

      {!loggedIn && (
        <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold">Pharmacy Management</h2>
          <p className="mb-4 text-slate-600">
            Are you a pharmacy administrator? Log in to manage medicines, pharmacies, and inventory.
          </p>
          <Link
            to="/login"
            className="inline-block rounded bg-slate-900 px-6 py-2 font-medium text-white hover:bg-black"
          >
            Login to Manage
          </Link>
        </div>
      )}

      {loggedIn && (
        <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-green-900">Management Dashboard</h2>
          <p className="mb-4 text-green-700">
            You're logged in. Access the management dashboard to add and manage medicines, pharmacies, and inventory.
          </p>
          <Link
            to="/manage"
            className="inline-block rounded bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
          >
            Go to Dashboard →
          </Link>
        </div>
      )}
    </section>
  );
}

