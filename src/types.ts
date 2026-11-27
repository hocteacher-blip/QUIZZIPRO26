export type QuestionType = 'single' | 'truefalse' | 'text';
export interface Question { id: string; type: QuestionType; text: string; options: string[]; correctIndex: number; correctText?: string; seconds: number; points: number; }
export interface Quiz { id: string; title: string; subject: string; grade: string; description: string; questions: Question[]; updatedAt: number; ownerUid?: string; }
export interface Player { id: string; name: string; team: string; score: number; joinedAt: number; }
export interface Room { id: string; pin: string; title: string; hostUid: string; status: 'waiting'|'active'|'finished'; currentIndex: number; questionEndsAt: number; createdAt: number; players: Player[]; questions: Omit<Question,'correctIndex'|'correctText'>[]; }
export interface Submission { roomPin?: string; playerId: string; questionId: string; answer: string; submittedAt: number; }
