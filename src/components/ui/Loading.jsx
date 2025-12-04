import { useState, useEffect } from "react";
import { useLoadingStore } from "@/hooks/useLoadingStore";
import { useTranslation } from "react-i18next";

export default function LoadingPage() {
	const progress = useLoadingStore((state) => state.progress);
	const [visible, setVisible] = useState(true);
	const [finish, setFinish] = useState(false);

	const [displayProgress, setDisplayProgress] = useState(0);

	useEffect(() => {
		// console.log('real progress : ', progress)
		let raf;
		const animate = () => {
			setDisplayProgress((prev) => {
				
				if (progress === 0) {
					return Math.min(prev + 0.2, 95);
				}

				if (prev >= 99) {
					return 100;
				}

				if ((progress - prev) > 0) {
					
					return prev + ( progress - prev ) * 0.25;
				}

				return prev;
			});

			raf = requestAnimationFrame(animate);
		};
		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [progress]);

	useEffect(() => {
		if (displayProgress >= 100) {
			const delayTimer = setTimeout(() => {
				setTimeout(() => setVisible(false), 500);
				setTimeout(() => setFinish(true), 2800);
			}, 1500);
			return () => clearTimeout(delayTimer);
		}
	}, [displayProgress, finish]);

	return (
		<div
			style={{
				zIndex: 9999,
				transition: "opacity 2500ms linear",
			}}
			className={`${finish ? "hidden" : "flex"} ${
				visible ? "opacity-100" : "opacity-0"
			} fixed top-0 left-0 w-screen h-svh md:h-screen bg-black`}
		>
			<div className="w-full h-full flex justify-center items-center">
				<LiquidText progress={Math.floor(displayProgress)} />
			</div>
		</div>
	);
}

function LiquidText({ progress }) {
	const { t } = useTranslation();
	return (
		<section className="relative h-svh md:h-screen w-full flex justify-center items-center text-center">
		<div className="relative">
			{/* Background (faded) */}
			<span className="font-[Montserrat] font-bold text-[48px] md:text-[64px] lg:text-8xl text-white/20">
				{t('enter_page.title1')} <br /> {t('enter_page.title2')}
			</span>

			{/* Foreground (liquid fill) */}
			<span
				className="absolute inset-0 font-[Montserrat] font-bold text-[48px] md:text-[64px] lg:text-8xl text-white"
				style={{
					"--progress": `${progress}%`,
					WebkitTextFillColor: "white",
				}}
				data-progress={progress}
			>
				{t('enter_page.title1')} <br /> {t('enter_page.title2')}
			</span>
		</div>

		{/* Progress number */}
		<div className="absolute bottom-8 left-1/2 translate-x-[-50%] font-[JetBrains] flex flex-col items-center gap-5 text-white text-xl">
			{progress}%
		</div>

		<style>{`
			[data-progress] {
			transition: clip-path 0.3s linear;
			}
			/* Mobile: fill bottom → top */
			@media (max-width: 767px) {
			[data-progress] {
				clip-path: inset(calc(100% - var(--progress)) 0 0 0);
			}
			}
			/* Desktop: fill left → right */
			@media (min-width: 768px) {
			[data-progress] {
				clip-path: inset(0 calc(100% - var(--progress)) 0 0);
			}
			}
		`}</style>
		</section>
	);
}

