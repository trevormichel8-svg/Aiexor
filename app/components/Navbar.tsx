"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    load();
  }, []);

  return (
    <nav
      className="w-full px-6 py-3 flex justify-between items-center"
      style={{
        background: "rgba(0,0,0,0.7)",
        borderBottom: "1px solid rgba(64,224,208,0.25)",
      }}
    >
      <Link href="/ai-logo" className="text-2xl font-bold"
        style={{
          background: "linear-gradient(90deg, #FFD700, #40E0D0)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Aiexor
      </Link>

      <div className="flex items-center gap-6 text-gray-300">
        <Link href="/ai-logo" className="hover:text-teal-400">Generate</Link>
        <Link href="/my-logos" className="hover:text-teal-400">My Logos</Link>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="px-3 py-1 bg-gray-800 rounded text-sm"
          >
            Account ▾
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 bg-gray-900 rounded shadow-md p-3 w-40 text-sm">
              <Link href="/my-logos" className="block py-1 hover:text-teal-400">My Logos</Link>
              <a href="https://billing.stripe.com/" className="block py-1 hover:text-teal-400">Billing</a>
              <button className="block py-1 hover:text-red-400">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
          }
            
