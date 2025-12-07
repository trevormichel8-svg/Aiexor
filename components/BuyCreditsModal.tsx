"use client";

import { useState } from "react";

export default function BuyCreditsModal({ open, onClose }: any) {
  const [loading, setLoading] = useState(false);

  async function buyCredits(pack: string) {
    setLoading(true);

    const res = await fetch("/api/credit-checkout", {
      method: "POST",
      body: JSON.stringify({ pack }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm text-center border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Buy Credits</h2>

        <div className="space-y-3">
          <button
            onClick={() => buyCredits("small")}
            className="w-full py-3 rounded bg-teal-500 font-bold"
          >
            20 Credits — $5
          </button>

          <button
            onClick={() => buyCredits("medium")}
            className="w-full py-3 rounded bg-yellow-500 font-bold"
          >
            50 Credits — $12
          </button>

          <button
            onClick={() => buyCredits("large")}
            className="w-full py-3 rounded bg-gradient-to-r from-yellow-400 to-teal-400 font-bold"
          >
            200 Credits — $39
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

