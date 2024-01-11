import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import { db } from '../firebase/firebase';
import { mapErrorCodeToMessage } from '../../utils/helpers';

// Function to create a document in Firebase
export async function createDocument<T>(
  collectionId: string,
  data: any,
  converter: {
    toFireStore: (data: T) => any; // Modify 'any' to the appropriate Firestore data type
    fromFireStore: (id: string, data: any) => T; // Modify 'any' to the appropriate Firestore data type
  },
): Promise<any | null> {
  try {
    const docData = converter.toFireStore(data);

    const docRef = await addDoc(
      collection(db, collectionId),
      docData,
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.id;
    } else {
      console.error('Document does not exist after creation');
      return null;
    }
  } catch (error: any) {
    console.error('Error creating document:', error);
    throw new Error(mapErrorCodeToMessage(error.code));
  }
}

export async function deleteDocument<T>(
  collectionId: string,
  documentId: string,
): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionId, documentId));
  } catch (error: any) {
    console.error('Error deleting document:', error);
    throw new Error(mapErrorCodeToMessage(error.code));
  }
}

export async function getAllDocuments<T>(
  collectionId: string,
  converter: {
    toFireStore: (data: T) => any; // Modify 'any' to the appropriate Firestore data type
    fromFireStore: (id: string, data: any) => T; // Modify 'any' to the appropriate Firestore data type
  },
): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionId));
    const documents: T[] = [];
    querySnapshot.forEach((doc) => {
      documents.push(converter.fromFireStore(doc.id, doc.data()));
    });
    return documents;
  } catch (error: any) {
    console.error('Error getting documents:', error);
    throw new Error(mapErrorCodeToMessage(error.code));
  }
}
