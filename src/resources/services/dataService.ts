import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  where,
  query,
  startAt,
  limit,
  endAt,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../firebase/firebase';
import { mapErrorCodeToMessage } from '../../utils/helpers';
import { Query } from '../../types';

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

export async function deleteDocument(
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

export async function updateDocument<T>(
  collectionId: string,
  documentId: string,
  data: any,
  converter: {
    toFireStore: (data: T) => any; // Modify 'any' to the appropriate Firestore data type
    fromFireStore: (id: string, data: any) => T; // Modify 'any' to the appropriate Firestore data type
  },
): Promise<void> {
  try {
    const docData = converter.toFireStore(data);

    const docRef = doc(db, collectionId, documentId);
    await updateDoc(docRef, {
      ...docData,
    });
  } catch (error: any) {
    console.error('Error updating document:', error);
    throw new Error(mapErrorCodeToMessage(error.code));
  }
}

export async function getAllDocuments<T>(
  collectionId: string,
  converter: {
    toFireStore: (data: T) => any; // Modify 'any' to the appropriate Firestore data type
    fromFireStore: (id: string, data: any) => T; // Modify 'any' to the appropriate Firestore data type
  },
  queries?: Query[],
): Promise<T[]> {
  const queryConstraints = [] as any[];

  if (queries) {
    queries.forEach((query: any) => {
      switch (query.type) {
        case 'orderBy':
          queryConstraints.push(
            orderBy(query.orderByField, query.orderDirection),
          );
          break;
        case 'where':
          queryConstraints.push(
            where(query.field, query.condition, query.value),
          );
          break;
        case 'limit':
          queryConstraints.push(limit(query.number));
          break;
        case 'startAt':
          queryConstraints.push(startAt(query.value));
          break;
        case 'endAt':
          queryConstraints.push(endAt(query.value));
          break;

        default:
          break;
      }
    });
  }
  try {
    const q = query(
      collection(db, collectionId),
      ...queryConstraints,
    );

    const querySnapshot = await getDocs(q);

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

export async function getDocumentById<T>(
  collectionId: string,
  documentId: string,
  converter: {
    toFireStore: (data: T) => any; // Modify 'any' to the appropriate Firestore data type
    fromFireStore: (id: string, data: any) => T; // Modify 'any' to the appropriate Firestore data type
  },
): Promise<T> {
  try {
    const docRef = doc(db, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return converter.fromFireStore(docSnap.id, docSnap.data());
    } else {
      console.error('Document does not exist');
      throw new Error(
        mapErrorCodeToMessage('Document does not exist'),
      );
    }
  } catch (error: any) {
    console.error('Error getting document:', error);
    throw new Error(mapErrorCodeToMessage(error.code));
  }
}
