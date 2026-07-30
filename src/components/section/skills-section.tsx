"use client";

import { DATA } from "@/data/resume";

export default function SkillsSection() {
	return (
		<div className="flex flex-wrap gap-2">
			{DATA.skills.map((skill) => {
				const IconComponent = skill.icon;
				return (
					<div
						key={skill.name}
						className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2"
					>
						{IconComponent && (
							<IconComponent className="size-4 rounded overflow-hidden object-contain" />
						)}
						<span className="text-foreground text-sm font-medium">
							{skill.name}
						</span>
					</div>
				);
			})}
		</div>
	);
}
