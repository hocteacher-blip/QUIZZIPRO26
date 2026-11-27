import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseReady = Object.values(cfg).every(Boolean);
export const app = firebaseReady ? (getApps()[0] ?? initializeApp(cfg)) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export async function teacherSignIn() {
  if (!auth) throw new Error('Chưa cấu hình Firebase. Hãy làm theo README để kết nối dự án.');
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
export async function studentSignIn() {
  if (!auth) return null;
  if (!auth.currentUser) return signInAnonymously(auth);
  return null;
}
export function watchAuth(cb: (user: User | null) => void) {
  if (!auth) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}
export async function generateQuestions(topic: string, grade: string, count: number) {
  if (!app) throw new Error('Cần kết nối Firebase trước khi sử dụng AI.');
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });
  const prompt = `Tạo ${count} câu hỏi trắc nghiệm tiếng Việt về chủ đề: ${topic}. Đối tượng: lớp ${grade}. Trả về CHỈ JSON array, mỗi phần tử có dạng {"text":"...","options":["A","B","C","D"],"correctIndex":0,"seconds":20,"points":100}. Đảm bảo đáp án đúng chính xác, phù hợp lứa tuổi.`;
  const result = await model.generateContent(prompt);
  const raw = result.response.text().replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('AI trả về dữ liệu không đúng định dạng.');
  return parsed;
}
