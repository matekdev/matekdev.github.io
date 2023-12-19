<script lang="ts">
	export let experience: App.Experience;

	function formatDate(date: string | undefined) {
		if (!date) return 'Present';
		return new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}
</script>

<div class="flex flex-col">
	<div class="flex">
		<img
			src="/home/experiences/{experience.name.toLowerCase().replaceAll(' ', '_')}.jpg"
			alt={experience.name}
			class="h-[45px] w-[45px] rounded mr-2"
		/>
		<div>
			<a
				href={experience.href}
				class="text-xl font-medium transition-all hover:text-darkblue text-blue"
				>{experience.name}</a
			>
			<p class="text-gray">{experience.subheading} • {experience.location}</p>
			{#if experience.startDate}
				<p class="text-gray">
					{formatDate(experience.startDate)} - {formatDate(experience.endDate)}
				</p>
			{/if}
		</div>
	</div>
	{#if experience.accomplishments}
		<div class="pt-1 text-white">
			{#each experience.accomplishments as accomplishment}
				<li>{accomplishment}</li>
			{/each}
		</div>
	{/if}
	{#if experience.skills}
		<p class="text-white pt-1"><span class="font-bold">Skills: </span>{experience.skills}</p>
	{/if}
</div>
