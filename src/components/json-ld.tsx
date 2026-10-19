import type { Schema } from "@/lib/schema";

interface JsonLdProps {
  data: Schema | Schema[];
}

const JsonLd = ({ data }: JsonLdProps) => (
  <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />
);

export default JsonLd;
