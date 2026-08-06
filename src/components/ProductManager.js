"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/app/actions/products";

const initialForm = {
  name: "",
  description: "",
  price: "",
  categories: [],
  stock: "",
};

export default function ProductManager({
  initialProducts = [],
  categories = [],
}) {
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

  const refreshProducts = useCallback(() => {
    startRefreshTransition(() => {
      router.refresh();
    });
  }, [router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSelectCategory(event) {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      categories: value ? [value] : [],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const action = editingId
      ? updateProduct.bind(null, editingId)
      : createProduct;

    try {
      const result = await action(null, formData);
      setMessage(result.message);

      if (result.ok) {
        resetForm();
        refreshProducts();
      }
    } catch {
      setMessage("Ocurrió un error al guardar el producto.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEdit(product) {
    setEditingId(product._id || product.id);

    const categoryIds = (product.categories || []).map((cat) => {
      if (typeof cat === "object" && cat !== null) {
        return cat._id || cat.id || "";
      }
      return cat || "";
    });

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      categories: categoryIds,
      stock: product.stock || "",
    });
    setMessage("Editando producto seleccionado.");
  }

  async function handleDelete(id) {
    const result = await deleteProduct(id);

    if (!result.ok) {
      setMessage(result.message || "No se pudo eliminar el producto.");
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage(result.message);
    refreshProducts();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[440px_1fr] items-start font-lexend">
      <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-sm relative lg:sticky lg:top-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          {editingId ? "Editar producto" : "Nuevo producto"}
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          Completa los datos del producto para actualizar el catálogo.
        </p>

        <form className="mt-4 sm:mt-6 space-y-3.5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Nombre
            </label>
            <input
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
              name="name"
              placeholder="Ej: Remera Algodón"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Precio ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Stock
              </label>
              <input
                type="number"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
                name="stock"
                placeholder="0"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Categoría
            </label>
            <select
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all"
              name="categories"
              value={form.categories[0] || ""}
              onChange={handleSelectCategory}
            >
              <option value="">Sin categoría</option>
              {categories.map((cat) => {
                const categoryId = cat._id || cat.id;
                return (
                  <option key={categoryId} value={categoryId}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Descripción
            </label>
            <textarea
              className="min-h-24 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-all resize-y"
              name="description"
              placeholder="Descripción opcional del producto..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              className="flex-1 rounded-xl bg-[#4A3525] px-4 py-2.5 sm:py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#3B291C] disabled:opacity-50 transition-colors whitespace-nowrap"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear producto"}
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
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">Productos</h2>
            <p className="mt-0.5 text-xs text-stone-500">
              Lista general de artículos registrados en la tienda.
            </p>
          </div>
          <button
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
            disabled={isRefreshing}
            type="button"
            onClick={refreshProducts}
          >
            {isRefreshing ? "Recargando..." : "Recargar"}
          </button>
        </div>

        {initialProducts.length === 0 ? (
          <p className="py-8 text-center text-stone-400 text-sm">
            Todavía no hay productos registrados.
          </p>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {initialProducts.map((product) => (
              <article
                key={product._id || product.id}
                className="rounded-xl border border-stone-200/80 p-4 sm:p-5 hover:border-stone-300 transition-all bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                      {product.description || "Sin descripción"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-base font-bold text-stone-900">
                      ${product.price}
                    </p>
                    {product.stock !== undefined && (
                      <p className="text-[11px] text-stone-500">
                        Stock: {product.stock}
                      </p>
                    )}
                  </div>
                </div>

                {product.categories?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.categories.map((category) => (
                      <div
                        key={typeof category === "string" ? category : (category._id || category.id)}
                        className="rounded-lg bg-stone-50 border border-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 inline-block"
                      >
                        {typeof category === "string" ? category : category.name}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-3 pt-3 border-t border-stone-100 flex gap-2 justify-end">
                  <button
                    className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors border border-amber-200/50"
                    type="button"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 hover:bg-pink-100 transition-colors border border-pink-200/50"
                    type="button"
                    onClick={() => handleDelete(product._id || product.id)}
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