<script lang="ts">
	export let experience: App.Experience;

	function formatDate(date: string | undefined) {
		if (!date) return 'Present';
		return new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}
</script>

<div class="flex flex-col">
	<div class="flex">
		<div class="flex flex-col">
			<a href={experience.href} class="hover:scale-105 transition-all">
				<img
					src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.jpg"
					alt={experience.name}
					class="min-h-[45px] min-w-[45px] h-[45px] w-[45px] rounded mr-2"
				/>
			</a>
			{#if experience.additionalRoles}
				<div class="h-full min-w-[45px] mr-2 mt-2 flex flex-col items-center opacity-70">
					<div class="h-full w-[1px] bg-gray rounded-lg" />
					<div class="w-[9px] h-[3px] mb-2 bg-gray rounded-lg" />
				</div>
			{/if}
		</div>
		<div>
			<a
				href={experience.href}
				class="text-xl font-medium transition-all hover:text-darkblue text-blue"
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
				<p class="text-gray pt-1"><span class="font-bold">Skills: </span>{experience.skills}</p>
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
						<p class="text-white pt-1">
							<span class="font-bold">Skills: </span>{role.skills}
						</p>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>
