"use client";

import { useEffect, useState } from "react";

export default function MyLogosPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    }
    load();
  }, []);

  return (
    <div className="p-8 text-white min-h-screen"
      style={{ background: "black" }}
    >
      <h1
        className="text-4xl font-extrabold mb-8"
        style={{
          background: "linear-gradient(90deg, #FFD700, #40E0D0)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        My Logos
      </h1>

      {!userData?.history || userData.history.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No logos yet. Create your first one!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {userData.history.map((h: any) => (
            <div key={h.id} className="bg-gray-900 p-3 rounded shadow">
              <img
                src={`data:image/jpeg;base64,${h.low_res_url}`}
                className="rounded"
              />
              <p className="text-gray-400 text-sm mt-2">
                {new Date(h.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  }
            
