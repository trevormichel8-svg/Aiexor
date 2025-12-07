"use client";

import { useState } from "react";

export default function SubscribeModal({ open, onClose }: any) {
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);

    const res = await fetch("/api/subscription-checkout", {
      method: "POST",
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
        <h2 className="text-xl font-bold text-white mb-4">
          Upgrade to Aiexor PRO
        </h2>

        <p className="text-gray-300 mb-4">
          Unlimited HD logo downloads + Premium Engine Access.
        </p>

        <button
          onClick={subscribe}
          disabled={loading}
          className="w-full py-3 rounded bg-gradient-to-r from-yellow-400 to-teal-400 font-bold"
        >
          {loading ? "Processing…" : "Subscribe Now"}
        </button>

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

          
