import type { Metadata } from "next";
import { PlaceholderTable } from "@/components/ui/placeholder-table";

export const metadata: Metadata = {
  title: "Kiểm duyệt người dùng",
};

const rows = [
  { name: "Nguyễn Minh An", detail: "an@example.com", status: "Chờ dữ liệu thật" },
  { name: "Trần Hà Vy", detail: "vy@example.com", status: "Chờ dữ liệu thật" },
  { name: "Lê Tuấn", detail: "tuan@example.com", status: "Chờ dữ liệu thật" },
];

export default function UserModerationPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Kiểm duyệt</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Người dùng</h1>
          <p className="mt-2 text-sm text-slate-500">Khung danh sách sẵn sàng cho API tìm kiếm, lọc và xử lý tài khoản.</p>
        </div>
        <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">Module placeholder</span>
      </div>
      <div className="mt-8">
        <PlaceholderTable rows={rows} secondaryLabel="Email" />
      </div>
    </div>
  );
}
