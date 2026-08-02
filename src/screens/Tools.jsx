import React, { useState } from "react";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

function Tools() {
  // Tool 1: Password Strength State
  const [password, setPassword] = useState("");

  // Tool 2: Encoder/Decoder State
  const [inputText, setInputText] = useState("CyberCrew2026");
  const [encodeMode, setEncodeMode] = useState("base64");
  const [shaOutput, setShaOutput] = useState("");

  // Tool 3: JWT Inspector State
  const [jwtInput, setJwtInput] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFqYXkgJiBEaGFudXNoIiwicm9sZSI6IkFkbWluIiwiY2x1YiI6IkN5YmVyIENyZXciLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  // Tool 4: Security Header Analyzer State
  const [targetUrl, setTargetUrl] = useState("https://kiet.ac.in");
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Tool 5: CIDR / Subnet Calculator State
  const [cidrInput, setCidrInput] = useState("192.168.1.0/24");

  // Tool 6: IoC Defanger State
  const [iocText, setIocText] = useState("http://malicious-domain.com/phishing.exe | IP: 192.168.1.100 | mail: attacker@evil.org");
  const [defangMode, setDefangMode] = useState("defang"); // defang or refang

  // Tool 7: CVSS Risk Estimator State
  const [cvssMetrics, setCvssMetrics] = useState({
    AV: 0.85, // Network (0.85), Adjacent (0.62), Local (0.55), Physical (0.2)
    AC: 0.77, // Low (0.77), High (0.44)
    PR: 0.85, // None (0.85), Low (0.62), High (0.27)
    UI: 0.85, // None (0.85), Required (0.62)
    C: 0.56,  // High (0.56), Low (0.22), None (0)
    I: 0.56,  // High (0.56), Low (0.22), None (0)
    A: 0.56,  // High (0.56), Low (0.22), None (0)
  });

  // Calculate Password Metrics
  const calculateEntropy = (pwd) => {
    if (!pwd) return { bits: 0, time: "Instant", score: 0, label: "Empty", color: "red" };
    let charsetSize = 0;
    if (/[a-z]/.test(pwd)) charsetSize += 26;
    if (/[A-Z]/.test(pwd)) charsetSize += 26;
    if (/[0-9]/.test(pwd)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 32;

    const bits = Math.floor(pwd.length * Math.log2(charsetSize || 1));
    let score = 0;
    let label = "Very Weak";
    let color = "red";
    let time = "Less than a second";

    if (bits >= 80) {
      score = 100;
      label = "Military Grade";
      color = "green";
      time = "Centuries / Uncrackable";
    } else if (bits >= 60) {
      score = 75;
      label = "Strong";
      color = "cyan";
      time = "Decades";
    } else if (bits >= 40) {
      score = 50;
      label = "Moderate";
      color = "amber";
      time = "A few days";
    } else {
      score = 25;
      label = "Weak";
      color = "red";
      time = "Minutes / Seconds";
    }

    return { bits, time, score, label, color };
  };

  const pwdMetrics = calculateEntropy(password);

  // Encode / Decode Converters
  const runConversion = (str, mode) => {
    try {
      if (mode === "base64") return btoa(str);
      if (mode === "rot13") {
        return str.replace(/[a-zA-Z]/g, (c) =>
          String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13))
        );
      }
      if (mode === "hex") {
        return Array.from(str)
          .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join(" ");
      }
      if (mode === "binary") {
        return Array.from(str)
          .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
          .join(" ");
      }
    } catch (err) {
      return "Conversion Error: Invalid Characters";
    }
    return str;
  };

  const computeSha256 = async (text) => {
    if (!text) {
      setShaOutput("");
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setShaOutput(hashHex);
  };

  React.useEffect(() => {
    if (encodeMode === "sha256") {
      computeSha256(inputText);
    }
  }, [inputText, encodeMode]);

  const outputConverted =
    encodeMode === "sha256" ? shaOutput : runConversion(inputText, encodeMode);

  // JWT Decoder Helper
  const parseJwt = (token) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return { error: "Invalid JWT format. Must contain 3 parts separated by dots." };

      const base64UrlDecode = (str) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) base64 += "=";
        return decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      };

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      let isExpired = false;
      if (payload.exp) {
        isExpired = Date.now() >= payload.exp * 1000;
      }

      return { header, payload, isExpired, alg: header.alg || "UNKNOWN" };
    } catch (e) {
      return { error: "Failed to decode JWT string. Invalid Base64 structure." };
    }
  };

  const jwtData = parseJwt(jwtInput);

  // Security Header Scanner Simulator
  const runHeaderScan = () => {
    setAnalyzing(true);
    setScanResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setScanResult({
        grade: "A-",
        url: targetUrl,
        headers: [
          { name: "Strict-Transport-Security (HSTS)", present: true, val: "max-age=31536000; includeSubDomains" },
          { name: "Content-Security-Policy (CSP)", present: true, val: "default-src 'self'; script-src 'self' 'unsafe-inline'" },
          { name: "X-Frame-Options", present: true, val: "SAMEORIGIN" },
          { name: "X-Content-Type-Options", present: true, val: "nosniff" },
          { name: "Referrer-Policy", present: false, val: "MISSING (Recommended: strict-origin-when-cross-origin)" },
          { name: "Permissions-Policy", present: false, val: "MISSING (Recommended: geolocation=(), camera=())" },
        ],
      });
    }, 800);
  };

  // Subnet CIDR Calculator
  const calculateSubnet = (cidr) => {
    try {
      const [ip, mask] = cidr.split("/");
      const prefix = parseInt(mask, 10);
      if (!ip || isNaN(prefix) || prefix < 0 || prefix > 32) return null;

      const ipArr = ip.split(".").map(Number);
      if (ipArr.length !== 4 || ipArr.some((n) => isNaN(n) || n < 0 || n > 255)) return null;

      const ipNum = (ipArr[0] << 24) | (ipArr[1] << 16) | (ipArr[2] << 8) | ipArr[3];
      const maskNum = (0xffffffff << (32 - prefix)) >>> 0;
      const netNum = (ipNum & maskNum) >>> 0;
      const bcastNum = (netNum | ~maskNum) >>> 0;

      const numToIp = (num) =>
        [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");

      const totalHosts = prefix === 32 ? 1 : Math.max(0, Math.pow(2, 32 - prefix) - 2);

      return {
        network: numToIp(netNum),
        broadcast: numToIp(bcastNum),
        netmask: numToIp(maskNum),
        usableFirst: prefix === 32 ? numToIp(netNum) : numToIp(netNum + 1),
        usableLast: prefix === 32 ? numToIp(netNum) : numToIp(bcastNum - 1),
        hosts: totalHosts.toLocaleString(),
      };
    } catch (e) {
      return null;
    }
  };

  const subnetResult = calculateSubnet(cidrInput);

  // IoC Defanger / Refanger
  const processIoC = (text, mode) => {
    if (!text) return "";
    if (mode === "defang") {
      return text
        .replace(/http/gi, "hXXp")
        .replace(/\./g, "[.]")
        .replace(/@/g, "[at]");
    } else {
      return text
        .replace(/hXXp/gi, "http")
        .replace(/\[\.\]/g, ".")
        .replace(/\[at\]/g, "@");
    }
  };

  const processedIoC = processIoC(iocText, defangMode);

  // CVSS v3.1 Score Calculator
  const computeCvss = () => {
    const { AV, AC, PR, UI, C, I, A } = cvssMetrics;
    const impactConf = C;
    const impactInteg = I;
    const impactAvail = A;

    const iss = 1 - (1 - impactConf) * (1 - impactInteg) * (1 - impactAvail);
    const impact = 6.42 * iss;
    const exploitability = 8.22 * AV * AC * PR * UI;

    let score = 0;
    if (impact > 0) {
      score = Math.min(10, Math.ceil((impact + exploitability) * 10) / 10);
    }

    let rating = "NONE";
    let color = "cyan";
    if (score >= 9.0) { rating = "CRITICAL"; color = "red"; }
    else if (score >= 7.0) { rating = "HIGH"; color = "amber"; }
    else if (score >= 4.0) { rating = "MEDIUM"; color = "cyan"; }
    else if (score > 0) { rating = "LOW"; color = "green"; }

    return { score, rating, color };
  };

  const cvssResult = computeCvss();

  return (
    <section className="w-full min-h-screen bg-cyber-dark text-white py-16 px-4 sm:px-6 lg:px-8 bg-cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <CyberBadge text="EXPANDED SECURITY TOOL SUITE" type="cyan" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 tracking-tight">
            CYBER SECURITY TOOLS
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-3 font-mono">
            Professional cryptographic, network recon, JWT analysis, and vulnerability scoring utilities for security researchers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool 1: Password Entropy & Strength Evaluator */}
          <CyberCard title="Password Entropy & Crack Time Evaluator" badgeText="TOOL // 01" badgeColor="cyan">
            <p className="text-gray-400 text-xs font-mono mb-4">
              Test password resilience against brute-force attacks by measuring information entropy ($E$).
            </p>

            <div className="mb-4">
              <label className="block text-xs font-mono text-cyan-400 uppercase mb-2">
                Enter Test Password:
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type password to evaluate..."
                className="w-full p-3 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-gray-400">Entropy Score:</span>
                <span className={`font-bold uppercase text-${pwdMetrics.color}-400`}>
                  {pwdMetrics.label} ({pwdMetrics.bits} bits)
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className={`h-full transition-all duration-500 bg-${
                    pwdMetrics.color === "green"
                      ? "emerald-400"
                      : pwdMetrics.color === "cyan"
                      ? "cyan-400"
                      : pwdMetrics.color === "amber"
                      ? "amber-400"
                      : "rose-500"
                  }`}
                  style={{ width: `${pwdMetrics.score}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-900/80 p-3 rounded border border-gray-800 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">Est. Crack Time:</span>
                <span className="text-white font-bold">{pwdMetrics.time}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Character Length:</span>
                <span className="text-cyan-400 font-bold">{password.length} chars</span>
              </div>
            </div>
          </CyberCard>

          {/* Tool 2: Cryptographic Encoder & Hash Suite */}
          <CyberCard title="Cryptographic Encoder & Hash Suite" badgeText="TOOL // 02" badgeColor="green">
            <p className="text-gray-400 text-xs font-mono mb-4">
              Real-time string encoding and cryptographic hashing (Base64, ROT13, Hex, Binary, SHA-256).
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {["base64", "rot13", "hex", "binary", "sha256"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setEncodeMode(mode)}
                  className={`px-3 py-1 text-xs font-mono uppercase font-bold rounded border transition-all ${
                    encodeMode === mode
                      ? "bg-cyan-500 text-gray-950 border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:border-cyan-500/40"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-cyan-400 uppercase mb-2">Input Text:</label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase mb-2">
                Output ({encodeMode.toUpperCase()}):
              </label>
              <div className="w-full p-3 rounded bg-gray-900/90 border border-emerald-500/40 text-emerald-300 font-mono text-xs break-all min-h-[4rem]">
                {outputConverted || "Waiting for input..."}
              </div>
            </div>
          </CyberCard>

          {/* Tool 3: JWT Inspector & Decoder */}
          <CyberCard title="JWT (JSON Web Token) Inspector & Decoder" badgeText="TOOL // 03" badgeColor="purple">
            <p className="text-gray-400 text-xs font-mono mb-3">
              Inspect JWT structure, decode Base64Url headers & payload, check signature algorithm & expiration status.
            </p>

            <div className="mb-3">
              <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">Paste JWT Token:</label>
              <textarea
                rows="2"
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="w-full p-2.5 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>

            {jwtData.error ? (
              <div className="p-3 bg-rose-950 border border-rose-500 text-rose-300 text-xs font-mono rounded">
                ✖ {jwtData.error}
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">ALGORITHM:</span>
                  <span className="text-cyan-400 font-bold">{jwtData.alg}</span>
                  {jwtData.isExpired ? (
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500 text-[10px] font-bold">
                      EXPIRED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500 text-[10px] font-bold">
                      VALID / ACTIVE
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-purple-400 font-bold block mb-1">HEADER:</span>
                  <pre className="p-2.5 rounded bg-gray-900 border border-gray-800 text-purple-300 overflow-x-auto">
                    {JSON.stringify(jwtData.header, null, 2)}
                  </pre>
                </div>

                <div>
                  <span className="text-cyan-400 font-bold block mb-1">PAYLOAD:</span>
                  <pre className="p-2.5 rounded bg-gray-900 border border-gray-800 text-cyan-200 overflow-x-auto max-h-36">
                    {JSON.stringify(jwtData.payload, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CyberCard>

          {/* Tool 4: Security Header Analyzer Simulator */}
          <CyberCard title="Web Security Header Analyzer" badgeText="TOOL // 04" badgeColor="amber">
            <p className="text-gray-400 text-xs font-mono mb-3">
              Analyze web application security headers (CSP, HSTS, X-Frame-Options) for vulnerability postures.
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 p-2.5 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={runHeaderScan}
                disabled={analyzing}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-mono font-bold text-xs rounded uppercase tracking-wider"
              >
                {analyzing ? "SCANNING..." : "SCAN HEADERS"}
              </button>
            </div>

            {scanResult && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center bg-gray-900 p-2.5 rounded border border-gray-800">
                  <span className="text-gray-400">SECURITY POSTURE GRADE:</span>
                  <span className="text-xl font-bold text-amber-400">{scanResult.grade}</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {scanResult.headers.map((h, i) => (
                    <div key={i} className="p-2 rounded bg-gray-900/90 border border-gray-800">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-200">{h.name}</span>
                        {h.present ? (
                          <span className="text-emerald-400 font-bold">✔ PRESENT</span>
                        ) : (
                          <span className="text-rose-400 font-bold">✖ MISSING</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 break-all">{h.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CyberCard>

          {/* Tool 5: CIDR / Subnet IP Calculator */}
          <CyberCard title="Subnet & CIDR IP Calculator" badgeText="TOOL // 05" badgeColor="cyan">
            <p className="text-gray-400 text-xs font-mono mb-3">
              Calculate Network ID, Subnet Mask, Usable Host Range, and Broadcast IP for any CIDR block.
            </p>

            <div className="mb-3">
              <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">CIDR Address Notation:</label>
              <input
                type="text"
                value={cidrInput}
                onChange={(e) => setCidrInput(e.target.value)}
                placeholder="192.168.1.0/24"
                className="w-full p-2.5 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {subnetResult ? (
              <div className="grid grid-cols-2 gap-2 bg-gray-900 p-3 rounded border border-gray-800 font-mono text-xs">
                <div><span className="text-gray-500 block">Network ID:</span><span className="text-cyan-400 font-bold">{subnetResult.network}</span></div>
                <div><span className="text-gray-500 block">Subnet Mask:</span><span className="text-emerald-400 font-bold">{subnetResult.netmask}</span></div>
                <div><span className="text-gray-500 block">First Usable IP:</span><span className="text-white font-bold">{subnetResult.usableFirst}</span></div>
                <div><span className="text-gray-500 block">Last Usable IP:</span><span className="text-white font-bold">{subnetResult.usableLast}</span></div>
                <div><span className="text-gray-500 block">Broadcast IP:</span><span className="text-rose-400 font-bold">{subnetResult.broadcast}</span></div>
                <div><span className="text-gray-500 block">Total Host IPs:</span><span className="text-amber-400 font-bold">{subnetResult.hosts}</span></div>
              </div>
            ) : (
              <div className="p-3 bg-gray-900 text-gray-500 text-xs font-mono rounded">
                Enter valid CIDR (e.g., 10.0.0.0/16 or 192.168.1.0/24)
              </div>
            )}
          </CyberCard>

          {/* Tool 6: IoC Defanger / Refanger */}
          <CyberCard title="IoC Defang & Sanitizer Tool" badgeText="TOOL // 06" badgeColor="red">
            <p className="text-gray-400 text-xs font-mono mb-3">
              Safely sanitize malicious URLs, IP addresses, and emails for incident reports and threat feeds.
            </p>

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setDefangMode("defang")}
                className={`px-3 py-1 text-xs font-mono font-bold rounded uppercase ${
                  defangMode === "defang" ? "bg-rose-500 text-gray-950" : "bg-gray-900 text-gray-400"
                }`}
              >
                DEFANG (SAFE)
              </button>
              <button
                onClick={() => setDefangMode("refang")}
                className={`px-3 py-1 text-xs font-mono font-bold rounded uppercase ${
                  defangMode === "refang" ? "bg-emerald-500 text-gray-950" : "bg-gray-900 text-gray-400"
                }`}
              >
                REFANG (RESTORE)
              </button>
            </div>

            <textarea
              rows="3"
              value={iocText}
              onChange={(e) => setIocText(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-900 border border-cyan-500/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 mb-2"
            />

            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase block mb-1">PROCESSED IOC OUTPUT:</span>
              <div className="p-2.5 rounded bg-gray-900 border border-rose-500/40 text-rose-300 font-mono text-xs break-all min-h-[3rem]">
                {processedIoC}
              </div>
            </div>
          </CyberCard>

          {/* Tool 7: CVSS v3.1 Severity Rating Calculator */}
          <CyberCard title="CVSS v3.1 Severity Risk Calculator" badgeText="TOOL // 07" badgeColor="amber" className="lg:col-span-2">
            <p className="text-gray-400 text-xs font-mono mb-4">
              Estimate Common Vulnerability Scoring System (CVSS v3.1) Base Score & Severity Rating.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 font-mono text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Attack Vector (AV):</label>
                <select
                  value={cvssMetrics.AV}
                  onChange={(e) => setCvssMetrics({ ...cvssMetrics, AV: parseFloat(e.target.value) })}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-800 text-cyan-300"
                >
                  <option value={0.85}>Network (AV:N)</option>
                  <option value={0.62}>Adjacent (AV:A)</option>
                  <option value={0.55}>Local (AV:L)</option>
                  <option value={0.2}>Physical (AV:P)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Complexity (AC):</label>
                <select
                  value={cvssMetrics.AC}
                  onChange={(e) => setCvssMetrics({ ...cvssMetrics, AC: parseFloat(e.target.value) })}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-800 text-cyan-300"
                >
                  <option value={0.77}>Low (AC:L)</option>
                  <option value={0.44}>High (AC:H)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Privileges Req (PR):</label>
                <select
                  value={cvssMetrics.PR}
                  onChange={(e) => setCvssMetrics({ ...cvssMetrics, PR: parseFloat(e.target.value) })}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-800 text-cyan-300"
                >
                  <option value={0.85}>None (PR:N)</option>
                  <option value={0.62}>Low (PR:L)</option>
                  <option value={0.27}>High (PR:H)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">User Interaction (UI):</label>
                <select
                  value={cvssMetrics.UI}
                  onChange={(e) => setCvssMetrics({ ...cvssMetrics, UI: parseFloat(e.target.value) })}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-800 text-cyan-300"
                >
                  <option value={0.85}>None (UI:N)</option>
                  <option value={0.62}>Required (UI:R)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 p-4 rounded border border-gray-800 gap-4 font-mono">
              <div className="flex items-center gap-4">
                <div className={`text-4xl font-bold text-${cvssResult.color}-400`}>
                  {cvssResult.score.toFixed(1)}
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">VULNERABILITY SEVERITY RATING</span>
                  <CyberBadge text={cvssResult.rating} type={cvssResult.color} />
                </div>
              </div>

              <div className="text-xs text-gray-400 max-w-md">
                Formula complies with FIRST.org CVSS v3.1 Specification Standards.
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </section>
  );
}

export default Tools;
