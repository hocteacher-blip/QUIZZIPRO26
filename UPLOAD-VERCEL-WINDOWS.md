# Đưa QUIZZI ARENA PRO V2 lên GitHub và Vercel (Windows)

## A. Giải nén
1. Tải `QUIZZI_ARENA_PRO_V2.zip`.
2. Chuột phải → Extract All.
3. Mở thư mục đã giải nén. Bạn phải nhìn thấy `package.json`, `index.html`, `src`, `firestore.rules` ngay ở cấp đầu tiên.

## B. Cập nhật GitHub an toàn

Khuyến nghị tạo repository mới `QUIZZI-ARENA-PRO-V2` để giữ nguyên bản cũ làm dự phòng.

Nếu bắt buộc dùng repository hiện tại:
1. Mở repository GitHub.
2. Xóa các file/thư mục bản cũ hoặc tạo repository mới; không để lẫn file cũ với V2.
3. Chọn Add file → Upload files.
4. Mở thư mục đã giải nén, nhấn Ctrl+A để chọn toàn bộ file và thư mục bên trong (bao gồm `src`, `public`, `.env.example`, `.gitignore`).
5. Kéo các mục đã chọn vào GitHub. Không kéo file ZIP và không kéo cả thư mục cha làm thành một tầng thư mục lồng.
6. Kiểm tra `package.json` xuất hiện ở trang gốc repository.
7. Commit changes vào `main`.

Không upload `.env.local`, `.env` hoặc service account key.

## C. Import vào Vercel
1. Vào https://vercel.com/ → Add New → Project.
2. Import repository V2.
3. Framework Preset: Vite.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Install Command: để mặc định `npm install`.
8. Chưa cấu hình Firebase thì có thể xem giao diện ở chế độ cục bộ; muốn đăng nhập và thi trực tuyến phải thêm 6 biến môi trường `VITE_FIREBASE_*`.
9. Nhấn Deploy.

## D. Firebase
1. Tạo project Firebase, thêm Web App.
2. Bật Google và Anonymous trong Authentication.
3. Tạo Firestore.
4. Dán `firestore.rules` vào Firestore Rules và Publish.
5. Thêm 6 biến môi trường giống `.env.example` vào Vercel → Settings → Environment Variables.
6. Thêm domain `.vercel.app` vào Firebase Authentication → Authorized domains.
7. Redeploy sau khi thay đổi Environment Variables.

## E. Kiểm tra sau deploy
- Mở trang chủ và đăng nhập Google.
- Tạo bộ đề và lưu; tải lại trang để xác nhận bộ đề còn.
- Tạo phòng thi từ bộ đề.
- Mở cửa sổ ẩn danh/điện thoại, mở `/join?pin=XXXXXX`, tham gia bằng tên.
- Bắt đầu thi, gửi một câu trả lời, chuyển câu, kết thúc và kiểm tra bảng xếp hạng.
- Kiểm tra CSV kết quả mở được bằng Excel.

Nếu Build Logs báo lỗi, gửi nguyên văn log. Không sửa tay các file build output trên Vercel.
