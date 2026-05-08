<script lang="ts">
	import { resolveProjectThumbnailPath } from '$lib/Utils';
	import Section from '$lib/components/Section.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Icon from '@iconify/svelte';
	import { ProjectData } from './projectdata';

	let { page }: { page: { metadata: App.ProjectPage; content: any } } = $props();
	let Content = $derived(page.content);

	const project = $derived(ProjectData.find((item) => item.name === page.metadata.name));
	const description = $derived(project?.description ?? page.metadata.skills ?? '');
	const skillList = $derived(
		page.metadata.skills ? page.metadata.skills.split(',').map((skill) => skill.trim()) : []
	);
</script>

<Section>
	<article class="w-full font-roboto">
		<div
			class="mb-6 rounded-md border border-white/10 bg-[#171719]/80 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] md:p-7"
		>
			<div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
				<div class="min-w-0">
					<div class="flex flex-wrap items-center gap-3">
						<h1 class="text-4xl font-bold leading-tight text-white md:text-5xl">
							{page.metadata.name}
						</h1>
						{#if page.metadata.git}
							<Tooltip text="GitHub">
								<a
									href={page.metadata.git}
									class="inline-flex rounded-md border border-white/10 bg-white/[0.06] p-2 text-2xl text-blue transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-white"
									><Icon icon="mdi:github" /></a
								>
							</Tooltip>
						{/if}
					</div>
					<p class="max-w-3xl pt-3 text-lg leading-7 text-gray">{description}</p>
					<div class="flex flex-wrap gap-2 pt-5">
						{#each skillList as skill}
							<span
								class="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-bluegray"
								>{skill}</span
							>
						{/each}
						{#if project?.prize}
							<span
								class="inline-flex items-center gap-1 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-sm font-bold text-yellow"
							>
								<Icon icon="material-symbols:trophy" class="text-lg" />
								${project.prize} USD
							</span>
						{/if}
					</div>
				</div>
				<div
					class="flex h-28 w-28 min-w-28 overflow-hidden rounded-md border border-white/10 bg-[#111113] shadow-xl md:h-36 md:w-36 md:min-w-36"
				>
					<img
						src={resolveProjectThumbnailPath(page.metadata.name)}
						alt={page.metadata.name}
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>
		<div class="flex w-full flex-col justify-center">
			<div
				class="prose prose-lg prose-invert prose-headings:font-bold prose-headings:text-white prose-p:leading-8 prose-a:text-blue prose-a:no-underline hover:prose-a:text-white hover:prose-a:transition-all prose-img:mx-auto prose-img:my-6 prose-img:rounded-md prose-img:border prose-img:border-white/10 prose-img:bg-[#111113] prose-img:shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
			>
				<Content />
			</div>
		</div>
	</article>
</Section>
