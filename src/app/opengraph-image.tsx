import { ImageResponse } from "next/og";

export const alt =
  "Pranav Yadav — Full Stack Engineer. LLM pipelines to pixel-tight frontends.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori renders in isolation and cannot read CSS custom properties, so these
// mirror the --brand-* tokens in globals.css. Keep them in sync.
const BRAND = {
  accent: "#355794",
  ink: "#0a0a0a",
  muted: "#6b7280",
  divider: "#e9ebee",
  surface: "#ffffff",
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: BRAND.surface,
          backgroundImage: `radial-gradient(720px 360px at 12% 8%, rgba(53, 87, 148, 0.10), transparent 60%), radial-gradient(600px 300px at 92% 18%, rgba(53, 87, 148, 0.07), transparent 65%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: BRAND.accent,
            fontSize: 26,
            letterSpacing: "0.18em",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: BRAND.accent,
            }}
          />
          AI · AUTOMATION · INTEGRATIONS · 9 YRS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: BRAND.ink,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Pranav Yadav
          </div>
          <div
            style={{
              fontSize: 38,
              color: BRAND.muted,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            I ship products end-to-end — from LLM pipelines to pixel-tight
            frontends.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${BRAND.divider}`,
            paddingTop: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: BRAND.accent,
              color: BRAND.surface,
              borderRadius: 999,
              padding: "14px 32px",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            TOP 3% · TOPTAL
          </div>
          <div style={{ fontSize: 30, color: BRAND.muted }}>
            pranavyadav.dev
          </div>
        </div>
      </div>
    ),
    size
  );
}
