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
		<div class="mr-3 flex flex-col items-center">
			<a href={experience.href} class="transition-all hover:scale-105">
				<img
					src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.jpg"
					alt={experience.name}
					class="h-[48px] min-h-[48px] w-[48px] min-w-[48px] rounded-md border border-white/10 object-cover"
				/>
			</a>
			{#if experience.additionalRoles}
				<div class="mt-3 flex flex-1 flex-col items-center opacity-50">
					<div class="min-h-20 flex-1 border-l border-dashed border-white/20"></div>
					<div class="mb-1 h-[3px] w-[10px] rounded-full bg-white/25"></div>
				</div>
			{/if}
		</div>
		<div class="min-w-0 flex-1">
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
				<div class="mt-5 flex flex-col gap-5">
					{#each experience.additionalRoles as role}
						<div>
							<p class="text-gray">{role.subheading} • {role.location}</p>
							<p class="pt-1 text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
								{formatDate(role.startDate)} - {formatDate(role.endDate)}
							</p>
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
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</article>
