import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { InventoryItem, Medicine, Pharmacy } from "../../lib/types";

type Counts = {
  pharmacies: number;
  medicines: number;
  inventory: number;
};

export function DashboardPage(): JSX.Element {
  const [counts, setCounts] = useState<Counts>({ pharmacies: 0, medicines: 0, inventory: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const [pharmacies, medicines, inventory] = await Promise.all([
          api.get<Pharmacy[]>("/api/pharmacies/"),
          api.get<Medicine[]>("/api/medicines/"),
          api.get<InventoryItem[]>("/api/inventory/"),
        ]);
        setCounts({
          pharmacies: pharmacies.length,
          medicines: medicines.length,
          inventory: inventory.length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load dashboard.");
      }
    }

    void load();
  }, []);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      {error ? <p className="mb-4 text-sm text-rose-600">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Pharmacies" value={counts.pharmacies} />
        <Card title="Medicines" value={counts.medicines} />
        <Card title="Inventory Items" value={counts.inventory} />
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }): JSX.Element {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
