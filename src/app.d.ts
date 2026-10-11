// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Experience {
			name: string;
			subheading: string;
			location: string;
			startDate?: string;
			endDate?: string;
			href: string;
			skills?: string;
			accomplishments?: string[];
			additionalRoles?: Role[];
		}

		interface Role {
			subheading: string;
			location: string;
			startDate: string;
			endDate: string;
			skills?: string;
			accomplishments?: string[];
		}

		interface Project {
			name: string;
			description: string;
			skills: string;
			href: string;
			prize?: string;
			covers?: string[];
			featured?: boolean;
		}

		interface ProjectPage {
			slug: string;
			name: string;
			git?: string;
			steam?: string;
			skills?: string;
		}

		interface MdsvexFile {
			default: import('svelte/internal').SvelteComponent;
			metadata: Record<string, string>;
		}

		type MdsvexResolver = () => Promise<MdsvexFile>;

		interface BlogPost {
			slug: string;
			title: string;
			description: string;
			date: string;
			hidden: boolean;
			readingTime?: number;
			cover?: string;
		}
	}
}

export {};
