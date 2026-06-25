import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DemoCta({ demoUrl }: { demoUrl: string }) {
  if (!demoUrl?.trim()) return null;

  return (
    <section className="border-b p-5">
      <Button asChild variant="outline" className="font-mono">
        <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
          View live project
          <ExternalLink className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
