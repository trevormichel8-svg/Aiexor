"use client";

import GlowButton from "./components/GlowButton";
import Section from "./components/Section";
import MotionCard from "./components/MotionCard";
import Parallax from "./components/Parallax";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="pt-32 pb-24">
        <div className="text-center max-w-4xl mx-auto px-4">

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight gradient-gold glow-animate"
          >
            Aiexor.com  
          </motion.h1>

          {/* SUBHEAD */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-neutral-300 text-lg md:text-xl mt-6 leading-relaxed"
          >
            A bold, futuristic 6-letter AI brand crafted for next-generation  
            autonomous agents, AI platforms, LLM tools, and intelligent systems.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <GlowButton href="https://paypal.me/michel924/5000">
              Buy Now — $5,000
            </GlowButton>

            <GlowButton href="https://escrow.com">
              Secure Purchase (Escrow)
            </GlowButton>

            <GlowButton href="#offer">
              Make Offer
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <Section id="overview">
        <h2 className="text-3xl md:text-4xl font-semibold gradient-gold mb-8">
          A Premium AI Brand for Ambitious Builders
        </h2>
        <p className="text-neutral-300 text-lg leading-relaxed">
          Aiexor.com is a short, powerful, futuristic name.  
          Perfect for an AI startup, automation suite, generative AI tool,  
          intelligent assistant, or enterprise-grade machine learning platform.  
          The name is memorable, brandable, globally pronounceable, and  
          aligns with the evolution of autonomous systems.
        </p>
      </Section>

      {/* USE CASES */}
      <Section id="use-cases">
        <h2 className="text-3xl md:text-4xl font-semibold gradient-gold mb-10">
          Use Cases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">AI Agents</h3>
            <p className="text-neutral-300">
              Deploy multi-agent systems, autonomous workflows, or task AI.
            </p>
          </MotionCard>

          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">SaaS Platforms</h3>
            <p className="text-neutral-300">
              Offer AI-driven automation, analytics, or creation tools.
            </p>
          </MotionCard>

          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
            <p className="text-neutral-300">
              Build SDKs, APIs, infrastructure models, or LLM extensions.
            </p>
          </MotionCard>
        </div>
      </Section>

      {/* WHY IT WORKS */}
      <Section id="why-it-works">
        <h2 className="text-3xl md:text-4xl font-semibold gradient-gold mb-10">
          Why Aiexor Works as a Brand
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">Short & Memorable</h3>
            <p className="text-neutral-300">
              Six letters. Symmetric. Strong phonetics. Easy worldwide.
            </p>
          </MotionCard>

          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">Futuristic Identity</h3>
            <p className="text-neutral-300">
              The name feels engineered for AI-native products.
            </p>
          </MotionCard>

          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">Brand-Ready Domain</h3>
            <p className="text-neutral-300">
              .com ensures maximum trust, authority, and resale value.
            </p>
          </MotionCard>

          <MotionCard>
            <h3 className="text-xl font-semibold mb-3">Scalable Meaning</h3>
            <p className="text-neutral-300">
              Works for agents, GPT stores, ML infra, or consumer AI.
            </p>
          </MotionCard>
        </div>
      </Section>

      {/* TRANSFER SECTION */}
      <Section id="transfer">
        <h2 className="text-3xl md:text-4xl font-semibold gradient-gold mb-10">
          Transfer & Ownership
        </h2>
        <p className="text-neutral-300 text-lg leading-relaxed mb-8">
          The domain Aiexor.com will be transferred immediately upon purchase  
          via a secure, registrar-approved process. Escrow is fully supported.
        </p>
        <GlowButton href="https://escrow.com">Buy Securely with Escrow</GlowButton>
      </Section>

      {/* OFFER CTA */}
      <Section id="offer">
        <h2 className="text-3xl md:text-4xl font-semibold gradient-gold mb-8">
          Submit an Offer
        </h2>
        <p className="text-neutral-300 mb-6">
          Want to negotiate? Submit your offer and we’ll contact you shortly.
        </p>

        <GlowButton href="/offer">Go to Offer Form</GlowButton>
      </Section>
    </>
  );
  }

