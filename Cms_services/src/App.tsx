import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Home from "./pages/Home";
import WelcomeSection from "./components/Home/WelcomeSection";
import Footer from "./components/Home/Footer";
import TaxFilingPage from "./pages/TaxFiling"; // Updated Import for Tax Filing Page
import ImmigrationServices from "./pages/ImmigrationServices";
import AboutUs from "./pages/AboutUs";
import BenefitsCalculator from "./pages/Calculator"; // New Component
import NewcomerBenefit from "./pages/NewcomerBenefit";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <WelcomeSection />
                </>
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/tax-filing" element={<TaxFilingPage />} /> {/* Updated Route */}
            <Route path="/immigration-services" element={<ImmigrationServices />} />
            <Route path="/benefits-calculator" element={<BenefitsCalculator />} /> {/* New Route */}
            <Route path="/newcomer-benefits" element={<NewcomerBenefit />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
