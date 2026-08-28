# Smart Admin

Nền tảng web quản trị cho Smart Platform, xây bằng Next.js App Router, React, TypeScript và Tailwind CSS.

Foundation hiện tại gồm:

- Trang đăng nhập và auth adapter có thể chuyển giữa `mock` và backend API.
- Route guard yêu cầu vai trò `admin` cho toàn bộ khu vực được bảo vệ.
- App shell responsive với sidebar, dashboard và các trang placeholder kiểm duyệt người dùng/nội dung.
- API client dùng cookie session, xử lý lỗi chuẩn hóa và không lưu access token ở browser storage.
- Lint, type-check, unit test, coverage và production build scripts.

## Chạy local

Yêu cầu Node.js `>=20.9` và npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Ở chế độ mock, dùng email `NEXT_PUBLIC_MOCK_ADMIN_EMAIL` (mặc định `admin@example.com`) và mật khẩu bất kỳ từ 8 ký tự. Một email hợp lệ khác nhận vai trò `viewer` để kiểm tra luồng chặn quyền.

Không bật mock auth trong môi trường deploy.

## Auth/RBAC integration boundary (GLI-11)

`src/lib/auth/api-auth-adapter.ts` cô lập hợp đồng auth tạm thời để foundation không phụ thuộc vào tiến độ endpoint GLI-11. Chế độ `api` hiện giả định:

| Method | Path mặc định | Request | Response |
| --- | --- | --- | --- |
| `POST` | `/auth/login` | `{ "email": string, "password": string }` | `{ "user": { "id", "email", "name", "roles": string[] } }` |
| `GET` | `/auth/me` | — | Cùng response trên |
| `POST` | `/auth/logout` | — | `204` hoặc JSON rỗng |

Mọi request gửi `credentials: "include"`; backend được kỳ vọng quản lý session bằng cookie `HttpOnly`. Nếu GLI-11 chốt JWT hoặc response khác, chỉ cần thay `ApiAuthAdapter` và giữ nguyên provider/route guard. Route guard phía client là lớp điều hướng UX; backend vẫn phải thực thi RBAC cho mọi API quản trị.

## Environment variables

| Biến | Bắt buộc | Mục đích |
| --- | --- | --- |
| `NEXT_PUBLIC_AUTH_MODE` | Có khi deploy | Đặt `api`; `mock` chỉ dùng local |
| `NEXT_PUBLIC_API_BASE_URL` | Có khi backend khác origin | Base URL của `smart-platform-services`, không có dấu `/` cuối |
| `NEXT_PUBLIC_AUTH_LOGIN_PATH` | Không | Mặc định `/auth/login` |
| `NEXT_PUBLIC_AUTH_SESSION_PATH` | Không | Mặc định `/auth/me` |
| `NEXT_PUBLIC_AUTH_LOGOUT_PATH` | Không | Mặc định `/auth/logout` |
| `NEXT_PUBLIC_MOCK_ADMIN_EMAIL` | Chỉ local mock | Email nhận vai trò admin trong adapter mock |

Các biến `NEXT_PUBLIC_*` được đưa vào bundle phía browser, vì vậy không lưu secret/token trong những biến này.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run test:coverage
npm run build
```

`npm run check` chạy lint, type-check, test và production build liên tiếp. Unit tests map với AC nền tảng:

- Admin session được cho phép vào protected area.
- Session không có vai trò admin bị chuyển sang trang unauthorized.
- Người chưa đăng nhập bị chuyển về login và return path được chống open redirect.
- Mock adapter đăng nhập, phục hồi và đăng xuất qua boundary độc lập với backend.

## Vercel assumptions (handoff cho GLI-28)

1. Import repository `smart-admin` và chọn Next.js framework preset; project root là repository root.
2. Dùng `npm install`/`npm ci` và build command `npm run build`. Vercel không cần custom output directory cho Next.js.
3. Chọn Node.js 20.9 trở lên theo yêu cầu của Next.js và `package.json`.
4. Cấu hình `NEXT_PUBLIC_AUTH_MODE=api`, `NEXT_PUBLIC_API_BASE_URL` cùng các path override cần thiết cho Preview và Production.
5. Nếu frontend/backend khác origin, backend phải allow đúng Vercel origins, bật credentialed CORS và cấu hình cookie cross-site phù hợp (`Secure`; kiểm tra chính sách `SameSite` theo domain thực tế).
6. Chạy `npm run check` trong CI trước deployment. Không đưa `.env.local`, password, token hoặc cookie secret vào Git.

Foundation này chỉ chuẩn bị deployment; việc tạo/link Vercel project và domain nằm trong GLI-28.
