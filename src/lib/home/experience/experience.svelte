<script lang="ts">
	export let experience: App.Experience;

	function formatDate(date: string | undefined) {
		if (!date) return 'Present';
		return new Date(date + 'PST').toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}
</script>

<div class="flex flex-col">
	<div class="flex">
		<div class="flex flex-col">
			<a href={experience.href} class="transition-all hover:scale-105">
				<img
					src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.jpg"
					alt={experience.name}
					class="mr-2 h-[45px] min-h-[45px] w-[45px] min-w-[45px] rounded"
				/>
			</a>
			{#if experience.additionalRoles}
				<div class="mr-2 mt-2 flex h-full min-w-[45px] flex-col items-center opacity-70">
					<div class="h-full w-[1px] rounded-lg bg-gray" />
					<div class="mb-2 h-[3px] w-[9px] rounded-lg bg-gray" />
				</div>
			{/if}
		</div>
		<div>
			<a
				href={experience.href}
				class="text-xl font-medium text-blue transition-all hover:text-darkblue"
				>{experience.name}</a
			>
			<p class="text-white">{experience.subheading} • {experience.location}</p>
			{#if experience.startDate}
				<p class="text-gray">
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
				<p class="pt-1 text-gray"><span class="font-bold">Skills: </span>{experience.skills}</p>
			{/if}
			{#if experience.additionalRoles}
				{#each experience.additionalRoles as role}
					<div class="flex pt-1">
						<div class="pt-2">
							<p class="text-white">{role.subheading} • {role.location}</p>
							<p class="text-gray">
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
						<p class="pt-1 text-white">
							<span class="font-bold">Skills: </span>{role.skills}
						</p>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>
