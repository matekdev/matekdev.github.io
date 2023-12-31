<script lang="ts">
	export let project: App.Project;
</script>

<a href={project.href} class="flex py-4 font-roboto transition-all hover:-translate-y-1 md:p-4">
	<img
		src="/projects/thumbnails/{project.name.toLowerCase().replaceAll(' ', '_')}.jpg"
		alt={project.name}
		class="mr-2 aspect-square h-[100px] w-[100px] rounded-lg"
	/>
	<div class="flex flex-col justify-center">
		<p class="text-xl font-medium text-white">{project.name}</p>
		<p class="text-white">{project.description}</p>
		<p class="text-gray">{project.skills}</p>
	</div>
</a>
