import React, { useState } from "react";

/**
 * ResultsDashboard.js
 * Dashboard showing calculated risk scores and interactive tabs for tips, contract summary, and action plan.
 * Can be expanded to support additional dashboard elements.
 * Props:
 *   cyberScore (integer 0-100)
 *   contractScore (integer 0-100)
 *   unifiedScore (integer 0-100)
 *   cyberLabel, contractLabel, unifiedLabel (level string)
 *   onNext, onBack (optional)
 *   userTips (array of string), contractSummary (string), actionPlan (array of string)
 */

// Score color/label utility (keep in sync with App.js if needed)
function scoreLevel(score) {
  if (score == null) return { color: "#aaa", label: "Unknown" };
  if (score > 80) return { color: "#00ffbb", label: "Excellent" };
  if (score > 60) return { color: "#4ad1f5", label: "Good" };
  if (score > 40) return { color: "#ffc658", label: "Moderate" };
  if (score > 20) return { color: "#ff9980", label: "Needs Improvement" };
  return { color: "#ff5e5b", label: "High Risk" };
}

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
  // Tab states
  const tabs = [
    { id: "tips", label: "User Tips" },
    { id: "contract", label: "Contract Summary" },
    { id: "action", label: "Action Plan" },
  ];
  const [activeTab, setActiveTab] = useState("tips");

  // Prepare level/color info
  const cyber = scoreLevel(cyberScore);
  const contract = scoreLevel(contractScore);
  const unified = scoreLevel(unifiedScore);

  // Demo stub content
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

        {/* Tabs */}
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
          </div>
        </div>

        {/* Expandable: Area for further interactive dashboard widgets */}
        <div style={{ marginTop: 21, color: "#6dffe9" }}>
          <span style={{
            fontSize: "0.96rem",
            background: "#001136",
            borderRadius: 5,
            padding: "2px 7px",
            marginRight: 7,
            opacity: 0.85,
          }}>Interactive</span>
          <span style={{ fontSize: "0.99rem", opacity: 0.8 }}>
            More simulation widgets coming soon!
          </span>
        </div>

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

export default ResultsDashboard;
