import HeroSection from "../components/Home/HeroSection";
import Testimonial from "../components/Home/Testimonial";
import WelcomeSection from "../components/Home/WelcomeSection";


const Home = () => {
  return (
    <main className="home"> {/* You can keep this class if needed for styling */}
      <HeroSection />
      <WelcomeSection/>
      <Testimonial/>
    </main>
  );
};

export default Home;
