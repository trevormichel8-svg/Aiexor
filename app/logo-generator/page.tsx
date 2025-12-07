
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BuyCreditsModal from "@/components/BuyCreditsModal";
import SubscribeModal from "@/components/SubscribeModal";
import CreditsBar from "@/components/CreditsBar";

export default function LogoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>(null);

  // Payment modals
  const [showCredits, setShowCredits] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  // -----------------------
  // LOAD USER DATA
  // -----------------------
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    }
    loadUser();
  }, []);

  async function generateLogo() {
    if (!prompt) return;

    setLoading(true);
    setError("");

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt, engine }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error === "NO_CREDITS") {
      setError("You have no credits. Please buy credits or subscribe.");
      return;
    }

    if (data.success) {
      setResult(data.generation);
    }
  }

  async function downloadHD() {
    const res = await fetch("/api/download-hd", {
      method: "POST",
      body: JSON.stringify({ genId: result.id }),
    });

    const data = await res.json();

    if (data.error === "NO_PERMISSIONS") {
      setError("HD download locked — buy credits or subscribe.");
      return;
    }

    const link = document.createElement("a");
    link.href = data.url;
    link.download = "aiexor-logo.png";
    link.click();
  }

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{ background: "black" }}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1
          className="text-5xl font-extrabold"
          style={{
            background: "linear-gradient(90deg, #FFD700, #40E0D0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 25px #40E0D0",
          }}
        >
          Aiexor – AI Logo Generator
        </h1>

        <p className="text-gray-300 mt-2">
          Generate stunning AI logos with gold + turquoise gradients.
        </p>
      </div>

      {/* CREDITS BAR */}
      <CreditsBar user={userData} />

      {/* BUY CREDITS + SUBSCRIBE BUTTONS */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setShowCredits(true)}
          className="px-5 py-2 rounded bg-yellow-500 font-bold shadow"
        >
          Buy Credits
        </button>

        <button
          onClick={() => setShowSubscribe(true)}
          className="px-5 py-2 rounded bg-teal-500 font-bold shadow"
        >
          Go PRO
        </button>
      </div>

      {/* INPUT AREA */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Enter logo text (e.g., Aiexor Tech)"
          className="w-full p-4 rounded bg-gray-900 border border-gray-700 text-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* ENGINE SELECTOR */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setEngine("basic")}
            className={`px-4 py-2 rounded ${
              engine === "basic" ? "bg-teal-500" : "bg-gray-800"
            }`}
          >
            BASIC (1 credit)
          </button>

          <button
            onClick={() => setEngine("standard")}
            className={`px-4 py-2 rounded ${
              engine === "standard" ? "bg-yellow-600" : "bg-gray-800"
            }`}
          >
            STANDARD (2 credits)
          </button>

          <button
            onClick={() => setEngine("premium")}
            className={`px-4 py-2 rounded ${
              engine === "premium"
                ? "bg-gradient-to-r from-yellow-400 to-teal-400"
                : "bg-gray-800"
            }`}
          >
            PREMIUM (5 credits)
          </button>
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={generateLogo}
          disabled={loading}
          className="w-full mt-6 py-4 rounded font-bold"
          style={{
            background: "linear-gradient(90deg, #FFD700, #40E0D0)",
            color: "black",
            boxShadow: "0 0 20px #40E0D0",
          }}
        >
          {loading ? "Generating..." : "Generate Logo"}
        </button>

        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
      </div>

      {/* RESULT AREA */}
      {result && (
        <div className="text-center mt-12">
          <h3 className="text-xl mb-4 text-gray-300">Generated Logo:</h3>

          <img
            src={`data:image/jpeg;base64,${result.low_res_url}`}
            className="mx-auto rounded shadow-lg max-w-sm"
            alt="Generated Logo"
          />

          <button
            onClick={downloadHD}
            className="mt-6 px-6 py-3 rounded font-bold"
            style={{
              background: "linear-gradient(90deg, #FFD700, #40E0D0)",
              color: "black",
              boxShadow: "0 0 20px #40E0D0",
            }}
          >
            Download HD
          </button>
        </div>
      )}

      {/* HISTORY SECTION (FIXED) */}
      {userData?.history && userData.history.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-teal-400">
            Your Past Logos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {userData.history.map((h: any) => (
              <div key={h.id} className="bg-gray-900 p-3 rounded shadow">
                <img
                  src={`data:image/jpeg;base64,${h.low_res_url}`}
                  className="rounded"
                />
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(h.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        Powered by Aiexor — Hybrid AI Logo Engine
      </div>

      {/* PAYMENT MODALS */}
      <BuyCreditsModal
        open={showCredits}
        onClose={() => setShowCredits(false)}
      />
      <SubscribeModal
        open={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </div>
  );
    }
    
