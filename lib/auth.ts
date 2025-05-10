import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // Redirect to dashboard after login
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
};
