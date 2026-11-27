import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db, firebaseReady } from './firebase';

export async function listWorkspace<T>(collectionName: 'classes'|'assignments', ownerUid: string): Promise<T[]> {
  if (!firebaseReady || !db) return [];
  const snapshot = await getDocs(query(collection(db, collectionName), where('ownerUid', '==', ownerUid)));
  return snapshot.docs.map(item => item.data() as T);
}

export async function saveWorkspace<T extends {id:string}>(collectionName:'classes'|'assignments', value:T, ownerUid:string):Promise<void> {
  if (!firebaseReady || !db) return;
  await setDoc(doc(db, collectionName, value.id), {...value, ownerUid});
}

export async function removeWorkspace(collectionName:'classes'|'assignments', id:string):Promise<void> {
  if (!firebaseReady || !db) return;
  await deleteDoc(doc(db, collectionName, id));
}
