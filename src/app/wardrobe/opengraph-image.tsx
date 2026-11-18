import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MADE Saint Private Wardrobe — A wardrobe around your life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Coded Private Wardrobe OG — upright wordmark, cream ground, brick accent. */
export default function WardrobeOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f0e8",
          color: "#1c1a17",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", fontStyle: "normal" }}>
            <span style={{ fontSize: 36, letterSpacing: "0.06em", fontStyle: "normal" }}>MADE</span>
            <span style={{ fontSize: 40, letterSpacing: "-0.02em", fontStyle: "normal" }}>Saint</span>
          </div>
          <span style={{ fontSize: 18, letterSpacing: "0.22em", color: "#B03236", textTransform: "uppercase" }}>
            Private Wardrobe
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
            A wardrobe around your life.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.45, color: "rgba(28,26,23,0.72)", maxWidth: 640 }}>
            Begin with a conversation about how you dress. Pieces are confirmed through enquiry and quotation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(28,26,23,0.15)",
            paddingTop: 28,
          }}
        >
          <span style={{ fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B03236" }}>
            Begin a conversation
          </span>
          <span style={{ fontSize: 16, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55 }}>
            madesaint.store/wardrobe
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
