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

  const [showCredits, setShowCredits] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  // LOAD USER DATA
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
    setResult(null);

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
      className="min-h-screen p-4 md:p-6 text-white fade-in"
      style={{ background: "black" }}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1
          className="text-5xl font-extrabold glow-animate"
          style={{
            background: "linear-gradient(90deg, #FFD700, #40E0D0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
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

      {/* BUY CREDITS + SUBSCRIBE */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setShowCredits(true)}
          className="px-5 py-2 rounded bg-yellow-500 font-bold shadow btn-glow"
        >
          Buy Credits
        </button>

        <button
          onClick={() => setShowSubscribe(true)}
          className="px-5 py-2 rounded bg-teal-500 font-bold shadow btn-glow"
        >
          Go PRO
        </button>
      </div>

      {/* INPUT AREA */}
      <div className="max-w-xl mx-auto mb-10 glass p-6 rounded-xl">
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
              engine === "basic" ? "bg-teal-500 btn-glow" : "bg-gray-800"
            }`}
          >
            BASIC (1 credit)
          </button>

          <button
            onClick={() => setEngine("standard")}
            className={`px-4 py-2 rounded ${
              engine === "standard" ? "bg-yellow-600 btn-glow" : "bg-gray-800"
            }`}
          >
            STANDARD (2 credits)
          </button>

          <button
            onClick={() => setEngine("premium")}
            className={`px-4 py-2 rounded ${
              engine === "premium"
                ? "bg-gradient-to-r from-yellow-400 to-teal-400 btn-glow"
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
          className="w-full mt-6 py-4 rounded font-bold btn-glow"
          style={{
            background: "linear-gradient(90deg, #FFD700, #40E0D0)",
            color: "black",
          }}
        >
          {loading ? (
            <span className="animate-pulse text-teal-300">Generating…</span>
          ) : (
            "Generate Logo"
          )}
        </button>

        {/* LOADING SHIMMER */}
        {loading && (
          <div className="mt-6 mx-auto max-w-sm h-48 skeleton rounded-lg"></div>
        )}

        {/* LOADING TEXT */}
        {loading && (
          <div className="text-center mt-4 text-teal-400 animate-pulse">
            Crafting your golden-turquoise masterpiece…
          </div>
        )}

        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
      </div>

      {/* RESULT AREA */}
      {result && (
        <div className="text-center mt-12 fade-scale">
          <h3 className="text-xl mb-4 text-teal-400">Generated Logo:</h3>

          <img
            src={`data:image/jpeg;base64,${result.low_res_url}`}
            className="mx-auto rounded shadow-lg max-w-sm fade-scale"
            alt="Generated Logo"
          />

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={downloadHD}
            className="mt-6 px-6 py-3 rounded font-bold btn-glow"
            style={{
              background: "linear-gradient(90deg, #FFD700, #40E0D0)",
              color: "black",
            }}
          >
            Download HD
          </button>

          {/* SOCIAL SHARE */}
          <div className="flex justify-center gap-4 mt-6 text-sm fade-in">
            <a
              href={`https://twitter.com/intent/tweet?text=Check out my AI-generated logo from Aiexor!&url=https://aiexor.com`}
              target="_blank"
              className="text-teal-400 hover:text-yellow-400"
            >
              Share on Twitter
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://aiexor.com`}
              target="_blank"
              className="text-teal-400 hover:text-yellow-400"
            >
              Facebook
            </a>

            <button
              onClick={() => navigator.clipboard.writeText(result.low_res_url)}
              className="text-teal-400 hover:text-yellow-400"
            >
              Copy Image
            </button>
          </div>
        </div>
      )}

      {/* DIVIDER */}
      <div className="divider"></div>

      {/* HISTORY SECTION */}
      {userData?.history && userData.history.length > 0 && (
        <div className="mt-16 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-teal-400">
            Your Past Logos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {userData.history.map((h: any) => (
              <div
                key={h.id}
                className="gradient-border rounded-xl p-2 fade-scale"
              >
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
      <div className="text-center mt-20 text-gray-500 text-sm fade-in">
        Powered by Aiexor — Hybrid AI Logo Engine
      </div>

      {/* PAYMENT MODALS */}
      <BuyCreditsModal open={showCredits} onClose={() => setShowCredits(false)} />
      <SubscribeModal open={showSubscribe} onClose={() => setShowSubscribe(false)} />
    </div>
  );
}

    
