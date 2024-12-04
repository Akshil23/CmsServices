import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Home from "./pages/Home";
import WelcomeSection from "./components/Home/WelcomeSection";
import Footer from "./components/Home/Footer"; // Assuming you have a Footer component
import TaxFiling from "./pages/TaxFiling"; // Import Tax Filing Page
import ImmigrationServices from "./pages/ImmigrationServices"; // Import Immigration Services Page
import AboutUs from "./pages/AboutUs";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <WelcomeSection />
                </>
              }
            />
            <Route path="/about-us" element={<AboutUs />} /> {/* About Us Page */}
            {/* Tax Filing Route */}
            <Route path="/tax-filing" element={<TaxFiling/>} />
            {/* Immigration Services Route */}
            <Route path="/immigration-services" element={<ImmigrationServices />} />
          </Routes>
        </div>
        <Footer /> {/* Footer component is placed here */}
      </div>
    </Router>
  );
};

export default App;
