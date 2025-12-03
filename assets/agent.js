/* ---------------------------------------------------------
   Aiexor AI Agent Demo — Lightweight Simulation Engine
---------------------------------------------------------- */

const AiexorAgent = {
  send() {
    const input = document.getElementById("agent-input").value.trim();
    const output = document.getElementById("agent-output");

    if (!input) {
      output.innerHTML = "Please enter a query.";
      return;
    }

    output.innerHTML = "Processing • Neural reasoning engaged…";

    setTimeout(() => {
      output.innerHTML =
        "Aiexor Agent Response:<br>" +
        "Your query: <strong>" +
        input +
        "</strong><br><br>" +
        "Aiexor is optimized for AI systems requiring brand trust, speed, and unique linguistic identity. This domain aligns with agentic AI, LLM automation, and high-scale deployment ecosystems.";
    }, 1200);
  }
};
