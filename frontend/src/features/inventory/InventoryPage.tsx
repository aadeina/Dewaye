import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { InventoryItem, Medicine, Pharmacy } from "../../lib/types";

export function InventoryPage(): JSX.Element {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [pharmacyId, setPharmacyId] = useState<number>(0);
  const [medicineId, setMedicineId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  async function load(): Promise<void> {
    try {
      setError("");
      const [inventoryData, pharmacyData, medicineData] = await Promise.all([
        api.get<InventoryItem[]>("/api/inventory/"),
        api.get<Pharmacy[]>("/api/pharmacies/"),
        api.get<Medicine[]>("/api/medicines/"),
      ]);
      setItems(inventoryData);
      setPharmacies(pharmacyData);
      setMedicines(medicineData);

      if (!pharmacyId && pharmacyData.length > 0) {
        setPharmacyId(pharmacyData[0].id);
      }
      if (!medicineId && medicineData.length > 0) {
        setMedicineId(medicineData[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load inventory.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      await api.post<InventoryItem>("/api/inventory/", {
        pharmacy: pharmacyId,
        medicine: medicineId,
        quantity,
      });
      setQuantity(0);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create inventory item.");
    }
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-3">
        <select className="rounded border px-3 py-2" value={pharmacyId} onChange={(e) => setPharmacyId(Number(e.target.value))}>
          {pharmacies.map((pharmacy) => (
            <option key={pharmacy.id} value={pharmacy.id}>
              {pharmacy.name}
            </option>
          ))}
        </select>
        <select className="rounded border px-3 py-2" value={medicineId} onChange={(e) => setMedicineId(Number(e.target.value))}>
          {medicines.map((medicine) => (
            <option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="rounded border px-3 py-2"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          min={0}
        />
        <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white sm:col-span-3" type="submit">
          Add Inventory Item
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-3 py-2">Pharmacy</th>
              <th className="px-3 py-2">Medicine</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2">{item.pharmacy_name}</td>
                <td className="px-3 py-2">{item.medicine_name}</td>
                <td className="px-3 py-2">{item.quantity}</td>
                <td className="px-3 py-2">{new Date(item.last_updated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
