"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

type MicrosoftClarityProps = {
  projectId: string;
};

const MicrosoftClarity = ({ projectId }: MicrosoftClarityProps) => {
  useEffect(() => {
    Clarity.init(projectId);
  }, [projectId]);

  return null;
};

export default MicrosoftClarity;
