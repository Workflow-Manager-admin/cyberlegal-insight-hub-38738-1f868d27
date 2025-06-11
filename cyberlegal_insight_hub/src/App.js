import React, { useState } from 'react';
import './App.css';
import CyberQuiz from "./CyberQuiz";

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

import ContractUpload from "./ContractUpload";

import ContractUpload from "./ContractUpload";

// function ContractUploadStep maintained below

function ResultsDashboardStep({ onNext, onBack }) {
  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Step 3: Results Dashboard</div>
        <h2 className="title">Your Safety Index & Guidance</h2>
        <div className="description">[Results Dashboard Placeholder]</div>
        <div className="step-actions">
          <button className="btn" onClick={onBack}>Back</button>
          <button className="btn btn-large" onClick={onNext}>Finish</button>
        </div>
      </div>
    </section>
  );
}

function ThankYouStep({ onRestart }) {
  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Thank You!</div>
        <h2 className="title">Assessment Complete</h2>
        <div className="description">
          [Thank You Placeholder. Add retake and subscribe actions here.]
        </div>
        <button className="btn btn-large" onClick={onRestart}>Retake Assessment</button>
      </div>
    </section>
  );
}

/**
 * CyberLegal Insight Hub Main Container – step flow + progress indicator.
 */
// PUBLIC_INTERFACE
function App() {
  // 0: Welcome, 1: Quiz, 2: Contract Upload, 3: Results, 4: Thank You
  const [step, setStep] = useState(0);
  // Quiz answers state managed in App, can be stored for future use
  const [quizAnswers, setQuizAnswers] = useState(null);

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
    setStep(0);
  };

  // Handler to complete quiz and store answers, move to next step
  function handleQuizComplete(answers) {
    setQuizAnswers(answers);
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
          {step === 2 && <ContractUploadStep onNext={goNext} onBack={goBack} />}
          {step === 3 && <ResultsDashboardStep onNext={goNext} onBack={goBack} />}
          {step === 4 && <ThankYouStep onRestart={restart} />}
        </div>
      </main>
    </div>
  );
}

export default App;
