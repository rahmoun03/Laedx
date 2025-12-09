import { create } from 'zustand';

export const useSite = create((set) => ({

	sites: [
		{ name: "Home", active: true },
		{ name: "HiveXperience", active: false },
		{ name: "NoveXperience", active: false },
	],

	setActiveSite: (name) =>
		set((state) => ({
		sites: state.sites.map((p) => ({
			...p,
			active: p.name === name,
		})),
	})),
}));
