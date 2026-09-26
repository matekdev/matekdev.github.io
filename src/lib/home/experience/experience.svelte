<script lang="ts">
	let { experience }: { experience: App.Experience } = $props();

	type RoleDetails = Pick<
		App.Experience,
		'subheading' | 'location' | 'startDate' | 'endDate' | 'skills' | 'accomplishments'
	>;

	const roles: RoleDetails[] = $derived([experience, ...(experience.additionalRoles ?? [])]);

	function formatDate(date: string | undefined) {
		if (!date) return 'Present';
		return new Date(date + 'T00:00:00').toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}

	function getSkills(skills: string | undefined) {
		return skills ? skills.split(',').map((skill) => skill.trim()) : [];
	}
</script>

{#snippet roleDetails(role: RoleDetails)}
	<p class="text-gray">{role.subheading} • {role.location}</p>
	{#if role.startDate}
		<p class="pt-1 text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
			{formatDate(role.startDate)} - {formatDate(role.endDate)}
		</p>
	{/if}
	{#if role.accomplishments}
		<div class="pt-1 text-gray">
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
{/snippet}

<article
	class="group flex flex-col rounded-md border border-white/10 bg-[#171719]/80 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:bg-[#1d1d21]/85"
>
	<div class="flex">
		<a href={experience.href} class="mr-3 self-start transition-all hover:scale-105">
			<img
				src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.webp"
				alt={experience.name}
				class="h-[48px] min-h-[48px] w-[48px] min-w-[48px] rounded-md border border-white/10 object-cover"
			/>
		</a>
		<div class="min-w-0 flex-1">
			<a href={experience.href} class="text-xl font-bold text-white transition-all hover:text-blue"
				>{experience.name}</a
			>
			{#if roles.length > 1}
				<ol class="flex flex-col gap-5 pt-2">
					{#each roles as role, index}
						{@const current = !role.endDate}
						<li class="relative pl-6">
							{#if index < roles.length - 1}
								<span class="absolute -bottom-5 left-[5px] top-4 w-px bg-white/15"></span>
							{/if}
							<span class="absolute left-0 top-[6px] flex h-[11px] w-[11px]">
								{#if current}
									<span
										class="absolute h-full w-full rounded-full bg-blue/50 motion-safe:animate-ping"
									></span>
								{/if}
								<span
									class="relative h-[11px] w-[11px] rounded-full border-2 {current
										? 'border-blue bg-blue'
										: 'border-bluegray bg-[#171719]'}"
								></span>
							</span>
							{@render roleDetails(role)}
						</li>
					{/each}
				</ol>
			{:else}
				{@render roleDetails(experience)}
			{/if}
		</div>
	</div>
</article>
