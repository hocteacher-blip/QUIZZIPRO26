# QUIZZI ARENA PRO – Bản tái xây dựng V2

Nền tảng web tiếng Việt dành cho giáo viên tổ chức học liệu, lớp học, bài tập và cuộc thi tương tác. Frontend dùng React 19 + TypeScript + Vite; Firebase Authentication/Firestore dùng cho tài khoản, dữ liệu và phòng thi trực tuyến; Vercel triển khai website.

## 1. Chức năng có trong bản V2

- Dashboard giáo viên với chỉ số học liệu, lớp và nhiệm vụ.
- Quản lý lớp học: tạo lớp, khối, năm học, sĩ số; đồng bộ Firestore khi giáo viên đăng nhập Firebase.
- Quản lý bộ đề: tạo, sửa, xóa, phân loại môn/khối, lưu Firestore.
- Biên tập câu hỏi: trắc nghiệm một đáp án, nhiều đáp án, đúng/sai, trả lời ngắn và điền khuyết; điểm, thời gian, giải thích.
- Nhập câu hỏi trắc nghiệm từ CSV theo mẫu; xuất mẫu CSV.
- Trợ lý Gemini tạo câu hỏi qua Firebase AI Logic khi đã cấu hình và được cấp quyền.
- Tạo phòng thi PIN 6 số; trang học sinh `/join?pin=...`; QR/link tham gia; danh sách người chơi.
- Phòng thi realtime qua Firestore; giáo viên bắt đầu, chuyển câu, kết thúc; học sinh gửi câu trả lời; bảng xếp hạng và xuất kết quả CSV.
- Quản lý nhiệm vụ gắn với bộ đề và lớp; lưu Firestore khi đăng nhập.
- Báo cáo tổng quan, cài đặt, xuất bản sao JSON và giao diện quản trị.
- Giao diện responsive, chế độ tối/sáng.

## 2. Chạy cục bộ

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Kiểm tra mã nguồn và bản build:

```bash
npm run typecheck
npm run build
npm run preview
```

## 3. Cấu hình Firebase

1. Tạo project tại https://console.firebase.google.com/.
2. Thêm ứng dụng Web và lấy cấu hình SDK.
3. Authentication → Sign-in method: bật Google và Anonymous.
4. Firestore Database → tạo database.
5. Firestore → Rules: dán nội dung `firestore.rules` và Publish.
6. Tạo `.env.local` ở thư mục gốc, theo `.env.example`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

7. Authentication → Settings → Authorized domains: thêm domain Vercel.
8. Muốn dùng AI, bật Firebase AI Logic và kiểm tra model/quota khả dụng cho project.

Không đưa file `.env.local` lên GitHub. Các biến `VITE_*` được đóng vào mã frontend khi build; không đặt private key, mật khẩu hoặc service-account JSON ở đây.

## 4. Triển khai GitHub → Vercel

- Giải nén ZIP sao cho `package.json`, `index.html`, `src/` nằm ngay ở thư mục gốc repository.
- Nếu repository cũ đang chứa bản demo, xóa các file cũ trước khi tải toàn bộ nội dung bản V2 lên. Không tải ZIP như một file đơn lẻ.
- Vercel Project Settings: Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.
- Thêm đủ 6 biến `VITE_FIREBASE_*` trong Environment Variables (Production, Preview nếu cần), rồi Deploy.
- Vercel đã có `vercel.json` rewrite để hỗ trợ đường dẫn `/join`.

## 5. Firestore data model

- `quizzes/{quizId}` – bộ đề thuộc `ownerUid`.
- `classes/{classId}` – lớp thuộc `ownerUid`.
- `assignments/{assignmentId}` – nhiệm vụ thuộc `ownerUid`.
- `rooms/{pin}` – thông tin phiên thi và câu hỏi công khai.
- `rooms/{pin}/players/{uid}` – người tham gia.
- `rooms/{pin}/answers/{questionId_uid}` – câu trả lời; chỉ host đọc, học sinh chỉ được tạo một lần cho câu đang mở.
- `rooms/{pin}/questionKeys/{questionId}` – đáp án, chỉ host đọc.

## 6. Các giới hạn quan trọng – đọc trước khi dùng thật

Đây là **bản V2/MVP có chức năng thực tế**, chưa phải bản thương mại đã nghiệm thu đủ toàn bộ yêu cầu vận hành trường học.

- Chế độ không có Firebase lưu dữ liệu cục bộ trong trình duyệt; không đồng bộ giữa các thiết bị.
- Dữ liệu lớp và nhiệm vụ hiện lưu thông tin lớp/sĩ số và metadata nhiệm vụ. Chưa có sổ danh sách học sinh chi tiết, luồng học sinh nộp bài tập từ xa, chấm bài tự luận, hay báo cáo tiến bộ từng em.
- Nhập câu hỏi hiện hỗ trợ CSV; chưa có bộ đọc Word/PDF/Excel.
- Chưa có phân hệ ghép cặp hoàn chỉnh, giám sát thi, chống gian lận nâng cao, phân quyền nhiều cấp, nhật ký kiểm toán đầy đủ.
- Giáo viên đang điều khiển chuyển câu và chấm điểm từ trình duyệt host. Firestore Rules bảo vệ đáp án và khóa việc học sinh sửa/gửi lại câu trả lời; giới hạn thời gian hiện còn được kiểm tra ở client nên chưa chống được người cố tình can thiệp trình duyệt. Đây chưa phải mô hình chấm điểm server-authoritative. Muốn chống gian lận ở mức cao cần backend tin cậy (ví dụ Cloud Functions/Cloud Run), có thể phát sinh chi phí.
- QR tham gia được tạo qua dịch vụ QR bên ngoài; đường link tham gia vẫn có thể sao chép trực tiếp nếu dịch vụ QR không khả dụng.
- Chưa chạy được kiểm thử production build, trình duyệt thật và tải đồng thời 100 người trong môi trường tạo mã hiện tại vì không truy cập được npm registry. Không được coi mục tiêu 100 người là đã kiểm chứng. Phải chạy `npm install`, `npm run typecheck`, `npm run build` trên máy có mạng và thử tải trên Firebase project trước khi dùng trong sự kiện thật.
- Firebase Spark và các dịch vụ miễn phí có quota. Khi vượt quota, thao tác có thể bị từ chối hoặc tạm ngừng. Vercel Hobby có điều khoản/giới hạn riêng; không cam kết vận hành miễn phí vô hạn.

## 7. Bố cục mã nguồn

```text
src/
  App.tsx             Luồng màn hình và thao tác người dùng
  styles.css          Giao diện responsive
  types.ts            Kiểu dữ liệu miền nghiệp vụ
  lib/firebase.ts     Khởi tạo Firebase, đăng nhập, Gemini
  lib/store.ts        Bộ đề, phòng thi, người chơi, câu trả lời
  lib/workspace.ts    Lớp học và nhiệm vụ
firestore.rules       Quy tắc bảo mật Firestore
vercel.json           Rewrite SPA
```
