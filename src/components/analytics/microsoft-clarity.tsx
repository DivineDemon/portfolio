"use client";

import { useEffect } from "react";
import { deferUntilIdle } from "@/lib/analytics/defer-until-idle";

type MicrosoftClarityProps = {
  projectId: string;
};

const MicrosoftClarity = ({ projectId }: MicrosoftClarityProps) => {
  useEffect(() => {
    deferUntilIdle(() => {
      void import("@microsoft/clarity").then(({ default: Clarity }) => {
        Clarity.init(projectId);
      });
    });
  }, [projectId]);

  return null;
};

export default MicrosoftClarity;
