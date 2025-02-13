"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import Notifications from "./Notification";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Competition Hub", href: "/competition-hub" },
  { name: "Blockchain", href: "/blockchain" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isSignedIn) return;
      try {
        const response = await fetch("/api/auth/getRole");
        const data = await response.json();
        if (response.ok) {
          setRole(data.role);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchUserRole();
  }, [isSignedIn]);

  const getDashboardRoute = () => {
    if (!role) return "/dashboard";
    return {
      student: "/dashboard/student",
      professor: "/dashboard/professor",
      company: "/dashboard/company",
      admin: "/dashboard/admin",
    }[role];
  };

  return (
    <nav className="bg-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillBridge
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href={item.href} className={`text-black hover:text-primary ${pathname === item.href ? "border-b-2 border-primary" : ""}`}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Notifications */}
          {isSignedIn && <Notifications />}

          {/* Dashboard Button */}
          {isSignedIn && role && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(getDashboardRoute())}
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold"
            >
              Dashboard
            </motion.button>
          )}

          {/* Auth Buttons */}
          {isSignedIn ? <UserButton /> : <Link href="/sign-in" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">Login</Link>}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          {isSignedIn && <Notifications />}
          <button onClick={() => setIsOpen(!isOpen)} className="text-black ml-4">{isOpen ? "Close" : "Menu"}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className={`block py-2 px-4 text-black hover:bg-primary ${pathname === item.href ? "bg-primary" : ""}`}>
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
