<script lang="ts">
	import { page } from '$app/stores';
	import FlyIn from '$lib/components/FlyIn.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Section from '$lib/components/Section.svelte';
	import YoutubeMusic from '$lib/components/YoutubeMusic.svelte';
	import Icon from '@iconify/svelte';

	interface Link {
		icon: string;
		text: string;
		href: string;
	}

	const links: Link[] = [
		{ icon: 'ic:round-terminal', text: 'Home', href: '/' },
		{ icon: 'material-symbols:deployed-code-outline', text: 'Projects', href: '/projects/' },
		{ icon: 'ic:round-newspaper', text: 'Blog', href: '/blog/' }
	];

	const notFound = $derived($page.status === 404);
</script>

<PageTitle title="Matthew Zegar | {notFound ? 'Not Found' : 'Error'}" />

<FlyIn>
	<Section>
		<div
			class="relative overflow-hidden rounded-md border border-white/10 bg-[#171719]/95 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.3)] md:p-8"
		>
			<div
				class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(82,146,255,0.2),transparent_60%)]"
			></div>
			<div
				class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
			></div>

			<div class="relative">
				<span
					class="rounded-md border border-blue/40 bg-[#0d0d0d]/70 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue"
					>Error {$page.status}</span
				>
				<h1 class="pt-6 text-5xl font-bold leading-tight text-white md:text-7xl">Huh?</h1>
				<p class="max-w-2xl pt-3 text-lg leading-7 text-gray">
					{notFound
						? "This page doesn't exist. It might have moved, or the link is wrong."
						: 'Something went wrong loading this page.'}
				</p>

				<div class="flex flex-wrap gap-2 pt-6">
					{#each links as link}
						<a
							href={link.href}
							class="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 font-medium text-gray transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:text-white"
						>
							<Icon icon={link.icon} class="text-lg" />
							{link.text}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<p class="pt-8 text-sm font-medium uppercase tracking-[0.08em] text-bluegray">
			While you're here
		</p>
		<YoutubeMusic src="KnrGMHhnqrw" />
	</Section>
</FlyIn>
