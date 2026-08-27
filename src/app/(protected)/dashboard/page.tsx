import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tổng quan",
};

const overviewCards = [
  { label: "Người dùng", value: "—", helper: "Chờ kết nối dịch vụ", accent: "bg-cyan-500" },
  { label: "Nội dung chờ duyệt", value: "—", helper: "Chờ module kiểm duyệt", accent: "bg-amber-400" },
  { label: "Báo cáo mở", value: "—", helper: "Chờ nguồn dữ liệu", accent: "bg-violet-500" },
] as const;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Tổng quan</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Bảng điều khiển</h1>
          <p className="mt-2 text-sm text-slate-500">Foundation đã sẵn sàng để nhận dữ liệu từ các module tiếp theo.</p>
        </div>
        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">Dữ liệu mẫu</span>
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-3" aria-label="Chỉ số tổng quan">
        {overviewCards.map((card) => (
          <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.02]" key={card.label}>
            <span className={`absolute inset-y-0 left-0 w-1 ${card.accent}`} />
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{card.value}</p>
            <p className="mt-3 text-xs text-slate-400">{card.helper}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.02]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-950">Hoạt động gần đây</h2>
              <p className="mt-1 text-sm text-slate-500">Khu vực dành cho audit stream ở module sau.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">Placeholder</span>
          </div>
          <div className="mt-8 grid min-h-56 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
            <div className="max-w-xs px-6">
              <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-teal-400" />
              <p className="mt-4 text-sm font-semibold text-slate-700">Chưa có luồng hoạt động</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">Dữ liệu sẽ xuất hiện sau khi API nghiệp vụ được tích hợp.</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-300">Trạng thái</p>
          <h2 className="mt-3 text-xl font-bold">Admin foundation</h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            {[
              "App shell & điều hướng",
              "Admin route guard",
              "Auth adapter boundary",
              "API client & env structure",
            ].map((item) => (
              <li className="flex items-center gap-3" key={item}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-400 text-[0.65rem] font-black text-slate-950">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
