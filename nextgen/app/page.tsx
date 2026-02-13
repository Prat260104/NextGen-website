import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import ParticleConstellation from "./components/ParticleConstellation";
import AboutUs from "./components/AboutUs";
import RivaSection from "./components/RivaSection";
import InitiativesSection from "./components/InitiativesSection";
import ClusterCarousel from "./components/ClusterCarousel";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      {/* <ParticleConstellation /> */}
      <AboutUs />
      <RivaSection />
      <InitiativesSection />
      <ClusterCarousel />
      <EventsSection />
      <Footer />
    </main>
  );
}
