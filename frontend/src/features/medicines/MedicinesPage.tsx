import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Medicine } from "../../lib/types";

export function MedicinesPage(): JSX.Element {
  const [items, setItems] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);

  async function load(): Promise<void> {
    try {
      setError("");
      setItems(await api.get<Medicine[]>("/api/medicines/"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load medicines.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      await api.post<Medicine>("/api/medicines/", {
        name,
        category,
        price,
        stock,
      });
      setName("");
      setCategory("");
      setPrice("");
      setStock(0);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create medicine.");
    }
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">Medicines</h1>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="rounded border px-3 py-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input className="rounded border px-3 py-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input
          type="number"
          className="rounded border px-3 py-2"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
          min={0}
        />
        <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white sm:col-span-2" type="submit">
          Add Medicine
        </button>
      </form>

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
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.category}</td>
                <td className="px-3 py-2">{item.price}</td>
                <td className="px-3 py-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
