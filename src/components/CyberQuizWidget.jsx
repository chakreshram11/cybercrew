import React, { useState } from "react";
import CyberBadge from "./CyberBadge";

const quizQuestions = [
  {
    id: 1,
    question: "Which OWASP vulnerability occurs when untrusted user input is executed directly in a database query?",
    options: [
      "Cross-Site Scripting (XSS)",
      "SQL Injection (SQLi)",
      "Cross-Site Request Forgery (CSRF)",
      "Insecure Direct Object Reference (IDOR)",
    ],
    answer: 1,
    explanation: "SQL Injection occurs when malicious user inputs manipulate backend SQL queries, bypassing authentication or exposing sensitive data.",
  },
  {
    id: 2,
    question: "What type of attack decodes this string: 'Q3liZXJDcmV3IQ=='?",
    options: [
      "Caesar Cipher Shift",
      "RSA Asymmetric Encryption",
      "Base64 Encoding",
      "SHA-256 Hashing",
    ],
    answer: 2,
    explanation: "The trailing '=' and alphanumeric format indicate Base64 encoding. Decoding 'Q3liZXJDcmV3IQ==' yields 'CyberCrew!'.",
  },
  {
    id: 3,
    question: "Which port is used by default for Secure Shell (SSH) encrypted connections?",
    options: ["Port 80", "Port 443", "Port 22", "Port 8080"],
    answer: 2,
    explanation: "Port 22 is the standard network port reserved for SSH protocol connections.",
  },
  {
    id: 4,
    question: "What is the primary defense against Cross-Site Scripting (XSS) in web applications?",
    options: [
      "Input sanitization & Contextual Output Encoding",
      "Increasing SSL Certificate Key Length",
      "Using complex passwords",
      "Blocking ICMP Ping Requests",
    ],
    answer: 0,
    explanation: "Proper input sanitization and output encoding prevent injected scripts from being rendered or executed by the browser.",
  },
];

function CyberQuizWidget() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    if (selectedOpt === currentQ.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setIsSubmitted(false);
  };

  return (
    <div className="cyber-card w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-xl border border-cyan-500/30 bg-cyber-slate/95 text-white shadow-2xl relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
          <h3 className="text-xl font-bold font-mono text-cyan-400 tracking-wide">
            CTF_CHALLENGE // MINI-QUIZ
          </h3>
        </div>
        <CyberBadge
          text={showResult ? "COMPLETED" : `Q${currentIdx + 1}/${quizQuestions.length}`}
          type={showResult ? "green" : "cyan"}
        />
      </div>

      {!showResult ? (
        <div>
          {/* Question Title */}
          <h4 className="text-lg sm:text-xl font-semibold font-mono text-gray-100 mb-6 leading-relaxed">
            {currentQ.question}
          </h4>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              let optionStyle =
                "bg-gray-900/80 border-gray-700 text-gray-300 hover:border-cyan-400 hover:text-white";

              if (selectedOpt === idx) {
                optionStyle = "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.3)]";
              }

              if (isSubmitted) {
                if (idx === currentQ.answer) {
                  optionStyle =
                    "bg-emerald-950/90 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_15px_rgba(0,255,102,0.4)]";
                } else if (selectedOpt === idx) {
                  optionStyle =
                    "bg-rose-950/90 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(255,0,85,0.4)]";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-lg border font-mono text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-cyan-400 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </span>
                  {isSubmitted && idx === currentQ.answer && (
                    <span className="text-emerald-400 font-bold text-xs">✔ CORRECT</span>
                  )}
                  {isSubmitted && selectedOpt === idx && idx !== currentQ.answer && (
                    <span className="text-rose-400 font-bold text-xs">✖ WRONG</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on submission */}
          {isSubmitted && (
            <div className="p-4 rounded-lg bg-gray-900/90 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 font-mono mb-6 animate-fade-in">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                ANALYSIS & EXPLANATION:
              </span>
              {currentQ.explanation}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOpt === null}
                className={`px-6 py-2.5 rounded font-mono font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                  selectedOpt !== null
                    ? "bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                }`}
              >
                SUBMIT ANSWER
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded font-mono font-bold text-sm tracking-wider uppercase bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-[0_0_15px_rgba(0,255,102,0.4)] transition-all duration-200"
              >
                {currentIdx + 1 < quizQuestions.length ? "NEXT QUESTION →" : "VIEW RESULTS"}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-950 border-2 border-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <span className="text-3xl font-mono font-bold text-cyan-400">
              {Math.round((score / quizQuestions.length) * 100)}%
            </span>
          </div>

          <h4 className="text-2xl font-mono font-bold text-white mb-2">
            CHALLENGE EVALUATION COMPLETE
          </h4>
          <p className="text-gray-300 font-mono text-sm mb-6">
            Score: <span className="text-cyan-400 font-bold">{score}</span> out of{" "}
            <span className="text-cyan-400 font-bold">{quizQuestions.length}</span> questions correct.
          </p>

          <button
            onClick={handleRestart}
            className="px-8 py-3 rounded font-mono font-bold text-sm uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-200"
          >
            RETRY CHALLENGE
          </button>
        </div>
      )}
    </div>
  );
}

export default CyberQuizWidget;
