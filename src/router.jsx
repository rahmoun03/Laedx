import { BrowserRouter, Routes, Route } from "react-router-dom";

import Laedx from "./pages/laedx/page";
import HiveXperience from "./pages/hive/page";
import NoveXperience from "./pages/nove/page";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Landing / Welcome page */}
				<Route path="/" element={<Laedx />} />

				{/* Brand pages */}
				<Route path="/hive" element={<HiveXperience />} />
				<Route path="/nove" element={<NoveXperience />} />

				{/* 404 fallback */}
				<Route path="*" element={<Laedx />} />
			</Routes>
		</BrowserRouter>
	);
}
