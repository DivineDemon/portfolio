import { Dispatch, SetStateAction } from "react";
import { api } from "@/trpc/server";
import CaseStudy from "./case-study";

interface CaseStudyWrapperProps {
  open: boolean;
  projectId: number;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CaseStudyWrapper = async ({ open, projectId, onOpenChange }: CaseStudyWrapperProps) => {
  if (!open) return null;

  const caseStudyData = await api.caseStudy.getCaseStudyByProjectId({ projectId });

  return <CaseStudy open={open} onOpenChange={onOpenChange} caseStudyData={caseStudyData} />;
};

export default CaseStudyWrapper;
