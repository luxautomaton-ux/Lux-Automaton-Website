"use client";

import { useState } from "react";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

export interface VisualAssetItem {
  title: string;
  subtitle?: string;
  imageUrl: string;
  type?: "Overview Infographic" | "Worksheet PNG" | "Breakdown Card" | "Architecture Map" | string;
}

export interface ResourceDownloadItem {
  title: string;
  subtitle?: string;
  url: string;
  type?: "Interactive Planner" | "Printable Worksheet" | "PDF Kit" | string;
}

interface ArticleVisualAssetsDeckProps {
  heading?: string;
  subheading?: string;
  images?: VisualAssetItem[];
  downloads?: ResourceDownloadItem[];
}

export default function ArticleVisualAssetsDeck({
  heading = "Visual Assets, Infographics & Downloadable Worksheets",
  subheading = "Explore full-resolution architecture maps, overview infographics, and interactive worksheets included with this dispatch.",
  images = [],
  downloads = [],
}: ArticleVisualAssetsDeckProps) {
  const [activeImage, setActiveImage] = useState<VisualAssetItem | null>(null);
  const [activeDoc, setActiveDoc] = useState<ResourceDownloadItem | null>(null);

  if ((!images || images.length === 0) && (!downloads || downloads.length === 0)) {
    return null;
  }

  return (
    <section className="article-assets-section">
      <div className="assets-section-header">
        <span className="assets-badge">🎨 VISUAL ASSETS &amp; KITS GALLERY</span>
        <h3>{heading}</h3>
        {subheading && <p>{subheading}</p>}
      </div>

      {/* DOWNLOADABLE WORKSHEETS & PLANNERS */}
      {downloads.length > 0 && (
        <div className="downloads-deck-grid">
          {downloads.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="download-card">
              <div className="download-card-icon-badge">
                <span className="doc-icon">📥</span>
                <span className="doc-type">{item.type || "Downloadable Resource"}</span>
              </div>
              <h4>{item.title}</h4>
              {item.subtitle && <p>{item.subtitle}</p>}
              <div className="download-card-actions">
                <button
                  type="button"
                  className="assets-btn preview-doc-btn"
                  onClick={() => setActiveDoc(item)}
                >
                  👁️ Interactive Preview
                </button>
                <a
                  href={prefixPath(item.url)}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="assets-btn download-doc-btn"
                >
                  ⬇️ Save / Print Kit
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OVERVIEW PNG & INFOGRAPHIC IMAGE GALLERY */}
      {images.length > 0 && (
        <div className="images-gallery-grid">
          {images.map((img, idx) => (
            <div key={`${img.title}-${idx}`} className="image-card">
              <div
                className="image-thumbnail-wrap"
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={prefixPath(img.imageUrl)}
                  alt={img.title}
                  fill
                  className="gallery-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="image-hover-overlay">
                  <span>🔍 Expand Full Resolution</span>
                </div>
              </div>
              <div className="image-card-caption">
                <span className="image-tag">{img.type || "Overview Graphic"}</span>
                <h5>{img.title}</h5>
                {img.subtitle && <p>{img.subtitle}</p>}
                <div className="image-actions">
                  <button
                    type="button"
                    className="assets-btn view-img-btn"
                    onClick={() => setActiveImage(img)}
                  >
                    🔎 View Fullsize
                  </button>
                  <a
                    href={prefixPath(img.imageUrl)}
                    download
                    className="assets-btn save-img-btn"
                  >
                    ⬇️ Save PNG
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-content image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar">
              <div className="modal-title-group">
                <span className="modal-icon">🖼️</span>
                <div>
                  <h4>{activeImage.title}</h4>
                  <small>{activeImage.type || "High Resolution Image"}</small>
                </div>
              </div>
              <div className="modal-actions">
                <a
                  href={prefixPath(activeImage.imageUrl)}
                  download
                  className="assets-btn download-doc-btn"
                >
                  ⬇️ Download High-Res PNG
                </a>
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setActiveImage(null)}
                  aria-label="Close image lightbox"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-img-container">
              <Image
                src={prefixPath(activeImage.imageUrl)}
                alt={activeImage.title}
                fill
                className="modal-lightbox-img"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DOCUMENT PREVIEW MODAL */}
      {activeDoc && (
        <div className="modal-backdrop" onClick={() => setActiveDoc(null)}>
          <div className="modal-content doc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar">
              <div className="modal-title-group">
                <span className="modal-icon">📄</span>
                <div>
                  <h4>{activeDoc.title}</h4>
                  <small>{activeDoc.type || "Interactive Worksheet / Kit"}</small>
                </div>
              </div>
              <div className="modal-actions">
                <a
                  href={prefixPath(activeDoc.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="assets-btn preview-doc-btn"
                >
                  ↗ Open in New Tab
                </a>
                <a
                  href={prefixPath(activeDoc.url)}
                  download
                  className="assets-btn download-doc-btn"
                >
                  ⬇️ Download File
                </a>
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setActiveDoc(null)}
                  aria-label="Close document preview"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-doc-body">
              <iframe
                src={prefixPath(activeDoc.url)}
                title={`Document Preview - ${activeDoc.title}`}
                className="doc-iframe"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .article-assets-section {
          margin: 48px 0 24px;
          padding: 32px;
          background: linear-gradient(135deg, rgba(8, 14, 28, 0.95), rgba(15, 23, 42, 0.85));
          border: 1px solid rgba(67, 230, 255, 0.3);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }
        .assets-section-header {
          margin-bottom: 28px;
        }
        .assets-badge {
          font: 800 0.7rem 'JetBrains Mono', monospace;
          letter-spacing: 0.18em;
          color: #43e6ff;
          text-transform: uppercase;
        }
        .assets-section-header h3 {
          font: 850 1.7rem/1.2 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 6px 0 6px;
          letter-spacing: -0.03em;
        }
        .assets-section-header p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .downloads-deck-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 18px;
          margin-bottom: 32px;
        }
        .download-card {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(67, 230, 255, 0.25);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .download-card:hover {
          transform: translateY(-3px);
          border-color: #43e6ff;
        }
        .download-card-icon-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(67, 230, 255, 0.12);
          color: #43e6ff;
          padding: 4px 10px;
          border-radius: 6px;
          font: 800 0.68rem 'JetBrains Mono', monospace;
          margin-bottom: 12px;
          width: fit-content;
        }
        .download-card h4 {
          font: 800 1.2rem/1.3 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 0 0 6px;
        }
        .download-card p {
          color: #94a3b8;
          font-size: 0.85rem;
          line-height: 1.45;
          margin-bottom: 16px;
        }
        .download-card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }
        .images-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .image-card {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .image-card:hover {
          transform: translateY(-3px);
          border-color: rgba(67, 230, 255, 0.4);
        }
        .image-thumbnail-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          cursor: pointer;
          background: #090d1a;
          overflow: hidden;
        }
        :global(.gallery-img) {
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .image-thumbnail-wrap:hover :global(.gallery-img) {
          transform: scale(1.04);
        }
        .image-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(3, 7, 18, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .image-hover-overlay span {
          background: #43e6ff;
          color: #071019;
          font: 800 0.75rem 'Montserrat', sans-serif;
          padding: 8px 14px;
          border-radius: 8px;
        }
        .image-thumbnail-wrap:hover .image-hover-overlay {
          opacity: 1;
        }
        .image-card-caption {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .image-tag {
          font: 800 0.65rem 'JetBrains Mono', monospace;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .image-card-caption h5 {
          font: 800 1rem/1.3 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 0 0 4px;
        }
        .image-card-caption p {
          color: #94a3b8;
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 14px;
        }
        .image-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .assets-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 12px;
          border-radius: 8px;
          font: 800 0.76rem 'Montserrat', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
        .preview-doc-btn, .view-img-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .preview-doc-btn:hover, .view-img-btn:hover {
          background: rgba(67, 230, 255, 0.2);
          border-color: #43e6ff;
          color: #ffffff;
        }
        .download-doc-btn, .save-img-btn {
          background: #43e6ff;
          color: #071019;
        }
        .download-doc-btn:hover, .save-img-btn:hover {
          background: #8feeff;
          box-shadow: 0 0 16px rgba(67, 230, 255, 0.4);
        }

        /* MODALS */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.92);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 24px;
        }
        .modal-content {
          width: 100%;
          max-width: 1150px;
          height: 88vh;
          background: #090d1a;
          border: 1px solid rgba(67, 230, 255, 0.4);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 212, 255, 0.25);
        }
        .modal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .modal-icon {
          font-size: 1.5rem;
        }
        .modal-title-group h4 {
          font: 800 1.15rem 'Montserrat', sans-serif;
          color: #ffffff;
          margin: 0;
        }
        .modal-title-group small {
          color: #43e6ff;
          font: 700 0.75rem 'JetBrains Mono', monospace;
        }
        .modal-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .close-modal-btn {
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
        .close-modal-btn:hover {
          background: rgba(239, 68, 68, 0.8);
        }
        .modal-img-container {
          position: relative;
          flex: 1;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        :global(.modal-lightbox-img) {
          object-fit: contain !important;
        }
        .modal-doc-body {
          flex: 1;
          position: relative;
          background: #ffffff;
        }
        .doc-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </section>
  );
}
