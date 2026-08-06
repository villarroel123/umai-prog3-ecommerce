"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/app/actions/categories";

const initialForm = {
  name: "",
  description: "",
};

export default function CategoryManager({ initialCategories = [] }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setEditingId("");
  }, []);

  const refreshCategories = useCallback(() => {
    startRefreshTransition(() => {
      router.refresh();
    });
  }, [router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const action = editingId
      ? updateCategory.bind(null, editingId)
      : createCategory;

    try {
      const result = await action(null, formData);
      setMessage(result.message);

      if (result.ok) {
        resetForm();
        refreshCategories();
      }
    } catch {
      setMessage("Ocurrio un error al guardar la categoria.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEdit(category) {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description,
    });
    setMessage("Editando categoria.");
  }

  async function handleDelete(id) {
    const result = await deleteCategory(id);

    if (!result.ok) {
      setMessage(result.message || "No se pudo eliminar la categoria.");
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage(result.message);
    refreshCategories();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr] items-start font-lexend">
      <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-sm relative lg:sticky lg:top-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          {editingId ? "Editar categoria" : "Nueva categoria"}
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          Las categorias se pueden asociar a muchos productos.
        </p>

        <form className="mt-4 sm:mt-6 flex flex-col sm:flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-col lg:flex-col gap-3 w-full">
            <input
              className="w-full flex-1 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full flex-1 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
              name="description"
              placeholder="Descripcion"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 pt-1 sm:pt-2">
            <button
              className="flex-1 rounded-xl bg-[#4A3525] px-4 py-2.5 sm:py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#3B291C] disabled:opacity-50 transition-colors whitespace-nowrap"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
            </button>
            <button
              className="rounded-xl border border-stone-200 px-4 py-2.5 sm:py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              type="button"
              onClick={resetForm}
            >
              Limpiar
            </button>
          </div>
        </form>

        {message ? (
          <p className="mt-3 p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700">
            {message}
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">Categorias</h2>
            <p className="mt-0.5 text-xs text-stone-500">
              Lista de rubros disponibles para los productos.
            </p>
          </div>
          <button
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
            disabled={isRefreshing}
            type="button"
            onClick={refreshCategories}
          >
            {isRefreshing ? "Recargando..." : "Recargar"}
          </button>
        </div>

        {initialCategories.length === 0 ? (
          <p className="py-8 text-center text-stone-400 text-sm">
            Todavia no hay categorias cargadas.
          </p>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {initialCategories.map((category) => (
              <article
                key={category._id}
                className="rounded-xl border border-stone-200/80 p-4 sm:p-5 hover:border-stone-300 transition-all bg-white"
              >
                <h3 className="text-base font-bold text-stone-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  {category.description || "Sin descripcion"}
                </p>
                <p className="mt-2.5 break-all text-[10px] font-mono text-stone-400">
                  ID: {category._id}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 flex gap-2">
                  <button
                    className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors border border-amber-200/50"
                    type="button"
                    onClick={() => handleEdit(category)}
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 hover:bg-pink-100 transition-colors border border-pink-200/50"
                    type="button"
                    onClick={() => handleDelete(category._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}