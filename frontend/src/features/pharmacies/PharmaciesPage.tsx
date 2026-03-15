import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Pharmacy } from "../../lib/types";

export function ManagePharmaciesPage(): JSX.Element {
  const [items, setItems] = useState<Pharmacy[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  async function load(): Promise<void> {
    try {
      setError("");
      setItems(await api.get<Pharmacy[]>("/api/pharmacies/"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load pharmacies.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      await api.post<Pharmacy>("/api/pharmacies/", {
        name,
        location,
        contact_phone: contactPhone,
        contact_email: contactEmail,
      });
      setName("");
      setLocation("");
      setContactPhone("");
      setContactEmail("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create pharmacy.");
    }
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">Pharmacies</h1>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="rounded border px-3 py-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input className="rounded border px-3 py-2" placeholder="Contact phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
        <input className="rounded border px-3 py-2" placeholder="Contact email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white sm:col-span-2" type="submit">
          Add Pharmacy
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.location}</td>
                <td className="px-3 py-2">{item.contact_phone}</td>
                <td className="px-3 py-2">{item.contact_email || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
