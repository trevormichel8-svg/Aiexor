
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LogoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>(null);

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
      style={{
        background: "black",
      }}
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

        {userData?.trial && (
          <p className="mt-2 text-sm text-gray-400">
            Free Trial Used: {userData.trial.used} / 3
          </p>
        )}
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
              engine === "premium" ? "bg-gradient-to-r from-yellow-400 to-teal-400" : "bg-gray-800"
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

      {/* FOOTER */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        Powered by Aiexor — Hybrid AI Logo Engine
      </div>
    </div>
  );
}

    
