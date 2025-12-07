"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen p-8 text-white" style={{ background: "black" }}>
      <h1
        className="text-4xl font-bold mb-6"
        style={{
          background: "linear-gradient(90deg, #FFD700, #40E0D0)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Account Settings
      </h1>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4 text-lg">
          <p>Email: <span className="text-teal-400">{user?.profile?.email ?? "Not available"}</span></p>
          <p>Subscription: 
            <span className="text-yellow-400">
              {user.subscription?.active ? " PRO Active" : "Free User"}
            </span>
          </p>
          <a
            href="https://billing.stripe.com/"
            className="inline-block mt-4 px-4 py-2 bg-yellow-500 rounded text-black font-bold"
          >
            Manage Billing
          </a>
        </div>
      )}
    </div>
  );
}

      
