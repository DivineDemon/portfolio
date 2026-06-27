"use client";

import Script from "next/script";

type B2BVisitorPixelProps = {
  scriptUrl: string;
  provider?: string;
};

const B2BVisitorPixel = ({ scriptUrl, provider }: B2BVisitorPixelProps) => {
  return (
    <Script
      id={`b2b-visitor-pixel${provider ? `-${provider}` : ""}`}
      src={scriptUrl}
      strategy="afterInteractive"
    />
  );
};

export default B2BVisitorPixel;
