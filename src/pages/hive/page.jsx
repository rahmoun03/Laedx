import { useState } from 'react';
import { Home, Users, Settings, Menu, X } from 'lucide-react';

export default function HiveXperience() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
	{ name: 'Home', id: 'home', icon: Home },
	{ name: 'About', id: 'about', icon: Users },
	{ name: 'Services', id: 'services', icon: Settings },
  ];

	const renderPage = () => {
		switch(currentPage) {
		case 'home':
			return <HomePage />;
		case 'about':
			return <AboutPage />;
		case 'services':
			return <ServicesPage />;
		default:
			return <HomePage />;
		}
	};

  return (
	<div className="min-h-screen bg-gray-50">
	  {/* Navigation */}
	  <nav className="bg-white shadow-lg">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div className="flex justify-between h-16">
			<div className="flex items-center">
			  <span className="text-2xl font-bold text-blue-600">HiveXperience</span>
			</div>
			
			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center space-x-4">
			  {navigation.map((item) => {
				const Icon = item.icon;
				return (
				  <button
					key={item.id}
					onClick={() => setCurrentPage(item.id)}
					className={`flex items-center px-4 py-2 rounded-lg transition ${
					  currentPage === item.id
						? 'bg-blue-600 text-white'
						: 'text-gray-700 hover:bg-gray-100'
					}`}
				  >
					<Icon className="w-5 h-5 mr-2" />
					{item.name}
				  </button>
				);
			  })}
			</div>

			{/* Mobile menu button */}
			<div className="md:hidden flex items-center">
			  <button
				onClick={() => setMenuOpen(!menuOpen)}
				className="text-gray-700 hover:text-blue-600"
			  >
				{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
			  </button>
			</div>
		  </div>
		</div>

		{/* Mobile Navigation */}
		{menuOpen && (
		  <div className="md:hidden bg-white border-t">
			<div className="px-2 pt-2 pb-3 space-y-1">
			  {navigation.map((item) => {
				const Icon = item.icon;
				return (
				  <button
					key={item.id}
					onClick={() => {
					  setCurrentPage(item.id);
					  setMenuOpen(false);
					}}
					className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
					  currentPage === item.id
						? 'bg-blue-600 text-white'
						: 'text-gray-700 hover:bg-gray-100'
					}`}
				  >
					<Icon className="w-5 h-5 mr-2" />
					{item.name}
				  </button>
				);
			  })}
			</div>
		  </div>
		)}
	  </nav>

	  {/* Page Content */}
	  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{renderPage()}
	  </main>
	</div>
  );
}

function HomePage() {
  return (
	<div className="space-y-6">
	  <h1 className="text-4xl font-bold text-gray-900">Welcome Home</h1>
	  <p className="text-lg text-gray-600">
		This is a simple React app with multiple pages built using Tailwind CSS.
	  </p>
	  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
		<div className="bg-white p-6 rounded-lg shadow-md">
		  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
		  <p className="text-gray-600">Built with modern React and optimized for performance.</p>
		</div>
		<div className="bg-white p-6 rounded-lg shadow-md">
		  <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive</h3>
		  <p className="text-gray-600">Fully responsive design that works on all devices.</p>
		</div>
		<div className="bg-white p-6 rounded-lg shadow-md">
		  <h3 className="text-xl font-semibold text-gray-900 mb-2">Beautiful</h3>
		  <p className="text-gray-600">Clean and modern UI with Tailwind CSS.</p>
		</div>
	  </div>
	</div>
  );
}

function AboutPage() {
  return (
	<div className="space-y-6">
	  <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
	  <div className="bg-white p-8 rounded-lg shadow-md">
		<p className="text-lg text-gray-600 mb-4">
		  We are passionate about creating beautiful and functional web applications.
		</p>
		<p className="text-gray-600 mb-4">
		  Our team consists of experienced developers who love working with modern technologies
		  like React and Tailwind CSS to deliver exceptional user experiences.
		</p>
		<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
		  <div className="p-4 bg-blue-50 rounded-lg">
			<h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
			<p className="text-gray-600 text-sm">To create amazing digital experiences for everyone.</p>
		  </div>
		  <div className="p-4 bg-blue-50 rounded-lg">
			<h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
			<p className="text-gray-600 text-sm">To be leaders in innovative web development.</p>
		  </div>
		</div>
	  </div>
	</div>
  );
}

function ServicesPage() {
  const services = [
	{ title: 'Web Development', description: 'Custom websites and web applications built with modern technologies.' },
	{ title: 'UI/UX Design', description: 'Beautiful and intuitive user interfaces that users love.' },
	{ title: 'Mobile Development', description: 'Native and cross-platform mobile applications.' },
	{ title: 'Consulting', description: 'Expert advice on technology stack and architecture.' },
  ];

  return (
	<div className="space-y-6">
	  <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
	  <p className="text-lg text-gray-600">
		We offer a wide range of services to help bring your ideas to life.
	  </p>
	  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
		{services.map((service, index) => (
		  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
			<h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
			<p className="text-gray-600">{service.description}</p>
			<button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
			  Learn More →
			</button>
		  </div>
		))}
	  </div>
	</div>
  );
}