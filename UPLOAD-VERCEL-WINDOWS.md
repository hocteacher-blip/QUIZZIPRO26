# Đưa QUIZZI ARENA PRO V2.1 – Giao diện sáng lên GitHub và Vercel (Windows)

## A. Giải nén
1. Tải `QUIZZI_ARENA_PRO_V2_1_LIGHT.zip`.
2. Chuột phải → Extract All.
3. Mở thư mục đã giải nén. Bạn phải nhìn thấy `package.json`, `index.html`, `src`, `firestore.rules` ngay ở cấp đầu tiên.

## B. Cập nhật repository GitHub đang dùng

Repository cần cập nhật là `hocteacher-blip/QUIZZIPRO26` (repository trước đó đã nối với Vercel). Không cần tạo Firebase và không cần tạo repository mới.

1. Mở https://github.com/hocteacher-blip/QUIZZIPRO26.
2. Kiểm tra đang ở nhánh `main`.
3. Mở thư mục dự án đã giải nén trên máy tính. Ở cấp đầu tiên phải nhìn thấy `package.json`, `index.html`, `src`, `public`.
4. Trên GitHub chọn **Add file → Upload files**.
5. Kéo các file và thư mục bên trong dự án đã giải nén vào vùng upload. Không kéo ZIP và không kéo thư mục cha lồng vào repository.
6. Nếu GitHub báo file trùng đường dẫn, chọn cập nhật/ghi đè phiên bản cũ. Các file cũ không còn trong bản mới thì xóa khỏi repository để tránh lưu mã nguồn hai phiên bản.
7. Ở cuối trang, nhập commit message `Update QUIZZI ARENA PRO 2.1 Light Edition` và nhấn **Commit changes**.
8. Kiểm tra trang gốc repository hiển thị `package.json`, `index.html`, `src/`, `public/`.

Không upload `.env.local`, `.env` hoặc service account key. Các file `.gitignore` và `.env.example` là file hỗ trợ; nếu Windows ẩn file có dấu chấm đầu tên, bật View → Show → Hidden items để nhìn thấy chúng.

## C. Import vào Vercel
1. Vào https://vercel.com/ → Add New → Project.
2. Chọn repository `hocteacher-blip/QUIZZIPRO26` đã kết nối trước đó.
3. Framework Preset: Vite.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Install Command: để mặc định `npm install`.
8. **Để trống Environment Variables.** Không cần cấu hình Firebase để xuất bản bản trải nghiệm.
9. Nhấn Deploy. Nếu đây là project Vercel cũ đang nối GitHub, commit mới sẽ tự tạo deployment; không cần import project lần nữa.

## D. Firebase (BỎ QUA KHI CHỈ MUỐN ĐƯA WEBSITE LÊN VERCEL)
Firebase chỉ cần khi triển khai đồng bộ dữ liệu đa thiết bị. Bản trải nghiệm chạy không cần các thao tác này. Không cần làm phần D để website có thể xuất bản.

## E. Kiểm tra sau deploy
- Mở trang chủ; ứng dụng sẽ vào chế độ trải nghiệm, không cần đăng nhập Google.
- Tạo bộ đề và lưu; tải lại trang để xác nhận bộ đề còn.
- Tạo phòng thi từ bộ đề.
- Dữ liệu và phòng thi hiện là cục bộ, vì vậy không coi việc mở từ điện thoại/máy tính khác là kiểm thử đồng bộ nhiều thiết bị.
- Bắt đầu thi, gửi một câu trả lời, chuyển câu, kết thúc và kiểm tra bảng xếp hạng.
- Kiểm tra CSV kết quả mở được bằng Excel.

Nếu Build Logs báo lỗi, gửi nguyên văn log. Không sửa tay các file build output trên Vercel.
