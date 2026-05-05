import React from "react";
import GlassLinkCanvas from "./components/GlassLinkCanvas.jsx";

export default function App() {
  return (
    <div className="app" aria-label="RDisseny Linker">
      <GlassLinkCanvas
        background="#FFE7C8"
        autoFills={14}  // más bolitas decorativas
        nodes={[
          { id: "behance",   r: 52, img: "logos/Behance_icon.webp",    url: "https://www.behance.net/" },
          { id: "twitter",   r: 48, img: "logos/Twitter_icon.webp",    url: "https://twitter.com/" },
          { id: "tiktok",    r: 48, img: "logos/TikTok_icon.webp",     url: "https://www.tiktok.com/" },
          { id: "instagram", r: 48, img: "logos/Instagram_icon.webp",  url: "https://www.instagram.com/" },
          { id: "profile",   r: 86, img: "Ramon_Bartomeu_photo.jpg",   url: null, heavy: true },
        ]}
      />

      <header className="hero">
        <div className="text-block">
          <h1 className="title">RDisseny</h1>
          <p className="subtitle">Web / Graphic Designer</p>
        </div>
      </header>
    </div>
  );
}
