import React, { useRef, useState } from "react";

/**
 * cyberlegal_insight_hub/src/ContractUpload.js
 * Secure contract upload or text-paste step for the CyberLegal Insight Hub.
 * Features:
 *  - Allows secure file upload (PDF/TXT) or direct text paste (textarea).
 *  - "Skip" option sends user to results dashboard.
 *  - Secure processing notice, basic UX validation, and error feedback.
 *  - Clear, branded, and accessible UI.
 */

// Simple file type check
function isValidFileType(file) {
  // Accept only plain text or PDF (optionally extendable later)
  return (
    file &&
    (file.type === "application/pdf" ||
      file.type === "text/plain" ||
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".txt"))
  );
}

/**
 * PUBLIC_INTERFACE
 * ContractUpload - main upload/paste UI, positive UX, kindly error-handling.
 * Props:
 *   onNext - called on successful submission or when skipping.
 *   onBack - return to previous step.
 */
function ContractUpload({ onNext, onBack }) {
  const fileInputRef = useRef();
  const [contractText, setContractText] = useState("");
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");
  const [textError, setTextError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle file select
  function handleFileChange(e) {
    setFileError("");
    setTextError("");
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    if (!isValidFileType(file)) {
      setFileError("Please choose a valid contract file (.pdf or .txt).");
      setFilename("");
      return;
    }
    setFilename(file.name);

    // Read & convert file to text for upload simulation (real app: API backend needed)
    const reader = new FileReader();
    reader.onload = function (evt) {
      setContractText(evt.target.result);
    };
    if (file.type === "application/pdf") {
      setFileError(
        "PDF upload is supported, but online demo will only accept plain text files for analysis."
      );
      reader.readAsArrayBuffer(file); // For backend transfer, not demo use.
    } else {
      reader.readAsText(file);
    }
  }

  // Validate contract (in demo, require any text; extend easily for length, etc.)
  function validateSubmission() {
    if (!contractText || contractText.trim().length < 20) {
      setTextError("Please paste your contract or upload a file (min 20 characters).");
      return false;
    }
    setTextError("");
    return true;
  }

  // On upload/paste submission
  function handleSubmit(e) {
    e.preventDefault();
    setFileError("");
    setTextError("");
    if (!validateSubmission()) return;

    setIsUploading(true);
    // Simulate basic client-side "secure" handling
    setTimeout(() => {
      setIsUploading(false);
      // In real implementation, send to backend/AI here.
      onNext && onNext(contractText, filename);
    }, 1100);
  }

  // On "skip" user advances directly
  function handleSkip() {
    onNext && onNext(null, null);
  }

  return (
    <section className="step-page" style={{ maxWidth: 560, margin: "0 auto" }}>
      <div
        className="hero"
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.017)",
          borderRadius: 10,
          padding: "32px 8px 40px 8px",
          boxShadow: "0 2px 22px 0 rgba(0,255,255,0.07)",
          position: "relative"
        }}
      >
        <div className="subtitle" style={{ fontWeight: 500, color: "var(--base-light)" }}>
          Step 2: Contract Upload
        </div>
        <h2 className="title" style={{ fontSize: "2.15rem", margin: 0, marginBottom: 8 }}>
          Analyze Your Contract
        </h2>
        <div
          className="description"
          style={{
            marginBottom: 24,
            fontWeight: 400,
            color: "var(--text-secondary)",
            textAlign: "center"
          }}
        >
          Upload or paste the terms of a contract, digital policy, or agreement.<br />
          We'll securely process it locally to assess risks and suggest improvements.<br />
        </div>

        <div
          style={{
            border: "1.5px solid var(--border-color)",
            borderRadius: 10,
            padding: "18px 14px 12px 14px",
            marginBottom: 10,
            background: "rgba(0,255,255,0.035)"
          }}
        >
          <b
            style={{
              color: "#00ffff",
              display: "inline-block",
              fontWeight: 500,
              fontSize: "1.03rem",
              marginBottom: 4
            }}
          >
            Secure Processing Notice
          </b>
          <div style={{ fontSize: "1.01rem", color: "var(--text-secondary)" }}>
            Your contract is processed securely in your browser (never leaves your device).
            <br />
            <span style={{ fontSize: "0.95em", color: "#31ffea" }}>
              For real legal analysis, advanced AI runs on Kavia’s secure servers.
            </span>
          </div>
        </div>

        <form
          style={{
            width: "100%",
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 13
          }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label
            style={{ fontWeight: 500, marginBottom: 1, fontSize: "1rem", color: "#FFFFFF" }}
            htmlFor="contract-file"
          >
            <span>Upload file (.pdf, .txt):</span>
          </label>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 2 }}>
            <input
              id="contract-file"
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,text/plain,application/pdf"
              style={{
                color: "#c9edff",
                border: "none",
                fontSize: "1rem",
                padding: "6px",
                minWidth: 180
              }}
              onChange={handleFileChange}
              disabled={isUploading}
              title="Select a .pdf or .txt file"
            />
            {filename && !fileError && (
              <span style={{ color: "#b7fbeb", fontSize: "0.97rem" }}>{filename}</span>
            )}
          </div>
          {fileError && (
            <div style={{ color: "#ff6b6b", marginTop: 0, fontSize: "0.99rem" }}>{fileError}</div>
          )}

          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              marginTop: 6,
              fontSize: "1rem",
              color: "#FFFFFF"
            }}
            htmlFor="contract-text"
          >
            <span>...Or paste contract text:</span>
          </label>
          <textarea
            id="contract-text"
            rows={9}
            placeholder="Paste contract or policy terms here (min 20 characters)..."
            value={contractText}
            onChange={(e) => {
              setContractText(e.target.value);
              setFilename("");
              setTextError("");
            }}
            style={{
              width: "100%",
              minHeight: 140,
              fontSize: "1.08rem",
              padding: "12px",
              borderRadius: 6,
              border: "1.5px solid var(--border-color)",
              background: "rgba(0,255,255,0.065)",
              color: "#fff",
              marginBottom: 2,
              resize: "vertical",
              opacity: isUploading ? 0.7 : 1
            }}
            disabled={isUploading}
            autoFocus
            spellCheck
            aria-label="Paste contract text"
          />
          {textError && (
            <div style={{ color: "#ff6b6b", marginBottom: 3, fontSize: "0.99rem" }}>{textError}</div>
          )}

          <div className="step-actions" style={{ marginTop: 25 }}>
            <button
              className="btn"
              type="button"
              onClick={onBack}
              style={{ minWidth: 86 }}
              disabled={isUploading}
            >
              Back
            </button>
            <button
              className="btn btn-large"
              type="submit"
              style={{
                minWidth: 105,
                background: !contractText
                  ? "var(--border-color)"
                  : "var(--base-light)",
                color: !contractText ? "#fff" : "#001136"
              }}
              disabled={isUploading}
            >
              {isUploading ? "Analyzing..." : "Analyze Contract"}
            </button>
            <button
              className="btn"
              type="button"
              onClick={handleSkip}
              style={{
                minWidth: 99,
                background: "#232e3b",
                color: "#adabbc",
                border: "1px solid rgb(39,47,66,0.3)"
              }}
              disabled={isUploading}
            >
              Skip
            </button>
          </div>
        </form>
        {isUploading && (
          <div style={{ textAlign: "center", color: "#00ffff", marginTop: 22, fontSize: "1.1rem" }}>
            <span>Processing your contract securely...</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContractUpload;
