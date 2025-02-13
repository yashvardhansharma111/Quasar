"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSignedIn) return;

    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/auth/user-role");
        const data = await response.json();

        if (response.ok && data.role) {
          router.push(`/dashboard/${data.role}`);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [isSignedIn, router]);

  const handleRoleSelection = async (selectedRole: string) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to set role");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/${selectedRole}`);
    } catch (error) {
      console.error("Error setting role:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Select Your Role</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["student", "professor", "company", "admin"].map((roleOption) => (
          <motion.button
            key={roleOption}
            onClick={() => handleRoleSelection(roleOption)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold w-40 text-center"
          >
            {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
