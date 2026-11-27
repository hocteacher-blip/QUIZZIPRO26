# HƯỚNG DẪN ĐƯA QUIZZI ARENA PRO LÊN VERCEL (WINDOWS 10/11)

Bạn không cần mở Google AI Studio và không cần viết mã.

## Phần A — Chuẩn bị Firebase (để nhiều thiết bị dùng chung phòng)

1. Mở https://console.firebase.google.com/ và đăng nhập Google.
2. Chọn **Add project** → đặt tên `quizzi-arena-pro` → tạo project.
3. Trong trang project, chọn biểu tượng Web `</>` để đăng ký ứng dụng web. Đặt nickname `Quizzi Arena Pro Web`.
4. Sao chép 6 giá trị cấu hình Firebase. Giữ trang này để lát nữa nhập vào Vercel.
5. Vào **Build → Authentication → Get started → Sign-in method**. Bật hai phương thức:
   - Google
   - Anonymous
6. Vào **Build → Firestore Database → Create database**. Chọn vị trí gần Việt Nam nếu có, ví dụ Singapore; chọn chế độ Production.
7. Mở tab **Rules**, thay nội dung bằng toàn bộ file `firestore.rules` trong gói mã nguồn, sau đó bấm **Publish**.
8. Muốn dùng tạo câu hỏi AI: mở mục **AI Logic** trong Firebase Console, hoàn tất bước thiết lập nhà cung cấp Gemini theo hướng dẫn trên màn hình. Tính năng này phụ thuộc model, quota và điều kiện khả dụng của Firebase.

## Phần B — Đưa mã nguồn lên GitHub

1. Tải file ZIP QUIZZI ARENA PRO về máy tính và giải nén. Sau giải nén, mở thư mục `quizzi-arena-pro`.
2. Đăng nhập https://github.com/ → bấm dấu `+` → **New repository**.
3. Đặt tên repository là `quizzi-arena-pro`. Chọn **Private** nếu chỉ muốn giữ mã nguồn riêng. Bấm **Create repository**.
4. Trong repository mới, chọn **Add file → Upload files**.
5. Mở File Explorer của Windows, vào thư mục `quizzi-arena-pro` đã giải nén. Chọn toàn bộ nội dung bên trong thư mục (các thư mục `src`, `public` và các tệp như `package.json`, `index.html`, `vite.config.ts`, `firestore.rules`, `README.md`). Kéo thả vào trang GitHub Upload files.
6. Chờ tải xong, kéo xuống cuối trang, nhập ghi chú `Initial QUIZZI ARENA PRO source` rồi bấm **Commit changes**.

**Kiểm tra quan trọng:** khi mở repository, phải nhìn thấy `package.json` ngay ở trang đầu. Nếu phải bấm vào một thư mục `quizzi-arena-pro` nữa mới thấy `package.json`, bạn đã tải thừa một cấp thư mục; cần đưa các tệp lên cấp gốc repository.

## Phần C — Triển khai trên Vercel

1. Mở https://vercel.com/ → đăng nhập bằng GitHub.
2. Chọn **Add New → Project**.
3. Tìm repository `quizzi-arena-pro` → bấm **Import**.
4. Thiết lập:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: để mặc định (`npm install`)
5. Mở **Environment Variables** và thêm lần lượt các biến dưới đây, lấy giá trị từ Firebase Web App Config:

   | Tên biến | Giá trị lấy từ Firebase |
   |---|---|
   | `VITE_FIREBASE_API_KEY` | `apiKey` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `VITE_FIREBASE_PROJECT_ID` | `projectId` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
   | `VITE_FIREBASE_APP_ID` | `appId` |

6. Bấm **Deploy** và đợi Vercel cài thư viện, build và xuất bản website.
7. Khi hoàn tất, Vercel cung cấp địa chỉ dạng `https://ten-du-an.vercel.app`.

## Phần D — Cho phép đăng nhập Google trên tên miền Vercel

1. Sao chép địa chỉ `.vercel.app` vừa được cấp.
2. Quay lại Firebase Console → Authentication → Settings → Authorized domains.
3. Chọn **Add domain**, dán tên miền Vercel (không thêm `https://` và không có dấu `/`), lưu lại.
4. Mở website Vercel, thử đăng nhập Google.

## Phần E — Kiểm tra sau triển khai

Thực hiện theo thứ tự:

1. Mở website trên máy tính → đăng nhập giáo viên.
2. Tạo bộ đề mới, nhập tối thiểu một câu hỏi và đủ các phương án, chọn đáp án đúng → lưu.
3. Mở phòng thi → ghi lại mã PIN.
4. Mở website bằng điện thoại hoặc cửa sổ ẩn danh khác → vào mục Tham gia → nhập PIN, tên và đội.
5. Trở lại máy giáo viên: kiểm tra tên học sinh xuất hiện trong danh sách.
6. Bấm Bắt đầu cuộc thi. Kiểm tra câu hỏi hiển thị trên điện thoại.
7. Chọn đáp án và gửi. Giáo viên chuyển câu; cuối cuộc thi kiểm tra bảng xếp hạng và tải CSV.
8. Mở Firebase Console → Firestore → kiểm tra các collection `quizzes`, `rooms`, `players`, `answers` và `questionKeys`.

## Nếu Deploy bị lỗi

- **Build failed:** mở tab Deployments trong Vercel → chọn deployment lỗi → View Build Logs; gửi nguyên văn log cho trợ lý để sửa đúng lỗi.
- **FirebaseError / auth/unauthorized-domain:** kiểm tra Authorized domains đã có domain Vercel chưa.
- **Missing Firebase config:** kiểm tra đủ 6 Environment Variables trong Vercel và redeploy.
- **Missing or insufficient permissions:** kiểm tra đã Publish đúng file `firestore.rules` chưa.
- **Học sinh không thấy phòng:** kiểm tra cả hai thiết bị có mở đúng domain Vercel và Firebase project giống nhau không.
- **AI không tạo được câu hỏi:** kiểm tra AI Logic đã được thiết lập, model còn khả dụng và quota chưa hết.

## Ghi chú chi phí và tải

Giữ Firebase ở Spark và Vercel ở Hobby để không chủ động bật thanh toán. Các gói miễn phí có quota/điều khoản riêng; khi hết quota, chức năng có thể tạm ngừng. Không thể xác nhận sức tải 100 người chỉ bằng kiểm tra mã nguồn. Trước khi tổ chức thi chính thức với 100 người, hãy chạy thử nhiều lượt, theo dõi Firestore Usage và độ trễ thực tế.
