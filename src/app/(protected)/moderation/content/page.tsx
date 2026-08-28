import type { Metadata } from "next";
import { PlaceholderTable } from "@/components/ui/placeholder-table";

export const metadata: Metadata = {
  title: "Kiểm duyệt nội dung",
};

const rows = [
  { name: "Bài đăng #SP-1042", detail: "Bài đăng cộng đồng", status: "Chờ phân loại" },
  { name: "Bình luận #CM-882", detail: "Bình luận người dùng", status: "Chờ phân loại" },
  { name: "Hình ảnh #IM-431", detail: "Nội dung hình ảnh", status: "Chờ phân loại" },
];

export default function ContentModerationPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Kiểm duyệt</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Nội dung</h1>
          <p className="mt-2 text-sm text-slate-500">Khung hàng đợi sẵn sàng cho rule, bộ lọc và thao tác kiểm duyệt.</p>
        </div>
        <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">Module placeholder</span>
      </div>
      <div className="mt-8">
        <PlaceholderTable rows={rows} secondaryLabel="Loại nội dung" />
      </div>
    </div>
  );
}
