"use client";
import { useState, useEffect } from "react";
import { getPayments } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import StatsCards from "@/components/dashboard/statscards";
import PaymentActivity from "@/components/dashboard/paymentactivity";
import RecentActivity from "@/components/dashboard/recentactivity";
import UpcomingPayments from "@/components/dashboard/upcomingpayments";

export default function DashboardPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  const refreshData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getPayments(user.uid);
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  if (!user) return <div className="p-6">Not authenticated</div>;
  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <StatsCards payments={payments} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <PaymentActivity payments={payments} />
          <RecentActivity />
        </div>

        <div className="space-y-6">
          <UpcomingPayments payments={payments} refreshData={refreshData} />
        </div>
      </div>
    </div>
  );
}
