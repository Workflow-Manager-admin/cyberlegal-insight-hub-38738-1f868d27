import React, { useState } from "react";

/**
 * cyberlegal_insight_hub/src/CyberQuiz.js
 * Adaptive, step-based cyber hygiene quiz for CyberLegal Insight Hub.
 * Features:
 *  - Conditional question rendering (some questions shown/skipped based on response logic)
 *  - Inline info tooltips for tricky terms/concepts
 *  - Per-quiz progress bar
 */

/** Simple quiz data structure.
 *  Supports conditionally showing follow-up questions based on previous answers.
 */
const quizQuestions = [
  {
    id: "pw_length",
    text: "How long is your typical password?",
    info: "Longer passwords are more secure against brute-force attacks.",
    type: "single",
    options: [
      { label: "6 characters or fewer", value: "short" },
      { label: "7–10 characters", value: "medium" },
      { label: "11+ characters", value: "long" }
    ]
  },
  {
    id: "pw_reuse",
    text: "Do you reuse passwords across different sites/services?",
    info: "Reusing passwords means attackers can breach multiple accounts if one gets hacked.",
    type: "single",
    options: [
      { label: "Always / Almost always", value: "always" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Never, every password is unique", value: "never" }
    ]
  },
  {
    id: "pw_manager",
    text: "Do you use a password manager?",
    info:
      "Password managers help safely store and autofill unique, strong passwords for each account.",
    type: "single",
    options: [
      { label: "Yes, always", value: "yes" },
      { label: "Sometimes", value: "sometimes" },
      { label: "No, never", value: "no" }
    ]
  },
  {
    id: "2fa_usage",
    text: "Do you enable Two-Factor Authentication (2FA) where available?",
    info:
      "2FA adds an extra layer of security—such as a code sent to your phone—on top of your password.",
    type: "single",
    options: [
      { label: "Always", value: "always" },
      { label: "Occasionally", value: "sometimes" },
      { label: "Never", value: "never" }
    ]
  },
  {
    id: "phishing_awareness",
    text: "Have you received suspicious emails or texts (e.g., phishing) in the last month?",
    info:
      "Phishing messages impersonate trusted companies to trick you into revealing sensitive info.",
    type: "single",
    options: [
      { label: "Yes, many!", value: "frequently" },
      { label: "Once or twice", value: "rarely" },
      { label: "Not that I'm aware of", value: "never" }
    ]
  },
  // Conditional: Only ask this next question if user gets 'frequently' or 'rarely' above.
  {
    id: "phishing_click",
    text: "Have you ever clicked a link or opened an attachment in a suspicious message?",
    info: "Clicking suspicious links/attachments can install malware or steal data.",
    type: "single",
    options: [
      { label: "Yes, and I realized later", value: "yes_later" },
      { label: "Yes, and reported it immediately", value: "yes_reported" },
      { label: "No, I'm always cautious", value: "no" }
    ],
    // Show if phishing_awareness is not "never"
    showIf: (responses) =>
      responses["phishing_awareness"] &&
      responses["phishing_awareness"] !== "never"
  }
];

// Helper to get the currently visible questions based on current responses
function getVisibleQuestions(responses) {
  return quizQuestions.filter(
    (q) => !q.showIf || q.showIf(responses)
  );
}

// Inline info tooltip (simple implementation)
function InfoTooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ marginLeft: 8, display: "inline-block", position: "relative" }}>
      <button
        aria-label="More info"
        style={{
          background: "none",
          border: "none",
          color: "var(--base-light)",
          cursor: "pointer",
          fontSize: 15,
          padding: 0,
          verticalAlign: "middle"
        }}
        onClick={() => setShow((s) => !s)}
        type="button"
        tabIndex={0}
      >
        <span aria-hidden="true" style={{
          display: "inline-block",
          border: "1.5px solid var(--base-light)",
          borderRadius: "50%",
          width: 18,
          height: 18,
          lineHeight: "16px",
          textAlign: "center",
          fontWeight: 700
        }}>?</span>
      </button>
      {show && (
        <span
          role="tooltip"
          style={{
            background: "rgba(26,26,26,0.96)",
            color: "#fff",
            border: "1px solid var(--border-color)",
            borderRadius: 6,
            padding: "9px 18px",
            position: "absolute",
            left: 22,
            top: -2,
            minWidth: 180,
            zIndex: 20,
            fontSize: "0.98em"
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

// Per-quiz progress bar (across visible questions)
function QuizProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{
      width: "100%",
      margin: "16px 0 28px 0",
      background: "var(--border-color)",
      height: 7,
      borderRadius: 4,
      position: "relative"
    }}>
      <div style={{
        height: 7,
        background: "linear-gradient(90deg,#00ffff,#2563eb 80%)",
        borderRadius: 4,
        width: `${pct}%`,
        transition: "width 0.38s cubic-bezier(.31,1.45,.72,1.01)",
        position: "absolute",
        left: 0,
        top: 0
      }} />
    </div>
  );
}

// PUBLIC_INTERFACE
function CyberQuiz({ onComplete, onBack }) {
  /**
   * Quiz state/logic:
   * - Track current question index (among visible questions only)
   * - Track user responses in an object: { [question.id]: value }
   * - Show only questions whose showIf is true for current responses
   * - When quiz is fully answered, call onComplete(responses)
   */
  const [responses, setResponses] = useState({});
  const visibleQuestions = getVisibleQuestions(responses);
  const [step, setStep] = useState(0);

  const currentQ = visibleQuestions[step];

  // On answer, move to next (or finish)
  function handleOptionSelect(qid, val) {
    setResponses((prev) => {
      const next = { ...prev, [qid]: val };
      // When conditional logic changes number of steps, snap step to last valid if needed
      const vq = getVisibleQuestions(next);
      if (step + 1 >= vq.length) {
        // Done
        onComplete && onComplete(next);
      } else {
        setStep(step + 1);
      }
      return next;
    });
  }

  function handleBack() {
    if (step === 0) {
      onBack && onBack();
    } else {
      // Step back, rewinding to the nearest previous (considers conditional logic)
      setStep(step - 1);
    }
  }

  // On re-render after responses update:
  // If our step is beyond last valid (e.g. skipped a conditional question), snap to last.
  React.useEffect(() => {
    if (step > visibleQuestions.length - 1) {
      setStep(visibleQuestions.length - 1);
    }
  }, [visibleQuestions.length, step]);

  if (!currentQ) return null; // Safety guard

  return (
    <section className="step-page" style={{ maxWidth: 580, margin: "0 auto" }}>
      <div style={{ width: "100%", maxWidth: 500, background: "rgba(255,255,255,0.01)", borderRadius: 10, padding: "34px 10px 40px 10px", boxShadow: "0 2px 24px 0 rgba(0,255,255,0.09)", position: "relative" }}>
        <div className="subtitle" style={{ fontWeight: 500, color: "var(--base-light)" }}>
          Cyber Behavior Quiz
        </div>
        <QuizProgressBar current={step} total={visibleQuestions.length} />
        <h2 className="title" style={{ fontSize: "2rem", margin: 0, marginBottom: 2, marginTop: 0 }}>
          {currentQ.text}
          <InfoTooltip text={currentQ.info} />
        </h2>
        <form
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 15
          }}
          onSubmit={e => e.preventDefault()}
        >
          {currentQ.options &&
            currentQ.options.map((opt) => (
              <label
                key={opt.value}
                style={{
                  background: "rgba(0,255,255,0.09)",
                  color: "#fff",
                  border: "1.5px solid var(--border-color)",
                  borderRadius: 7,
                  padding: "12px 18px",
                  marginBottom: 7,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontSize: "1.13rem",
                  fontWeight: 500,
                  transition: "border 0.14s",
                  boxShadow:
                    responses[currentQ.id] === opt.value
                      ? "0 0 0 2.4px var(--base-light)"
                      : undefined
                }}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={opt.value}
                  checked={responses[currentQ.id] === opt.value}
                  onChange={() => handleOptionSelect(currentQ.id, opt.value)}
                  style={{
                    accentColor: "var(--base-light)",
                    width: 19,
                    height: 19,
                    marginRight: 5
                  }}
                />
                {opt.label}
              </label>
            ))}
        </form>
        <div className="step-actions" style={{ marginTop: 24 }}>
          <button className="btn" onClick={handleBack} style={{ minWidth: 85 }}>
            {step === 0 ? "Back" : "Previous"}
          </button>
          {/* Only allow forward if answered */}
          <button
            className="btn btn-large"
            onClick={() => {
              // Manual next (skips only if already answered), otherwise block
              if (responses[currentQ.id]) {
                if (step + 1 >= visibleQuestions.length) {
                  onComplete && onComplete(responses);
                } else {
                  setStep(step + 1);
                }
              }
            }}
            disabled={!responses[currentQ.id]}
            style={{
              minWidth: 85,
              background: responses[currentQ.id]
                ? "var(--base-light)"
                : "var(--border-color)",
              color: responses[currentQ.id] ? "#001136" : "#fff"
            }}
          >
            {step + 1 === visibleQuestions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CyberQuiz;
