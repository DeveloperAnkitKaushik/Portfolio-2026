import { ImageResponse } from "next/og";
import { CONTACT } from "@/data/contact";

export const alt = "Ankit Kaushik — Full-Stack & Gen AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a1a1a1",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#22c55e",
              display: "flex",
            }}
          />
          Available for work
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            Ankit Kaushik
          </div>
          <div style={{ fontSize: 44, color: "#a1a1a1", marginTop: 12 }}>{CONTACT.role}</div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#a1a1a1" }}>
          AI Agents · RAG Pipelines · Next.js · Python
        </div>
      </div>
    ),
    size
  );
}
