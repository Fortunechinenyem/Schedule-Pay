"use client";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
        Reset Password
      </h2>
      <AuthForm type="forgot" />
      <div className="mt-4 text-center text-sm text-gray-400">
        Remember your password?{" "}
        <Link href="/login" className="text-cyan-400 hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
