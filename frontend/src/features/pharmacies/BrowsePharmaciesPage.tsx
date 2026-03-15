import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Pharmacy } from "../../lib/types";

export function BrowsePharmaciesPage(): JSX.Element {
  const [items, setItems] = useState<Pharmacy[]>([]);
  const [filteredItems, setFilteredItems] = useState<Pharmacy[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function load(): Promise<void> {
    try {
      setError("");
      const pharmacies = await api.get<Pharmacy[]>("/api/pharmacies/");
      setItems(pharmacies);
      setFilteredItems(pharmacies);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load pharmacies.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Browse Pharmacies</h1>
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {/* Search */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-600">
        Showing {filteredItems.length} of {items.length} pharmacies
      </p>

      {/* Pharmacies Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-slate-500">
          {items.length === 0 ? "No pharmacies available." : "No pharmacies match your search."}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
              <div className="space-y-1 text-sm text-slate-600">
                <p className="flex items-start">
                  <span className="font-medium mr-2">📍</span>
                  <span>{item.location}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">📞</span>
                  <span>{item.contact_phone}</span>
                </p>
                {item.contact_email && (
                  <p className="flex items-start">
                    <span className="font-medium mr-2">✉️</span>
                    <span>{item.contact_email}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

