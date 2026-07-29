"use client";

import { useState } from "react";

type SocialShareProps = { title: string; text?: string; className?: string };

export default function SocialShare({ title, text = "", className = "" }: SocialShareProps) {
  const [message, setMessage] = useState("");
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  async function share() {
    if (navigator.share) {
      await navigator.share({ title, text, url: shareUrl });
      return;
    }
    await copyLink();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setMessage("Link copied");
    window.setTimeout(() => setMessage(""), 1800);
  }

  function open(network: "x" | "facebook") {
    const url = network === "x"
      ? `https://x.com/intent/post?text=${encodeURIComponent(`${title} ${shareUrl}`)}`
      : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=640,height=540");
  }

  return <div className={`lux-social-share ${className}`} aria-label="Share this page">
    <button type="button" onClick={share}>↗ Share</button>
    <button type="button" onClick={copyLink}>⧉ Copy link</button>
    <button type="button" onClick={() => open("x")}>𝕏</button>
    <button type="button" onClick={() => open("facebook")}>f</button>
    {message && <span role="status">{message}</span>}
  </div>;
}
