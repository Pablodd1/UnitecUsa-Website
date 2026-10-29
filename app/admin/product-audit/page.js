import auditReport from "../../../static_data/product_missing_fields_report.json";
import Link from "next/link";

export const metadata = {
  title: "Admin Report — Product Data Model Audit",
  description: "Internal admin report flagging products with missing or zero fields.",
  robots: { index: false, follow: false },
};

export default function ProductAuditAdminPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          Admin Data Audit Report
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          Reporte de Campos Faltantes del Catálogo de Productos
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Total de productos auditados: <strong>{auditReport.total_products}</strong> • Productos completos:{" "}
          <strong className="text-emerald-700">{auditReport.complete_products}</strong> • Productos con campos pendientes por{" "}
          <code>[OWNER]</code>: <strong className="text-amber-700">{auditReport.incomplete_products_count}</strong>
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-sm text-amber-900 space-y-1">
        {auditReport.owner_notes.map((note, idx) => (
          <p key={idx}>• {note}</p>
        ))}
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-slate-900">SKU (ID)</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900">Nombre / Slug</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900">Categoría</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900">Campos Faltantes ([OWNER])</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {auditReport.flagged_products.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-bold text-slate-800">{item.id}</td>
                <td className="px-4 py-3">
                  <Link href={`/productos/${item.slug}`} className="font-semibold text-sky-700 hover:underline">
                    {item.name}
                  </Link>
                  <span className="block text-xs font-mono text-slate-400">/productos/{item.slug}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {item.category} / {item.subcategory}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.missing_fields.map((field) => (
                      <span
                        key={field}
                        className="px-2 py-0.5 rounded bg-red-50 border border-red-200 text-red-700 font-mono text-xs"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
