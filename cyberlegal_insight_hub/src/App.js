import React, { useState } from 'react';
import './App.css';

/**
 * Placeholder components for each step of the multi-step flow.
 */

function WelcomeStep({ onNext }) {
  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Welcome to CyberLegal Insight Hub</div>
        <h1 className="title">Holistic Digital & Legal Safety in One Flow</h1>
        <div className="description">
          Assess your cyber habits and legal awareness. Get your customized Digital Safety Index and actionable improvement plan.
        </div>
        <button className="btn btn-large" onClick={onNext}>
          Get Started
        </button>
      </div>
    </section>
  );
}

function QuizStep({ onNext, onBack }) {
  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Step 1: Cyber Behavior Quiz</div>
        <h2 className="title">Digital Hygiene Check</h2>
        <div className="description">[Quiz UI Placeholder]</div>
        <div className="step-actions">
          <button className="btn" onClick={onBack}>Back</button>
          <button className="btn btn-large" onClick={onNext}>Next</button>
        </div>
      </div>
    </section>
  );
}

function ContractUploadStep({ onNext, onBack }) {
  return (
    <section className="step-page">
      <div className="hero">
        <div className="subtitle">Step 2: Contract Upload</div>
        <h2 className="title">Analyze Your Contract</h2>
        <div className="description">[Contract Upload UI Placeholder]</div>
        <div className="step-actions">
          <button className="btn" onClick={onBack}>Back</button>
          <button className="btn btn-large" onClick={onNext}>Analyze/Skip</button>
        </div>
      </div>
    </section>
  );
}

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

// PUBLIC_INTERFACE
function App() {
  // 0: Welcome, 1: Quiz, 2: Contract Upload, 3: Results, 4: Thank you
  const [step, setStep] = useState(0);

  // Navigation functions
  const goNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const restart = () => setStep(0);

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
          {step === 0 && <WelcomeStep onNext={goNext} />}
          {step === 1 && <QuizStep onNext={goNext} onBack={goBack} />}
          {step === 2 && <ContractUploadStep onNext={goNext} onBack={goBack} />}
          {step === 3 && <ResultsDashboardStep onNext={goNext} onBack={goBack} />}
          {step === 4 && <ThankYouStep onRestart={restart} />}
        </div>
      </main>
    </div>
  );
}

export default App;