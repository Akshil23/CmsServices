import HeroSection from "../components/Home/HeroSection";
import Testimonial from "../components/Home/Testimonial";

const Home = () => {
  return (
    <main className="home"> {/* You can keep this class if needed for styling */}
      <HeroSection />
      <Testimonial />
    </main>
  );
};

export default Home;
