"use client";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";
import OAuthButtons from "@/components/auth/OAuthButtons";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthForm type="signup" />
      <OAuthButtons />
      <div className="mt-4 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-cyan-400 hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
