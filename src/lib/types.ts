export type ProjectData = {
  id: string;
  title: string;
  type: "Company" | "Personal / Startup" | "Client";
  clientCompany: string;
  description: string;
  context: string;
  approach: string;
  system: string;
  outcome: string;
};
