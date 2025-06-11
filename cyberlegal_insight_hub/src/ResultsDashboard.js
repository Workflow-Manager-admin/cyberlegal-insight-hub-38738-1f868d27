import React, { useState } from "react";

/**
 * ResultsDashboard.js
 * Dashboard showing calculated risk scores as cards and interactive tabs:
 * - Score cards for Cyber Hygiene, Contractual Risk, and Unified Safety Index
 * - Tabs for actionable tips, contract summary, and action plan
 * - Stubbed section for future AI conversational advice and risk simulations
 * 
 * Props:
 *   cyberScore (integer 0-100)
 *   contractScore (integer 0-100)
 *   unifiedScore (integer 0-100)
 *   cyberLabel, contractLabel, unifiedLabel (level string)
 *   onNext, onBack (optional)
 *   userTips (array of string), contractSummary (string), actionPlan (array of string)
 */

// Utility to compute color+label for score level (to keep in sync with main app logic)
function scoreLevel(score) {
  if (score == null) return { color: "#aaa", label: "Unknown" };
  if (score > 80) return { color: "#00ffbb", label: "Excellent" };
  if (score > 60) return { color: "#4ad1f5", label: "Good" };
  if (score > 40) return { color: "#ffc658", label: "Moderate" };
  if (score > 20) return { color: "#ff9980", label: "Needs Improvement" };
  return { color: "#ff5e5b", label: "High Risk" };
}

import EducationCenter from "./EducationCenter";
// PUBLIC_INTERFACE
function ResultsDashboard({
  cyberScore,
  contractScore,
  unifiedScore,
  onNext,
  onBack,
  userTips = [],
  contractSummary = "",
  actionPlan = [],
}) {
  // Tab UI states
  const tabs = [
    { id: "tips", label: "User Tips" },
    { id: "contract", label: "Contract Summary" },
    { id: "action", label: "Action Plan" },
    { id: "education", label: "Education Center" },
  ];
  const [activeTab, setActiveTab] = useState("tips");

  // Use scored level/color
  const cyber = scoreLevel(cyberScore);
  const contract = scoreLevel(contractScore);
  const unified = scoreLevel(unifiedScore);

  // Fallback content for demonstration if props are empty
  const mockUserTips =
    userTips.length > 0
      ? userTips
      : [
          "Use unique passwords for each account.",
          "Enable Two-Factor Authentication where possible.",
          "Never click suspicious links in emails.",
          "Review contract clauses for words like 'liability', 'termination', or 'arbitration'.",
        ];

  const mockContractSummary =
    contractSummary ||
    "Your contract contains standard clauses. ⚠️ Watch for 'indemnify', 'liability', and long blocks of legalese which may pose risk. Consider flagging unclear terms for review.";

  const mockActionPlan =
    actionPlan.length > 0
      ? actionPlan
      : [
          "Update weak passwords to 11+ characters.",
          "Adopt a password manager.",
          "Avoid reusing passwords.",
          "Request a legal review if contracts contain 'liability' or 'indemnify'.",
        ];

  // ---- ConversationalAdvisor UI stub ----
  // PUBLIC_INTERFACE
  function ConversationalAdvisor({ messages, isLoading, onSend }) {
    // This stub simulates future AI chat/tips—will be replaced with GPT integration.
    // messages: [{sender: "ai"|"user", text: string}]
    // onSend: function to send user queries (stubbed here)
    const [input, setInput] = useState("");
    return (
      <div
        style={{
          margin: "32px auto 0 auto",
          background: "rgba(0,255,255,0.045)",
          border: "1.3px solid var(--border-color)",
          borderRadius: 10,
          padding: "22px 19px 12px 19px",
          maxWidth: 570,
          boxShadow: "0 2px 18px 0 rgba(32,255,255,0.02)",
          color: "#dffcff",
          fontSize: "1.08rem",
        }}
      >
        <div style={{fontWeight: 600, color: "#00ffff", marginBottom: 10, letterSpacing:0.02, fontSize: "1.08rem"}}>
          Conversational Advisor <span style={{fontSize:17, marginLeft:5}}>💬</span>
        </div>
        <div style={{ fontSize: "1.04rem", color: "#cdf2e7", marginBottom: 10 }}>
          {/* Placeholder description */}
          Get personalized digital safety guidance here—ask about your results, digital risks, or contract terms!{" "}
          <span style={{ fontStyle: "italic", color: "#4af0fa" }}>(Coming soon: AI-powered advice)</span>
        </div>
        <div style={{minHeight: 48, maxHeight: 128, overflowY: "auto", background:"rgba(0,255,255,0.0)", paddingBottom:8}}>
          {(messages && messages.length > 0) ? (
            messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 6,
                  textAlign: m.sender === "user" ? "right" : "left",
                  color: m.sender === "user" ? "#aee2fb" : "#afefd6",
                }}
              >
                <b style={{
                  color: m.sender === "user" ? "#42e7f0" : "#73fbcb",
                  paddingRight: 8,
                  fontWeight: 500,
                  fontSize: "0.97em"
                }}>
                  {m.sender === "user" ? "You" : "Kavia Advisor"}:
                </b>
                <span style={{wordBreak:"break-word"}}>{m.text}</span>
              </div>
            ))
          ) : (
            <div style={{ color: "#B0C8CA", fontSize: "1.01em" }}>
              {/* Initial placeholder AI message */}
              <span>
                <span style={{ color: "#66ffe0" }}>Kavia Advisor:</span>
                {" "}I'm here for your digital safety and contract questions. Try asking things like <b>"How can I improve my cyber hygiene?"</b> or <b>"What does 'indemnify' mean in my contract?"</b>
              </span>
            </div>
          )}
          {isLoading && (
            <div style={{ color: "#fffbe6", marginTop: 8, opacity: 0.89 }}>
              <i>🤖 Advisor is thinking...</i>
            </div>
          )}
        </div>
        <form
          style={{ display: "flex", marginTop:10, gap:8, alignItems:"center" }}
          onSubmit={e=>{e.preventDefault(); if(input && onSend) { onSend(input); setInput(""); } }}
          autoComplete="off"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a question (stub only)...'
            style={{
              flex:1,
              background: "rgba(0,255,255,0.03)",
              border: "1.1px solid var(--border-color)",
              color: "#e6f8ff",
              fontSize: "1.07rem",
              borderRadius: 7,
              padding: "8px 12px",
              outline: "none"
            }}
            disabled // Input disabled until AI backend is enabled (UI only)
          />
          <button
            type="submit"
            style={{
              minWidth:55, background: "var(--base-light)",
              color: "#001136", border: "none", borderRadius: 7,
              padding: "8.5px 14px", fontWeight: 600,
              cursor: "not-allowed", opacity: 0.63, fontSize: "1.01rem"
            }}
            disabled
          >Send</button>
        </form>
        <div style={{fontSize: "0.95em", color:"#54eaff", marginTop:6, opacity:0.85}}>
          (Conversational AI integration is coming soon!)
        </div>
      </div>
    );
  }

  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Results Dashboard</div>
        <h2 className="title" style={{ marginBottom: 12 }}>
          Your Digital Safety Profile
        </h2>
        <div className="description" style={{ marginBottom: 22 }}>
          <b>Digital Safety Index: </b>
          <span
            style={{
              color: unified.color,
              fontWeight: 700,
              fontSize: "2.1rem",
              marginRight: 7,
              textShadow: "0 1px 8px rgba(0,255,255,0.17)",
            }}
          >
            {unifiedScore != null ? `${unifiedScore}/100` : "—"}
          </span>
          <span
            style={{
              background: unified.color,
              color: "#001136",
              borderRadius: 9,
              fontWeight: 700,
              padding: "2px 14px",
              fontSize: "1.00rem",
              marginLeft: 6,
            }}
          >
            {unified.label}
          </span>
        </div>

        {/* Score cards */}
        <div
          style={{
            display: "flex",
            gap: 22,
            justifyContent: "center",
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "rgba(0,255,255,0.065)",
              borderRadius: 12,
              padding: "14px 22px",
              border: "1.5px solid var(--border-color)",
              minWidth: 150,
              minHeight: 80,
              flex: 1,
              maxWidth: 240,
            }}
          >
            <div style={{ fontWeight: 500, color: "var(--base-light)", marginBottom: 4 }}>
              Cyber Hygiene Score
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, color: cyber.color }}>
              {cyberScore != null ? `${cyberScore}/100` : "—"}
            </div>
            <span style={{ fontWeight: 600, fontSize: "0.99rem", color: cyber.color }}>{cyber.label}</span>
          </div>
          <div
            style={{
              background: "rgba(0,255,255,0.065)",
              borderRadius: 12,
              padding: "14px 22px",
              border: "1.5px solid var(--border-color)",
              minWidth: 150,
              minHeight: 80,
              flex: 1,
              maxWidth: 240,
            }}
          >
            <div style={{ fontWeight: 500, color: "#64fff3", marginBottom: 4 }}>
              Contractual Risk Score
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, color: contract.color }}>
              {contractScore != null ? `${contractScore}/100` : "—"}
            </div>
            <span style={{ fontWeight: 600, fontSize: "0.99rem", color: contract.color }}>{contract.label}</span>
          </div>
        </div>

        {/* Tabs for actionable info, summary, plan */}
        <div style={{ margin: "28px auto 0 auto", width: "100%", maxWidth: 570 }}>
          <nav
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background:
                    activeTab === tab.id
                      ? "linear-gradient(87deg,#00ffff 80%,#2d6fd3 100%)"
                      : "rgba(0,255,255,0.08)",
                  color: activeTab === tab.id ? "#001136" : "#aee8f7",
                  border: activeTab === tab.id
                    ? "2px solid var(--base-light)"
                    : "1.2px solid var(--border-color)",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  borderRadius: 8,
                  padding: "7px 17px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                aria-selected={activeTab === tab.id}
                aria-controls={`tab-content-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div
            id={`tab-content-${activeTab}`}
            style={{
              background: "rgba(0,255,255,0.05)",
              border: "1.3px solid var(--border-color)",
              borderRadius: 8,
              marginTop: 10,
              padding: "23px 18px",
              color: "#ddefff",
              minHeight: 88,
              fontSize: "1.06rem",
              boxShadow: "0 2px 12px 0 rgba(0,255,255,0.04)",
              letterSpacing: 0.02,
              transition: "background 0.12s",
            }}
          >
            {activeTab === "tips" && (
              <ul style={{ paddingLeft: 17, margin: 0 }}>
                {mockUserTips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: 6, color: "#bffdff" }}>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "contract" && (
              <div style={{ color: "#c5fffa", minHeight: 80 }}>{mockContractSummary}</div>
            )}
            {activeTab === "action" && (
              <ol style={{ paddingLeft: 19, margin: 0 }}>
                {mockActionPlan.map((act, idx) => (
                  <li key={idx} style={{ marginBottom: 6, color: "#aafbe9" }}>
                    {act}
                  </li>
                ))}
              </ol>
            )}
            {activeTab === "education" && (
              <EducationCenter />
            )}
          </div>
        </div>

        {/* Conversational Advisor area: ready for AI power */}
        <ConversationalAdvisor
          messages={[]} // no messages yet; adapted later for GPT-powered chat
          isLoading={false}
          onSend={null} // Passing no-op, to be implemented with backend
        />

        {/* --- Simulated Interactive Widgets --- */}
        <SimulatedWidgetsSection />

        <div className="step-actions" style={{ marginTop: 30 }}>
          {onBack && (
            <button className="btn" onClick={onBack} type="button" style={{ minWidth: 90 }}>
              Back
            </button>
          )}
          {onNext && (
            <button className="btn btn-large" onClick={onNext} type="button" style={{ minWidth: 105 }}>
              Continue
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// --- Simulated Widgets Section (POPUP UI & Logic for Simulation Widgets) ---
function SimulatedWidgetsSection() {
  // State for widget interactions
  const [phishingOpen, setPhishingOpen] = useState(false);
  const [redFlagOpen, setRedFlagOpen] = useState(false);
  return (
    <div style={{ marginTop: 30, color: "#6dffe9", width: "100%", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button
          style={{
            background: "#033246",
            border: "1.1px solid var(--base-light)",
            borderRadius: 7,
            color: "#e6fbff",
            padding: "11px 20px",
            fontWeight: 600,
            fontSize: "1.09rem",
            cursor: "pointer",
            boxShadow: "0 2px 7px 0 rgba(3,230,255,0.08)",
            marginBottom: 6,
            transition: "background 0.18s",
            outline: "none",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => setPhishingOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={phishingOpen}
        >
          🦠&nbsp; Simulated Phishing Email Preview
        </button>
        <button
          style={{
            background: "#2f0032",
            border: "1.1px solid #fc6eff",
            borderRadius: 7,
            color: "#ffe6fe",
            padding: "11px 20px",
            fontWeight: 600,
            fontSize: "1.09rem",
            cursor: "pointer",
            boxShadow: "0 2px 7px 0 rgba(252,110,255,0.10)",
            marginBottom: 6,
            transition: "background 0.18s",
            outline: "none",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => setRedFlagOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={redFlagOpen}
        >
          ⚠️&nbsp; Clause Red-Flag Pop-up
        </button>
      </div>
      <div style={{ fontSize: "0.99rem", opacity: 0.8, marginTop: 10 }}>
        Interact with simulated scenarios below to learn real-world red flags!
      </div>
      {phishingOpen && <PhishingPreviewModal onClose={() => setPhishingOpen(false)} />}
      {redFlagOpen && <ClauseRedFlagPopover onClose={() => setRedFlagOpen(false)} />}
    </div>
  );
}

function PhishingPreviewModal({ onClose }) {
  // Modal overlay with a demo phishing email
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,32,0.83)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#192f42",
        border: "2px solid #00ffff",
        borderRadius: 14,
        width: "98%", maxWidth: 420,
        padding: "28px 24px 24px 24px",
        color: "#e6fbff",
        boxShadow: "0 4px 38px 0 rgba(0,255,255,0.17)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
          <span style={{ color: "#00ffff", fontWeight: 700, fontSize: "1.22rem" }}>Simulated Phishing Email</span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", color: "#68f5ea", fontSize: 24, cursor: "pointer",
              marginLeft: 10, fontWeight: 400
            }}
            aria-label="Close phishing preview"
          >×</button>
        </div>
        <div
          style={{
            background: "#112232",
            borderRadius: 8,
            padding: "20px 12px 13px 14px",
            marginBottom: 12,
            border: "1px solid #00ffff22"
          }}
        >
          <div style={{ color: "#fc6", fontWeight: 600, fontSize: "1.04em", marginBottom: 3 }}>From: "Security Alert" &lt;noreply-support@micros0ft-secure.com&gt;</div>
          <div style={{ color: "#aaa", fontWeight: 500, fontSize: "0.99em", marginBottom: 6 }}>Subject: 🚨 Action Required: Your Account Will Be Locked</div>
          <div style={{ marginTop: 7, fontFamily: "monospace", whiteSpace: "pre-line", fontSize: "1.01em" }}>
            Dear user,

            Our records indicate unusual activity in your account.
            Please verify your details immediately to avoid suspension.

            <a href="#" style={{
              color: "#00ffff", textDecoration: "underline", background: "#085477", borderRadius: 3,
              padding: "1.5px 7px", fontWeight: 500
            }}>
              Click here to verify your account
            </a>

            Failure to act within 24 hours will result in account lockout.

            Sincerely,<br />
            The Security Team
          </div>
          <div style={{
            marginTop: 11,
            color: "#ff4f55",
            fontWeight: 670,
            fontSize: "0.99em"
          }}>
            <span role="img" aria-label="red flag">🚩</span> <b>Red Flags:</b> Urgent threats, nonstandard sender email, and suspicious links!
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <button
            style={{
              marginTop: 3,
              background: "#00ffff",
              border: "none",
              color: "#001136",
              padding: "9px 24px",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: "1.09rem",
              cursor: "pointer",
              boxShadow:"0 1px 8px 0 rgba(0,255,255,0.13)",
              outline: "none"
            }}
            onClick={onClose}
          >Close</button>
        </div>
      </div>
    </div>
  );
}

function ClauseRedFlagPopover({ onClose }) {
  // Simple popover showing risky contract language and a hint explanation
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(22,0,22,0.76)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#31072b",
        border: "2px solid #fc6eff",
        borderRadius: 14,
        width: "98%", maxWidth: 420,
        padding: "26px 23px 20px 23px",
        color: "#fde7ff",
        boxShadow: "0 4px 32px 0 rgba(252,110,255,0.17)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
          <span style={{ color: "#fc6eff", fontWeight: 700, fontSize: "1.15rem" }}>Clause Red-Flag Pop-up</span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", color: "#fd8eff", fontSize: 22, cursor: "pointer",
              marginLeft: 10, fontWeight: 400
            }}
            aria-label="Close clause flag popover"
          >×</button>
        </div>
        <div
          style={{
            background: "#3c1a35",
            borderRadius: 8,
            padding: "18px 12px 13px 13px",
            border: "1.2px solid #fc6eff33",
            marginBottom: 10,
            color: "#ffe6fe"
          }}
        >
          <div style={{ fontSize: "0.99em", fontWeight: 500, marginBottom: 4 }}>
            <span style={{ color: "#ff4f55", fontWeight: 700, marginRight: 5 }}>⚠️ Example:</span>
            "The client shall <b>indemnify</b> and hold harmless the service provider from any and all liability, damages, or claims..."
          </div>
          <div style={{
            marginTop: 8,
            color: "#ffb6ff",
            fontWeight: 600,
            fontSize: "1.00em"
          }}>
            <span role="img" aria-label="magnifier">🔍</span> <b>Watch For:</b> Terms like <b>"indemnify"</b>, <b>"liability"</b>, <b>"arbitration"</b> &amp; one-sided responsibilities.
          </div>
          <div style={{
            marginTop: 7,
            color: "#62ffdd",
            fontWeight: 500,
            fontSize: "0.98em"
          }}>
            Why care? These clauses can mean you’re taking on extra risk or cost. Consider getting clarification or negotiating for more balanced terms.
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <button
            style={{
              marginTop: 3,
              background: "#fc6eff",
              border: "none",
              color: "#20062a",
              padding: "9px 24px",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: "1.09rem",
              cursor: "pointer",
              boxShadow:"0 1px 8px 0 rgba(220, 110, 255, 0.18)",
              outline: "none"
            }}
            onClick={onClose}
          >Close</button>
        </div>
      </div>
    </div>
  );
}

export default ResultsDashboard;
