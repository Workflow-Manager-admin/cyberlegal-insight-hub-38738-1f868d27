import React, { useState } from 'react';
import './App.css';
import CyberQuiz from "./CyberQuiz";
import ContractUpload from "./ContractUpload";

/**
 * ProgressBar and stepper for visualizing app flow steps.
 */
function FlowProgressBar({ step, steps }) {
  const pct = (step / (steps.length - 1)) * 100;
  return (
    <div style={{ margin: '32px auto 18px auto', maxWidth: 600, width: '100%' }}>
      <ol
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {steps.map((label, idx) => (
          <li
            key={label}
            style={{
              flex: 1,
              textAlign: 'center',
              color:
                step === idx
                  ? 'var(--base-light)'
                  : idx < step
                  ? '#6ee7b7'
                  : 'var(--text-secondary)',
              fontWeight: step === idx ? 600 : 400,
              fontSize: idx === step ? '1.1rem' : '1rem',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '2px 6px',
                borderRadius: 12,
                background:
                  step === idx
                    ? 'var(--base-light)'
                    : idx < step
                    ? 'rgba(110,231,183,0.18)'
                    : 'rgba(255,255,255,0.03)',
                color: step === idx ? '#001136' : undefined,
                minWidth: 25,
                marginBottom: 2,
                fontSize: 15,
              }}
            >
              {idx + 1}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.22, marginTop: 2 }}>{label}</div>
          </li>
        ))}
      </ol>
      <div
        style={{
          marginTop: 12,
          marginLeft: '2%',
          marginRight: '2%',
          height: 6,
          background: 'var(--border-color)',
          borderRadius: 3,
          position: 'relative',
          width: '96%',
        }}
      >
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: 'linear-gradient(90deg,#00ffff,#2563eb 80%)',
            width: `${pct}%`,
            transition: 'width 0.44s cubic-bezier(.48,1.56,.68,1.01)',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

/**
 * WelcomeStep – Branded Welcome Screen for CyberLegal Insight Hub.
 */
function WelcomeStep({ onNext }) {
  return (
    <section className="step-page">
      <div className="welcome-hero">
        <div className="avatar-illustration-wrapper">
          {/* Avatar illustration placeholder for branding & friendliness */}
          <div className="avatar-illustration">
            <span role="img" aria-label="CyberLegal avatar" style={{ fontSize: 68, display: "block" }}>
              👩‍💻
            </span>
            <span className="avatar-bg-decoration" />
          </div>
        </div>
        <div className="subtitle">
          Welcome to <span style={{ color: 'var(--base-light)', fontWeight: 600 }}>CyberLegal Insight Hub</span>
        </div>
        <h1 className="title" style={{ marginTop: 0, marginBottom: 12 }}>
          Digital & Legal Safety.<br />One Unified Flow.
        </h1>
        <div className="description" style={{ fontWeight: 400 }}>
          Uncover your digital habits, assess your legal awareness, and receive a{" "}
          <span style={{ color: "var(--base-light)", fontWeight: 500 }}>
            personalized Digital Safety Index
          </span>
          {" "}and step-by-step improvement roadmap.<br />
          Begin your journey to digital peace of mind—with help from <b>Kavia AI</b>.
        </div>
        <button
          className="btn btn-large welcome-cta"
          onClick={onNext}
          aria-label="Start CyberLegal Insight Assessment"
        >
          <span style={{ fontWeight: 600 }}>Start Assessment</span>
        </button>
      </div>
    </section>
  );
}

function QuizStep({ onQuizComplete, onBack }) {
  // This step will call onQuizComplete when finished with the user responses
  return (
    <CyberQuiz
      onBack={onBack}
      onComplete={onQuizComplete}
    />
  );
}

// PUBLIC_INTERFACE
function ContractUploadStep({ onNext, onBack }) {
  return <ContractUpload onNext={onNext} onBack={onBack} />;
}

/**
 * ResultsDashboardStep – Shows scores calculated by mock AI risk engine.
 * Props:
 *   onNext, onBack
 *   quizAnswers, contractInput (optional)
 */
function ResultsDashboardStep({ onNext, onBack, quizAnswers, contractInput }) {
  // --- Stub AI logic: combine quiz and contract and assign mock scores ---

  // Assess cyber score (mock rule: more strong answers → higher score)
  function getMockCyberScore(quiz) {
    if (!quiz) return null;
    let score = 50;
    if (quiz.pw_length === "long") score += 20;
    else if (quiz.pw_length === "medium") score += 10;
    if (quiz.pw_reuse === "never") score += 15;
    else if (quiz.pw_reuse === "sometimes") score += 5;
    if (quiz.pw_manager === "yes") score += 10;
    if (quiz["2fa_usage"] === "always") score += 10;
    if (quiz.phishing_click === "no") score += 10;
    // Clamp 0-100
    return Math.min(100, Math.max(0, score));
  }

  // Assess contract score (mock: points off if long/risky text present)
  function getMockContractScore(contract) {
    if (!contract) return null;
    const text = contract.toLowerCase();
    let score = 80;
    if (text.includes("indemnify") || text.includes("liability")) score -= 15;
    if (text.includes("termination") || text.includes("arbitration")) score -= 10;
    if (contract.length > 1500) score -= 10;
    if (contract.length < 150) score -= 20;
    return Math.max(0, Math.min(100, score));
  }

  // Merge to unified index (demo: avg if both, fallback to one if missing)
  function getUnifiedIndex(cyber, contract) {
    if (cyber != null && contract != null) {
      return Math.round((cyber + contract)/2);
    }
    return cyber != null ? cyber : (contract != null ? contract : null);
  }

  const cyberScore = getMockCyberScore(quizAnswers);
  const contractScore = contractInput ? getMockContractScore(contractInput) : null;
  const unifiedScore = getUnifiedIndex(cyberScore, contractScore);

  // Color/label for scores
  function scoreLevel(score) {
    if (score == null) return { color: "#aaa", label: "Unknown" };
    if (score > 80) return { color: "#00ffbb", label: "Excellent" };
    if (score > 60) return { color: "#4ad1f5", label: "Good" };
    if (score > 40) return { color: "#ffc658", label: "Moderate" };
    if (score > 20) return { color: "#ff9980", label: "Needs Improvement" };
    return { color: "#ff5e5b", label: "High Risk" };
  }

  const unified = scoreLevel(unifiedScore);
  const cyber = scoreLevel(cyberScore);
  const legal = scoreLevel(contractScore);

  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Step 3: Results Dashboard</div>
        <h2 className="title">Your Safety Index & Guidance</h2>
        <div className="description" style={{ marginBottom: 22 }}>
          {unifiedScore != null ? (
            <span>
              <b>Digital Safety Index:&nbsp;</b>
              <span style={{
                color: unified.color,
                fontWeight: 700,
                fontSize: "2.1rem",
                marginRight: 8,
                textShadow: "0 1px 8px rgba(0,255,255,0.14)",
                letterSpacing: 2
              }}>{unifiedScore}/100</span>
              <span style={{
                background: unified.color,
                color: "#001136",
                borderRadius: 9,
                fontWeight: 700,
                padding: "2px 14px",
                fontSize: "1.00rem",
                marginLeft: 6
              }}>{unified.label}</span>
            </span>
          ) : (
            <span style={{color: "#aaa"}}>No risk score yet—missing data.</span>
          )}
        </div>
        <div style={{
          display: "flex",
          gap: 22,
          justifyContent: "center",
          marginBottom: 8,
        }}>
          <div style={{
            background: "rgba(0,255,255,0.05)",
            borderRadius: 12,
            padding: "16px 22px",
            border: "1.5px solid var(--border-color)",
            minWidth: 145,
            minHeight: 72,
          }}>
            <div style={{fontWeight: 500, color: "var(--base-light)", marginBottom: 5}}>
              Cyber Hygiene Score
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, color: cyber.color }}>
              {cyberScore != null ? `${cyberScore}/100` : "—"}
            </div>
            <span style={{
              fontWeight: 600,
              fontSize: "0.99rem",
              color: cyber.color
            }}>{cyber.label}</span>
          </div>
          <div style={{
            background: "rgba(0,255,255,0.05)",
            borderRadius: 12,
            padding: "16px 22px",
            border: "1.5px solid var(--border-color)",
            minWidth: 145,
            minHeight: 72
          }}>
            <div style={{fontWeight: 500, color: "#64fff3", marginBottom: 5}}>
              Contractual Risk Score
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, color: legal.color }}>
              {contractScore != null ? `${contractScore}/100` : "—"}
            </div>
            <span style={{
              fontWeight: 600,
              fontSize: "0.99rem",
              color: legal.color
            }}>{legal.label}</span>
          </div>
        </div>
        <div className="description" style={{fontSize: "1.065rem", color: "#a0e6ff", margin: "18px 0 8px 0"}}>
          <b>Note:</b> These scores are generated by demo logic for illustration. In production, robust AI analysis will provide in-depth, actionable risk insights.
        </div>
        <div className="step-actions">
          <button className="btn" onClick={onBack}>Back</button>
          <button className="btn btn-large" onClick={onNext}>Finish</button>
        </div>
      </div>
    </section>
  );
}

/**
 * ThankYouStep – Friendly branded follow-up with retake and subscription/CTA.
 * @param {function} onRestart
 */
function ThankYouStep({ onRestart }) {
  // PUBLIC_INTERFACE
  // Email subscription CTA placeholder (stub logic)
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim().length > 4 && email.includes("@")) {
      setSubmitted(true);
      // Simulate subscription. In production, this would post to backend or external API.
    }
  }
  return (
    <section className="step-page">
      <div className="hero" style={{
        background: "rgba(0,255,255,0.044)",
        borderRadius: 10,
        padding: "38px 12px 45px 12px",
        boxShadow: "0 2px 20px 0 rgba(0,255,255,0.05)",
        maxWidth: 520,
        margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginBottom: 10 }}>
          <div className="avatar-illustration" style={{ marginBottom: 7, marginTop: 2 }}>
            <span role="img" aria-label="celebration" style={{ fontSize: 58 }}>🎉</span>
            <span className="avatar-bg-decoration" />
          </div>
        </div>
        <div className="subtitle" style={{ color: "var(--base-light)", marginBottom: 3, fontWeight: 600 }}>Thank You!</div>
        <h2 className="title" style={{ margin: "0 0 13px 0", fontSize: "2.5rem" }}>Assessment Complete</h2>
        <div className="description" style={{ marginBottom: 21, fontSize: "1.16rem", color: "#bffdf7" }}>
          Well done! You're one step closer to digital peace of mind.
          <br />
          Track your progress, revisit personalized tips, and continue improving your digital & legal awareness with Kavia AI.
        </div>
        <div className="step-actions" style={{ marginBottom: 22 }}>
          <button className="btn btn-large" style={{ minWidth: 145, fontWeight: 600 }} onClick={onRestart}>
            &#8635; Retake Assessment
          </button>
        </div>
        <div style={{
          margin: "20px auto 0 auto",
          background: "rgba(0,255,255,0.055)",
          border: "1.3px solid var(--border-color)",
          borderRadius: 11,
          padding: "24px 19px 18px 19px",
          boxShadow: "0 2px 15px 0 rgba(0,255,255,0.04)",
          maxWidth: 410,
          color: "#d8f9ff",
          textAlign: "center"
        }}>
          <div style={{ fontWeight: 600, color: "#00ffff", fontSize: "1.145rem", marginBottom: 8 }}>
            Stay in the Loop for CyberLegal Tips!
          </div>
          <div style={{ fontSize: "1.03rem", marginBottom: 13, color: "#b5ebfe" }}>
            Get exclusive updates, guidance, and digital safety resources straight to your inbox.
          </div>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}
            onSubmit={handleSubscribe}
            autoComplete="off"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setSubmitted(false); }}
              style={{
                border: "1.3px solid var(--base-light)",
                borderRadius: 7,
                background: "rgba(0,255,255,0.012)",
                padding: "10px 13px",
                fontSize: "1.07rem",
                color: "#001136",
                marginBottom: 0,
                outline: submitted ? "2px solid #00fa9a" : undefined,
                minWidth: "210px"
              }}
              disabled={submitted}
              required
              aria-label="Email for updates"
            />
            <button
              className="btn btn-large"
              type="submit"
              style={{
                minWidth: 120,
                background: submitted ? "#91ffd1" : "var(--base-light)",
                color: "#001136",
                fontWeight: 600,
                cursor: submitted ? "not-allowed" : "pointer"
              }}
              disabled={submitted}
            >
              {submitted ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
          {submitted && (
            <div style={{ color: "#10ffb9", fontWeight: 500, fontSize: "1rem", marginTop: 7 }}>
              You’re on our list! Check your inbox for updates soon.
            </div>
          )}
        </div>
        <div style={{ margin: "30px 0 0 0", fontSize: "1.02rem", color: "#6de8cc" }}>
          <span role="img" aria-label="wave">👋</span> Questions or feedback? Reach out: <span style={{ color: "#00ffff" }}>hello@kavia.ai</span>
        </div>
      </div>
    </section>
  );
}

/**
 * CyberLegal Insight Hub Main Container – step flow + progress indicator.
 */
/**
 * PUBLIC_INTERFACE
 * Main application container – orchestrates multi-step workflow, quiz and contract states, and passes to assessment logic.
 */
function App() {
  // 0: Welcome, 1: Quiz, 2: Contract Upload, 3: Results, 4: Thank You
  const [step, setStep] = useState(0);

  // Stores quiz and contract info for risk scoring
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [contractInput, setContractInput] = useState(null);

  const steps = [
    'Welcome',
    'Quiz',
    'Contract Upload',
    'Results',
    'Thank You'
  ];

  // Navigation functions
  const goNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const restart = () => {
    setQuizAnswers(null);
    setContractInput(null);
    setStep(0);
  };

  // Handler to complete quiz and store answers, move to next step
  function handleQuizComplete(answers) {
    setQuizAnswers(answers);
    goNext();
  }

  // Handler for contract upload/paste/skip step (accepts contract text or null for skip; filename ignored in stub)
  function handleContractStep(contractText, _filename) {
    setContractInput(contractText);
    goNext();
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <div style={{ minWidth: 160, textAlign: 'right', color: '#fff', opacity: 0.5, fontSize: '0.95rem' }}>
              CyberLegal Insight Hub
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <FlowProgressBar step={step} steps={steps} />
          {step === 0 && <WelcomeStep onNext={goNext} />}
          {step === 1 && (
            <QuizStep
              onBack={goBack}
              onQuizComplete={handleQuizComplete}
            />
          )}
          {step === 2 && (
            <ContractUploadStep
              onNext={handleContractStep}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <ResultsDashboardStep
              onNext={goNext}
              onBack={goBack}
              quizAnswers={quizAnswers}
              contractInput={contractInput}
            />
          )}
          {step === 4 && <ThankYouStep onRestart={restart} />}
        </div>
      </main>
    </div>
  );
}

export default App;
