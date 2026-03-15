import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Medicine } from "../../lib/types";

export function BrowseMedicinesPage(): JSX.Element {
  const [items, setItems] = useState<Medicine[]>([]);
  const [filteredItems, setFilteredItems] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  async function load(): Promise<void> {
    try {
      setError("");
      const medicines = await api.get<Medicine[]>("/api/medicines/");
      setItems(medicines);
      setFilteredItems(medicines);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load medicines.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, items]);

  // Get unique categories
  const categories = Array.from(new Set(items.map((item) => item.category))).sort();

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Browse Medicines</h1>
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {/* Search and Filter */}
      <div className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="rounded border px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-600">
        Showing {filteredItems.length} of {items.length} medicines
      </p>

      {/* Medicines Table */}
      {filteredItems.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-slate-500">
          {items.length === 0 ? "No medicines available." : "No medicines match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">{item.name}</td>
                  <td className="px-3 py-2">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs">{item.category}</span>
                  </td>
                  <td className="px-3 py-2">{item.price}</td>
                  <td className="px-3 py-2">
                    <span className={item.stock > 0 ? "text-green-600" : "text-rose-600"}>
                      {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

