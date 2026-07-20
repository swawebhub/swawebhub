"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/post";

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function addCategory() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to add category");
        return;
      }
      setName("");
      setSuccess("Category added.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function startEdit(c: Category) {
    setEditingId(String(c._id));
    setEditName(c.name);
    setError(null);
    setSuccess(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    const trimmed = editName.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/categories/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to update");
        return;
      }
      setEditingId(null);
      setEditName("");
      setSuccess("Category updated.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function removeCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to delete");
        return;
      }
      setSuccess("Category deleted.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-master focus:ring-2 focus:ring-master/30";

  return (
    <div className="mt-8">
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
      )}

      <div className="flex gap-3">
        <input
          className={`${field} max-w-sm`}
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
        />
        <button type="button" onClick={addCategory} disabled={busy} className="btn-primary disabled:opacity-60">
          Add
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card">
        {categories.length === 0 ? (
          <p className="px-5 py-6 text-sm text-ink/60">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-ink/5">
            {categories.map((c) => {
              const id = String(c._id);
              const isEditing = editingId === id;
              return (
                <li key={id} className="flex items-center justify-between gap-3 px-5 py-4">
                  {isEditing ? (
                    <input
                      className={field}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div>
                      <div className="font-semibold text-ink">{c.name}</div>
                      <div className="text-xs text-ink/50">{c.slug}</div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button type="button" onClick={saveEdit} disabled={busy} className="btn-outline text-xs">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="btn-outline text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => startEdit(c)} className="btn-outline text-xs">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCategory(id)}
                          disabled={busy}
                          className="btn-outline border-red-300 text-xs text-red-600 disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
