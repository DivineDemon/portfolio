import { Github } from "lucide-react";
import Link from "next/link";

export function RepositoryLink({ repositoryUrl }: { repositoryUrl: string }) {
  if (!repositoryUrl?.trim()) return null;

  return (
    <section className="p-5">
      <div className="flex items-center gap-2.5">
        <Github className="size-4 shrink-0 text-muted-foreground" />
        <Link
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-blue-300 hover:underline"
        >
          View source code
        </Link>
      </div>
    </section>
  );
}
