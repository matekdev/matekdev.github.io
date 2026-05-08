<script lang="ts">
	let { experience }: { experience: App.Experience } = $props();

	function formatDate(date: string | undefined) {
		if (!date) return 'Present';
		return new Date(date + 'T00:00:00').toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}

	function getSkills(skills: string | undefined) {
		return skills ? skills.split(',').map((skill) => skill.trim()) : [];
	}
</script>

<article
	class="group flex flex-col rounded-md border border-white/10 bg-[#171719]/80 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:bg-[#1d1d21]/85"
>
	<div class="flex">
		<div class="flex flex-col">
			<a href={experience.href} class="transition-all hover:scale-105">
				<img
					src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.jpg"
					alt={experience.name}
					class="mr-3 h-[48px] min-h-[48px] w-[48px] min-w-[48px] rounded-md border border-white/10 object-cover"
				/>
			</a>
			{#if experience.additionalRoles}
				<div class="mr-3 mt-2 flex h-full min-w-[48px] flex-col items-center opacity-50">
					<div class="h-full w-[1px] rounded-lg bg-gray"></div>
					<div class="mb-2 h-[3px] w-[9px] rounded-lg bg-gray"></div>
				</div>
			{/if}
		</div>
		<div>
			<a href={experience.href} class="text-xl font-bold text-white transition-all hover:text-blue"
				>{experience.name}</a
			>
			<p class="text-gray">{experience.subheading} • {experience.location}</p>
			{#if experience.startDate}
				<p class="pt-1 text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
					{formatDate(experience.startDate)} - {formatDate(experience.endDate)}
				</p>
			{/if}
			{#if experience.accomplishments}
				<div class="pt-1 text-gray">
					{#each experience.accomplishments as accomplishment}
						<p>• {accomplishment}</p>
					{/each}
				</div>
			{/if}
			{#if experience.skills}
				<div class="flex flex-wrap gap-2 pt-3">
					{#each getSkills(experience.skills) as skill}
						<span
							class="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-bluegray"
							>{skill}</span
						>
					{/each}
				</div>
			{/if}
			{#if experience.additionalRoles}
				{#each experience.additionalRoles as role}
					<div class="flex pt-1">
						<div class="pt-2">
							<p class="text-gray">{role.subheading} • {role.location}</p>
							<p class="pt-1 text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
								{formatDate(role.startDate)} - {formatDate(role.endDate)}
							</p>
						</div>
					</div>
					{#if role.accomplishments}
						<div class="pt-1 text-white">
							{#each role.accomplishments as accomplishment}
								<p>• {accomplishment}</p>
							{/each}
						</div>
					{/if}
					{#if role.skills}
						<div class="flex flex-wrap gap-2 pt-3">
							{#each getSkills(role.skills) as skill}
								<span
									class="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-bluegray"
									>{skill}</span
								>
							{/each}
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</article>
