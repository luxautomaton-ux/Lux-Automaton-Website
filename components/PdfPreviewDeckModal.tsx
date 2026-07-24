"use client";

import { useState } from "react";
import { prefixPath } from "@/lib/prefix";

export interface PdfResourceItem {
  title: string;
  subtitle?: string;
  pdfUrl: string;
  type?: "Participant Workbook" | "Facilitator Deck" | "Full Guide" | "Planner" | "Worksheet" | string;
  size?: string;
}

interface PdfPreviewDeckProps {
  heading?: string;
  subheading?: string;
  resources: PdfResourceItem[];
}

export default function PdfPreviewDeckModal({
  heading = "Workshop Resources & PDF Downloads",
  subheading = "Preview interactive workbooks, facilitator decks, and full guides directly or download them for offline use.",
  resources,
}: PdfPreviewDeckProps) {
  const [activePreview, setActivePreview] = useState<PdfResourceItem | null>(null);

  if (!resources || resources.length === 0) return null;

  return (
    <div className="pdf-deck-container">
      <div className="pdf-deck-header">
        <span className="pdf-deck-label">📄 PDF DOCUMENTATION &amp; KITS</span>
        <h3 className="pdf-deck-title">{heading}</h3>
        {subheading && <p className="pdf-deck-subheading">{subheading}</p>}
      </div>

      <div className="pdf-card-grid">
        {resources.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="pdf-card">
            <div className="pdf-card-badge">
              <span className="pdf-icon">📑</span>
              <span className="pdf-type-text">{item.type || "PDF Resource"}</span>
            </div>

            <h4 className="pdf-card-name">{item.title}</h4>
            {item.subtitle && <p className="pdf-card-sub">{item.subtitle}</p>}
            {item.size && <span className="pdf-card-meta">File size: {item.size}</span>}

            <div className="pdf-card-actions">
              <button
                type="button"
                className="pdf-btn preview-btn"
                onClick={() => setActivePreview(item)}
              >
                👁️ Preview PDF
              </button>
              <a
                href={prefixPath(item.pdfUrl)}
                download
                className="pdf-btn download-btn"
              >
                ⬇️ Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN PDF INTERACTIVE PREVIEW MODAL */}
      {activePreview && (
        <div className="pdf-modal-backdrop" onClick={() => setActivePreview(null)}>
          <div className="pdf-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-bar">
              <div className="pdf-modal-title-group">
                <span className="pdf-modal-icon">📄</span>
                <div>
                  <h4>{activePreview.title}</h4>
                  <small>{activePreview.type || "PDF Document"} · Interactive Preview</small>
                </div>
              </div>

              <div className="pdf-modal-controls">
                <a
                  href={prefixPath(activePreview.pdfUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="pdf-modal-link-btn"
                >
                  ↗ Open in New Tab
                </a>
                <a
                  href={prefixPath(activePreview.pdfUrl)}
                  download
                  className="pdf-modal-download-btn"
                >
                  ⬇️ Download PDF
                </a>
                <button
                  type="button"
                  className="pdf-modal-close-btn"
                  onClick={() => setActivePreview(null)}
                  aria-label="Close PDF Preview"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="pdf-modal-body">
              <iframe
                src={`${prefixPath(activePreview.pdfUrl)}#toolbar=1&view=FitH`}
                title={`PDF Preview - ${activePreview.title}`}
                className="pdf-iframe"
              />
              <div className="pdf-iframe-fallback">
                <p>If the PDF does not display automatically in your browser:</p>
                <a
                  href={prefixPath(activePreview.pdfUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="pdf-modal-download-btn"
                >
                  Open PDF Document Directly ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pdf-deck-container {
          margin-top: 36px;
          padding: 28px;
          background: rgba(8, 12, 24, 0.75);
          border: 1px solid rgba(67, 230, 255, 0.22);
          border-radius: 20px;
          backdrop-filter: blur(16px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
        }
        .pdf-deck-header {
          margin-bottom: 24px;
        }
        .pdf-deck-label {
          font: 800 0.7rem 'JetBrains Mono', monospace;
          letter-spacing: 0.16em;
          color: #43e6ff;
          text-transform: uppercase;
        }
        .pdf-deck-title {
          font: 850 1.6rem/1.2 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 6px 0 4px;
          letter-spacing: -0.03em;
        }
        .pdf-deck-subheading {
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .pdf-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }
        .pdf-card {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .pdf-card:hover {
          transform: translateY(-3px);
          border-color: rgba(67, 230, 255, 0.4);
        }
        .pdf-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(67, 230, 255, 0.12);
          border: 1px solid rgba(67, 230, 255, 0.25);
          color: #43e6ff;
          padding: 4px 10px;
          border-radius: 6px;
          font: 800 0.68rem 'JetBrains Mono', monospace;
          text-transform: uppercase;
          margin-bottom: 12px;
          width: fit-content;
        }
        .pdf-card-name {
          font: 800 1.15rem/1.3 'Montserrat', sans-serif;
          color: #f8fafc;
          margin: 0 0 6px;
        }
        .pdf-card-sub {
          color: #94a3b8;
          font-size: 0.84rem;
          line-height: 1.45;
          margin-bottom: 12px;
        }
        .pdf-card-meta {
          color: #64748b;
          font: 700 0.72rem 'JetBrains Mono', monospace;
          margin-bottom: 16px;
        }
        .pdf-card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }
        .pdf-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 8px;
          font: 800 0.78rem 'Montserrat', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
        .preview-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .preview-btn:hover {
          background: rgba(67, 230, 255, 0.2);
          border-color: #43e6ff;
          color: #ffffff;
        }
        .download-btn {
          background: #43e6ff;
          color: #071019 !important;
          -webkit-text-fill-color: #071019;
        }
        .download-btn:hover {
          background: #8feeff;
          color: #071019 !important;
          -webkit-text-fill-color: #071019;
          box-shadow: 0 0 16px rgba(67, 230, 255, 0.4);
        }

        /* MODAL STYLES */
        .pdf-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 24px;
        }
        .pdf-modal-window {
          width: 100%;
          max-width: 1100px;
          height: 88vh;
          background: #090d1a;
          border: 1px solid rgba(67, 230, 255, 0.4);
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 212, 255, 0.25);
        }
        .pdf-modal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .pdf-modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pdf-modal-icon {
          font-size: 1.5rem;
        }
        .pdf-modal-title-group h4 {
          font: 800 1.1rem 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 0;
        }
        .pdf-modal-title-group small {
          color: #43e6ff;
          font: 700 0.75rem 'JetBrains Mono', monospace;
        }
        .pdf-modal-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pdf-modal-link-btn,
        .pdf-modal-download-btn {
          padding: 8px 14px;
          border-radius: 8px;
          font: 800 0.78rem 'Montserrat', sans-serif;
          text-decoration: none;
        }
        .pdf-modal-link-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .pdf-modal-download-btn {
          background: #43e6ff;
          color: #071019 !important;
          -webkit-text-fill-color: #071019;
        }
        .pdf-modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #ffffff;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pdf-modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.8);
        }
        .pdf-modal-body {
          flex: 1;
          position: relative;
          background: #020617;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .pdf-iframe-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}
