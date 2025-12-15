import gsap from "gsap";

export const mainTimeline = gsap.timeline({
	paused: true,
	defaults: {
		ease: "power3.inOut",
	},
});
