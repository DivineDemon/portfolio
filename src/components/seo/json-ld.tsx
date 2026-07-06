import { safeJsonLdStringify } from "@/lib/json-ld";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json">{safeJsonLdStringify(data)}</script>
  );
}
