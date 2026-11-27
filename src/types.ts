export type QuestionType = 'single' | 'truefalse' | 'multiple' | 'text' | 'fill';
export interface Question {
  id: string; type: QuestionType; text: string; options: string[];
  correctIndex: number; correctIndices?: number[]; correctText?: string;
  seconds: number; points: number; explanation?: string; topic?: string;
}
export interface Quiz {
  id: string; title: string; subject: string; grade: string; description: string;
  updatedAt: number; ownerUid?: string; questions: Question[]; visibility?: 'private'|'school'; tags?: string[];
}
export interface Player { id: string; name: string; team: string; score: number; joinedAt: number; }
export interface Room {
  id: string; pin: string; title: string; hostUid: string; status: 'waiting'|'active'|'finished';
  currentIndex: number; questionEndsAt: number; createdAt: number; players: Player[];
  questions: Omit<Question,'correctIndex'|'correctText'|'correctIndices'|'explanation'>[];
}
export interface Submission { roomPin?: string; playerId: string; questionId: string; answer: string; submittedAt: number; }
export interface SchoolClass { id: string; name: string; grade: string; schoolYear: string; studentCount: number; description: string; updatedAt: number; }
export interface Assignment { id: string; title: string; quizId: string; classId: string; dueDate: string; status: 'draft'|'published'|'closed'; createdAt: number; }
export interface ActivityLog { id: string; action: string; detail: string; createdAt: number; }
