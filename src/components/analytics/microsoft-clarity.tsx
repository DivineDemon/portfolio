"use client";

import Script from "next/script";

type MicrosoftClarityProps = {
  projectId: string;
};

const MicrosoftClarity = ({ projectId }: MicrosoftClarityProps) => {
  return (
    <Script
      id="microsoft-clarity"
      src={`https://www.clarity.ms/tag/${projectId}`}
      strategy="afterInteractive"
    />
  );
};

export default MicrosoftClarity;
