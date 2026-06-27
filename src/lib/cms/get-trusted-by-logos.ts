import { cacheLife, cacheTag } from "next/cache";
import { filterPublicClients } from "@/lib/clients";
import { getClients } from "@/lib/cms/get-clients";
import { getPublishedProjects } from "@/lib/cms/get-published-projects";
import { getPublishedWorkflows } from "@/lib/cms/get-published-workflows";

export type TrustedByLogo = {
  name: string;
  image: string;
  url?: string;
};

export async function getTrustedByLogos(): Promise<TrustedByLogo[]> {
  "use cache";
  cacheTag("cms:clients", "cms:projects", "cms:workflows");
  cacheLife("hours");

  const [clients, projects, workflows] = await Promise.all([
    filterPublicClients(await getClients()),
    getPublishedProjects(),
    getPublishedWorkflows(),
  ]);

  const logos: TrustedByLogo[] = [];
  const seen = new Set<string>();

  for (const client of clients) {
    const image = client.logo?.trim() || client.image?.trim();
    const name = client.company?.trim() || client.clientName.trim();
    if (!image || !name) continue;

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    logos.push({
      name,
      image,
      url: client.companyUrl?.trim() || undefined,
    });
  }

  for (const project of projects) {
    if (!project.clientId || !project.coverImage) continue;
    const client = clients.find((item) => item.id === project.clientId);
    const name = client?.company?.trim() || project.industry?.trim();
    if (!name) continue;

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    logos.push({
      name,
      image: project.coverImage,
      url: client?.companyUrl?.trim() || undefined,
    });
  }

  for (const workflow of workflows) {
    if (!workflow.clientId || !workflow.coverImage) continue;
    const client = clients.find((item) => item.id === workflow.clientId);
    const name = client?.company?.trim() || workflow.title.trim();
    if (!name) continue;

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    logos.push({
      name,
      image: workflow.coverImage,
      url: client?.companyUrl?.trim() || undefined,
    });
  }

  return logos.slice(0, 12);
}
