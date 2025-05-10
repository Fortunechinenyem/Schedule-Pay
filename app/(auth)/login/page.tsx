"use client";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";
import OAuthButtons from "@/components/auth/OAuthButtons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
      <OAuthButtons />
      <div className="mt-4 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link href="/register" className="text-cyan-400 hover:underline">
          Sign up
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-gray-400 hover:text-cyan-400"
        >
          Forgot password?
        </Link>
      </div>
    </AuthLayout>
  );
}
