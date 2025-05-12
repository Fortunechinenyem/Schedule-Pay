import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getPayments(userId: string) {
  const q = query(collection(db, "payments"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  }));
}

export async function addPayment(paymentData: any) {
  const docRef = await addDoc(collection(db, "payments"), paymentData);
  return docRef.id;
}
