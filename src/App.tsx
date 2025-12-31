import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import Home from "./pages/Home";
import TaxFilingPage from "./pages/TaxFiling"; // Updated Import for Tax Filing Page
import ImmigrationServices from "./pages/ImmigrationServices";
import AboutUs from "./pages/AboutUs";
import BenefitsCalculator from "./pages/Calculator"; // New Component
import NewcomerBenefit from "./pages/NewcomerBenefit";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for animations
import DetailedInvestmentServices from "./pages/InvestmentServices";
import InsuranceServices from "./pages/InsuranceServices";
import Contact from "./pages/Contact";

const App: React.FC = () => {
	useEffect(() => {
		Aos.init({
			duration: 1000, // Animation duration
			easing: "ease-in-out", // Easing style
			once: false,
			// Play animation only once
		});
	}, []);

	return (
		<div className="app-container">
			{/* Header Component */}
			<Header />

			{/* Main Content */}
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Home />
							</>
						}
					/>
					
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/tax-filing" element={<TaxFilingPage />} />
					<Route path="/immigration-services" element={<ImmigrationServices />} />
					<Route path="/benefits-calculator" element={<BenefitsCalculator />} />
					<Route path="/newcomer-benefits" element={<NewcomerBenefit />} />
					<Route path="/investment-services" element={<DetailedInvestmentServices />} />
					<Route path="/insurance-services" element={<InsuranceServices />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</div>

			{/* Footer Component */}
			<Footer />
		</div>
	);
};

export default App;
