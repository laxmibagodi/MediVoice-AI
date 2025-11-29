import React from "react";
import HistoryList from "../_components/HistoryList";

function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 md:p-12">
      <h1 className="text-2xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8 text-center">
        🩺 My Consultation History
      </h1>

      {/* Transparent Panel */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-xl">
        <HistoryList />
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-white/50">
        All your AI-generated consultation reports are displayed here. Secure and private.
      </p>
    </div>
  );
}

export default History;
