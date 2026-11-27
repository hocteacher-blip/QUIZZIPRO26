# QUIZZI ARENA PRO – Bản giao diện sáng V2.1

Nền tảng web tiếng Việt dành cho giáo viên tổ chức học liệu, lớp học, bài tập và cuộc thi tương tác. Frontend dùng React 19 + TypeScript + Vite; Vercel triển khai website. Bản này mặc định chạy chế độ trải nghiệm cục bộ, không bắt buộc cấu hình Firebase để build và xuất bản website. Firebase chỉ là phần tích hợp tùy chọn cho giai đoạn đồng bộ đa thiết bị.

## 1. Chức năng có trong bản V2.1

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
- Giao diện responsive, mặc định sáng, có thể chuyển sang tối; lựa chọn giao diện được ghi nhớ trên thiết bị.

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

## 3. Cần Firebase để xuất bản không?

**Không.** Để đưa website lên Vercel ở chế độ trải nghiệm, không cần tạo Firebase, không cần nhập 6 biến môi trường, không cần bật Google/Anonymous Authentication và không cần tạo Firestore. Chỉ cần GitHub và Vercel.

Khi chưa có Firebase:
- Bộ đề, lớp học và nhiệm vụ lưu trong `localStorage` của trình duyệt hiện tại.
- Phòng thi chỉ hoạt động trong cùng trình duyệt/môi trường lưu trữ cục bộ; không đồng bộ giữa điện thoại và máy tính khác nhau.
- Tạo câu hỏi AI chưa khả dụng.

Firebase là phần tích hợp tùy chọn nếu sau này cần đăng nhập giáo viên, lưu dữ liệu đám mây và đồng bộ phòng thi giữa nhiều thiết bị. Khi triển khai phần đó cần tạo Firebase Web App, bật Authentication, tạo Firestore, cài Rules và thêm 6 biến trong `.env.example` vào Vercel. Không làm các bước này khi chỉ muốn xuất bản bản trải nghiệm.

## 4. Triển khai GitHub → Vercel

- Giải nén ZIP sao cho `package.json`, `index.html`, `src/` nằm ngay ở thư mục gốc repository.
- Cập nhật repository GitHub đang được Vercel kết nối. Thay toàn bộ nội dung bản cũ bằng bản trong ZIP mới; không upload ZIP như một file đơn lẻ và không để `package.json` nằm trong thư mục con.
- Vercel Project Settings: Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.
- **Không thêm Environment Variables** nếu chỉ triển khai bản trải nghiệm. Để trống phần này và nhấn Deploy.
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

Đây là **bản V2.1 giao diện sáng / trải nghiệm cục bộ**, chưa phải bản thương mại đã nghiệm thu đủ toàn bộ yêu cầu vận hành trường học.

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
