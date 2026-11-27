# Cập nhật bản sửa lỗi QUIZZI ARENA PRO lên GitHub và Vercel

## 1. Cập nhật GitHub

1. Tải file ZIP mới nhất và giải nén.
2. Mở repository `QUIZZIPRO26` trên GitHub.
3. Chọn **Add file → Upload files**.
4. Kéo các file và thư mục bên trong thư mục dự án đã giải nén vào vùng upload. Nếu GitHub báo file đã tồn tại, chọn thay thế/ghi đè.
5. Đảm bảo các file gốc như `package.json`, `src/App.tsx`, `src/lib/store.ts`, `src/lib/firebase.ts` được cập nhật.
6. Nhấn **Commit changes** để lưu lên nhánh `main`.

> Không tải file ZIP nguyên khối lên repository. Không tạo thêm một thư mục con lồng `quizzi-build/` trong repository. `package.json` phải nằm ngay thư mục gốc.

## 2. Vercel tự triển khai lại

Sau khi commit, mở Vercel → Project `QUIZZIPRO26` → Deployments. Chờ deployment mới chạy. Cấu hình build: Framework **Vite**, Build Command `npm run build`, Output Directory `dist`. Root Directory để `./` nếu `package.json` nằm ở gốc repository.

## 3. Nếu vẫn lỗi

Mở deployment mới nhất → **Build Logs** và gửi toàn bộ phần log bắt đầu từ `Running npm run build` đến dòng lỗi đầu tiên. Không xóa repository hoặc tạo dự án Vercel mới trước khi kiểm tra log.
