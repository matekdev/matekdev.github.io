<script lang="ts">
	export let project: App.Project;
</script>

<a href={project.href} class="flex font-roboto p-4 hover:-translate-y-1 transition-all">
	<img
		src="/projects/thumbnails/{project.name.toLowerCase().replaceAll(' ', '_')}.jpg"
		alt={project.name}
		class="mr-2 rounded-lg w-[100px] h-[100px] aspect-square"
	/>
	<div class="flex flex-col justify-center">
		<p class="text-white text-xl font-medium">{project.name}</p>
		<p class="text-white">{project.description}</p>
		<p class="text-gray">{project.skills}</p>
	</div>
</a>
