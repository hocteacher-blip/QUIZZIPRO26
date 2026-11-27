# QUIZZI ARENA PRO

Ứng dụng web quiz tương tác tiếng Việt. Frontend React + TypeScript + Vite; Firebase Authentication + Firestore cho dữ liệu trực tuyến; Vercel dùng để triển khai frontend.

## 1. Chế độ trải nghiệm và chế độ trực tuyến

- Không có cấu hình Firebase: ứng dụng chạy ở **chế độ trải nghiệm cục bộ**, dùng localStorage. Phù hợp xem giao diện và thử luồng trên cùng trình duyệt; không đồng bộ giữa các thiết bị.
- Có cấu hình Firebase: giáo viên đăng nhập Google, học sinh đăng nhập ẩn danh, phòng và câu trả lời đồng bộ qua Firestore.

## 2. Chạy trên máy tính

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal.

Kiểm tra bản build:

```bash
npm run build
npm run preview
```

## 3. Tạo Firebase miễn phí

1. Mở https://console.firebase.google.com/ và tạo project.
2. Thêm ứng dụng Web (biểu tượng `</>`), sao chép cấu hình Firebase.
3. Authentication → Sign-in method: bật **Google** và **Anonymous**.
4. Firestore Database → Create database.
5. Mở Rules, dán toàn bộ nội dung file `firestore.rules`, bấm Publish.
6. Project settings → Your apps → SDK setup and configuration → Config.
7. Tạo file `.env.local` ở thư mục gốc, điền các giá trị (không thêm dấu ngoặc nhọn):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=ten-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ten-project
VITE_FIREBASE_STORAGE_BUCKET=ten-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

8. Authentication → Settings → Authorized domains: thêm domain Vercel sau khi deploy.
9. Chạy lại `npm run dev` để kiểm tra đăng nhập Google và học sinh vào phòng từ thiết bị khác.

**Lưu ý:** Firebase Spark có hạn mức miễn phí. Firestore có thể từ chối thao tác khi vượt quota. Theo dõi Usage trong Firebase Console. Không nhập thông tin thanh toán nếu yêu cầu giữ ngân sách 0 đồng.

## 4. Đưa lên Vercel bằng GitHub

### A. Đưa mã nguồn lên GitHub

1. Giải nén `quizzi-arena-pro.zip`.
2. Đăng nhập https://github.com/ → New repository.
3. Đặt tên `quizzi-arena-pro`, chọn Private hoặc Public, Create repository.
4. Chọn **uploading an existing file**.
5. Mở thư mục đã giải nén, chọn toàn bộ FILE VÀ THƯ MỤC bên trong (không tải nguyên thư mục lồng thêm một cấp), kéo vào vùng upload GitHub.
6. Commit changes.

### B. Import vào Vercel

1. Mở https://vercel.com/ và đăng nhập bằng GitHub.
2. Add New → Project → Import repository `quizzi-arena-pro`.
3. Framework Preset: Vite; Build Command: `npm run build`; Output Directory: `dist`.
4. Environment Variables: thêm đủ 6 biến `VITE_FIREBASE_...` giống `.env.local`.
5. Bấm Deploy.
6. Khi deploy xong, mở URL `.vercel.app` để kiểm tra.
7. Quay lại Firebase → Authentication → Settings → Authorized domains, thêm tên miền `.vercel.app`.
8. Redeploy Vercel nếu vừa thêm hoặc sửa biến môi trường.

Mỗi lần cập nhật mã nguồn trên GitHub, Vercel tự tạo deployment mới.

## 5. Các chức năng hiện có

- Trang giới thiệu responsive; giao diện sáng/tối.
- Dashboard giáo viên, quản lý bộ đề, thêm/sửa/xóa câu hỏi.
- Câu hỏi trắc nghiệm 4 lựa chọn, đáp án đúng, điểm và thời gian.
- Tạo phòng PIN 6 chữ số; danh sách người tham gia; chờ bắt đầu.
- Học sinh vào bằng PIN, tên và đội; không cần tài khoản Google.
- Đồng bộ trạng thái phòng/người chơi qua Firestore realtime.
- Giáo viên chuyển câu, kết thúc bài; chấm điểm theo đáp án lưu riêng trong Firestore.
- Bảng xếp hạng và xuất CSV mở được bằng Excel.
- Tích hợp Gemini qua Firebase AI Logic để sinh câu hỏi (sau khi cấu hình Firebase và bật dịch vụ/model tương thích trong Firebase Console).

## 6. Giới hạn cần biết trước khi dùng thật

- Đây là bản MVP chạy được, không phải hệ thống thi có chống gian lận cấp cao. Trình duyệt giáo viên đang điều phối việc chuyển câu và chấm điểm; giáo viên cần giữ tab phòng thi mở trong suốt cuộc thi.
- Bộ đề mẫu và chế độ demo dùng localStorage. Dữ liệu trực tuyến chỉ hoạt động sau khi cấu hình Firebase.
- Câu hỏi trong phòng được công bố cho người chơi; đáp án đúng lưu trong `questionKeys` và chỉ host đọc được theo Firestore Rules.
- Chế độ AI phụ thuộc quyền truy cập Firebase AI Logic, model khả dụng, quota và App Check theo cấu hình dự án.
- Không thể cam kết 100 người đồng thời chỉ bằng mã nguồn. Cần thử tải thật trên Firebase project và theo dõi quota, chi phí, độ trễ trước khi tổ chức sự kiện lớn. Giữ Spark/không bật billing để tránh phát sinh chi phí; khi chạm quota miễn phí, thao tác có thể tạm dừng.
- Bản hiện tại hỗ trợ trắc nghiệm lựa chọn; các dạng ghép đôi, điền khuyết và phân tích báo cáo nâng cao là phần mở rộng tiếp theo.

## 7. Cấu trúc

```text
src/
  lib/       Firebase và các thao tác dữ liệu
  types.ts   Kiểu dữ liệu
  App.tsx    Luồng màn hình và nghiệp vụ giao diện
  styles.css Giao diện responsive
firestore.rules
```
