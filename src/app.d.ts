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
	}
}

export {};
