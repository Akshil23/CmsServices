import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Home from "./pages/Home";
import WelcomeSection from "./components/Home/WelcomeSection";
import Footer from "../src/components/Home/Footer"; // Assuming you have a Footer component
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
            {/* Other routes can be added here */}
            <>Tax_Filing</>
          </Routes>
        </div>
        <Footer /> {/* Footer component is placed here */}
      </div>
    </Router>
  );
};

export default App;
