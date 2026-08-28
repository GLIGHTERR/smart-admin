interface PlaceholderRow {
  name: string;
  detail: string;
  status: string;
}

export function PlaceholderTable({
  rows,
  secondaryLabel,
}: {
  rows: PlaceholderRow[];
  secondaryLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Tên</th>
              <th className="px-6 py-4 font-semibold">{secondaryLabel}</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
              <th className="px-6 py-4 text-right font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr className="text-slate-700" key={row.name}>
                <td className="px-6 py-5 font-semibold text-slate-950">{row.name}</td>
                <td className="px-6 py-5">{row.detail}</td>
                <td className="px-6 py-5">
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">{row.status}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="cursor-not-allowed rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-400" disabled type="button">
                    Sắp có
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
