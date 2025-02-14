"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;
  
      try {
        const response = await fetch("/api/auth/sync-user", { method: "POST" });
        const data = await response.json();
        console.log("✅ User Sync Response:", data);
      } catch (error) {
        console.error("❌ Error syncing user:", error);
      }
    };
  
    syncUser();
  }, [isSignedIn]);  


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bridging Academia and Industry through AI</h1>
          <p className="text-xl mb-8">Connect, learn, and grow with SkillBridge</p>
          <div className="space-x-4">
            {!isSignedIn ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold">
                <Link href="/sign-in">Sign In</Link>
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-white px-6 py-3 rounded-full font-semibold">
                <Link href="/dashboard">Go to Dashboard</Link>
              </motion.button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
