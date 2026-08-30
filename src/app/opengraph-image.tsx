import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = "VARA Systems — Business Systems & Workflow Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Latin only: the OG renderer has no Thai font available, so the
 * Thai headline stays on the page itself.
 */
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
          backgroundColor: "#F5F3EE",
          color: "#111111",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "2px solid #111111",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              letterSpacing: "0.14em",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            {site.wordmark}
            <span style={{ fontSize: "14px", color: "#62615D" }}>
              {site.wordmarkSuffix}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.16em",
              color: "#62615D",
              textTransform: "uppercase",
            }}
          >
            Business Systems
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "68px",
              lineHeight: 1.15,
              maxWidth: "900px",
              letterSpacing: "-0.02em",
            }}
          >
            Turn the way your team works into a system it can grow with.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #D7D4CC",
            paddingTop: "28px",
            fontSize: "22px",
            color: "#62615D",
          }}
        >
          <span>Workflow · Automation · Internal Tools · AI Integration</span>
          <span style={{ color: "#173A5E" }}>varasystems.co.th</span>
        </div>
      </div>
    ),
    size,
  );
}
