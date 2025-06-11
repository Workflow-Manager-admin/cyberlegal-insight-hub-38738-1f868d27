import React from "react";

/**
 * EducationCenter.js
 * A hub for user improvement checklist and educational modules, for ResultsDashboard.
 * Features:
 * - Checklist of actionable improvements, auto-highlighted if not yet "done"
 * - List of key educational modules/resources for user learning
 */

/**
 * PUBLIC_INTERFACE
 * EducationCenter – renders summarized improvement list and links to learning modules.
 * Props:
 *   checklist (array of {label, done?}), modules (array of {title, description, link})
 */
function EducationCenter({
  checklist = [
    { label: "Adopt unique, strong passwords for each account", done: false },
    { label: "Enable Two-Factor Authentication (2FA)", done: false },
    { label: "Avoid clicking on suspicious email links", done: false },
    { label: "Use a password manager to store credentials securely", done: false },
    { label: "Request legal review for risky contract terms", done: false },
    { label: "Clarify/avoid one-sided indemnity or liability clauses", done: false },
  ],
  modules = [
    {
      title: "Cyber Hygiene 101: Passwords",
      description: "Learn how to create, manage, and remember strong passwords. Understand the dangers of password reuse.",
      link: "https://www.cyber.gov.au/learn-basics/passwords"
    },
    {
      title: "Identifying Phishing and Scams",
      description: "Spot red flags in emails and messages to avoid social engineering traps.",
      link: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
    },
    {
      title: "Understanding Legal Clauses",
      description: "Know your terms: what do 'indemnify', 'hold harmless', and 'liability' really mean? Learn safe contract practices.",
      link: "https://contracts.law/clauses"
    },
    {
      title: "Using Password Managers",
      description: "Safely store and autofill secure credentials across all your sites.",
      link: "https://www.techradar.com/best/password-manager"
    },
    {
      title: "Negotiating Safer Contracts",
      description: "Tips for requesting balanced changes to legal contracts or agreements.",
      link: "https://www.nolo.com/legal-encyclopedia/negotiate-contract.html"
    }
  ]
}) {
  return (
    <div style={{
      margin: "12px auto 0 auto",
      background: "rgba(0,255,255,0.035)",
      border: "1.3px solid var(--border-color)",
      borderRadius: 11,
      boxShadow: "0 2px 15px 0 rgba(0,255,255,0.04)",
      maxWidth: 600,
      color: "#d8f9ff",
      padding: "28px 24px 24px 24px"
    }}>
      <div style={{ fontWeight: 600, color: "#00ffff", fontSize: "1.12rem", marginBottom: 10 }}>
        📚 Education & Recommendations Center
      </div>
      {/* Checklist Section */}
      <div style={{ marginBottom: 26 }}>
        <div style={{ color: "#aafaff", fontWeight: 500, fontSize: "1.04rem", marginBottom: 7 }}>
          Your Personalized Improvement Checklist:
        </div>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {checklist.map((item, idx) => (
            <li key={idx} style={{
              marginBottom: 8,
              color: item.done ? "#90efd2" : "#ffec8b",
              fontWeight: item.done ? 400 : 600,
              textDecoration: item.done ? "line-through" : "none",
              fontSize: "1.00rem",
              background: item.done ? "none" : "rgba(255, 219, 56, 0.09)",
              borderRadius: 4,
              padding: item.done ? "0 0 0 0" : "2.5px 9px"
            }}>
              {item.done ? <span>✅</span> : <span>⬜</span>}{" "}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      {/* Modules/Lessons Section */}
      <div>
        <div style={{ color: "#8ce7fc", fontWeight: 500, fontSize: "1.04rem", marginBottom: 7 }}>
          Explore Key Learning Modules:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {modules.map((mod, idx) => (
            <a
              href={mod.link}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#00ffff",
                background: "rgba(0,255,255,0.09)",
                border: "1.1px solid var(--border-color)",
                borderRadius: 7,
                textDecoration: "none",
                marginBottom: 2,
                padding: "14px 13px 10px 13px",
                display: "block",
                fontWeight: 500,
                transition: "background 0.11s"
              }}
            >
              <div style={{ fontSize: "1.08rem", fontWeight: 600 }}>{mod.title} <span style={{ marginLeft:3, fontSize: 14 }}>↗</span></div>
              <div style={{ color: "#bbf9ff", fontSize: "1.00rem", fontWeight: 400 }}>{mod.description}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EducationCenter;
