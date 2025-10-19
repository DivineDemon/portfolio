declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.png" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare module "*.jpg" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare module "*.jpeg" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare module "*.gif" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare module "*.webp" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare type ProjectProps = {
  id: number;
  image: string | null;
  features: string;
  link: string;
  start_year: number;
  project_name: string;
  company_id: number;
  companies: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};

declare type TestimonialProps = {
  id: number;
  image: string | null;
  company: string;
  content: string;
  designation: string;
  client_name: string;
};

declare type CaseStudyProps = {
  id: number;
  project_id: number;
  title: string;
  description: string;
  challenge: string;
  results: string;
  onboarding_improved: string;
  retention_increase: string;
  time_spent_increase: string;
  research: string;
  architecture: string;
  wireframing: string;
  testing: string;
  design: string;
  tech_stack_urls: string;
  ceo_statement: string;
  conclusion: string;
  images: string | null;
  projects: {
    project_name: string;
    companies: {
      name: string;
      hq: string;
      founded: number;
      industry: string;
      revenue: string;
      size: string;
      ceo_name: string;
      ceo_title: string;
    };
  };
};