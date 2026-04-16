import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'fileTrees';
const DOCUMENT_ID = 'main-tree';

function getTreeReference() {
    return doc(db, COLLECTION_NAME, DOCUMENT_ID);
}

export async function readStoredTree() {
    const snapshot = await getDoc(getTreeReference());

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data().tree ?? null;
}

export async function saveTree(tree, updatedBy) {
    await setDoc(
        getTreeReference(),
        {
            tree,
            updatedAt: serverTimestamp(),
            updatedBy
        },
        { merge: true }
    );
}
