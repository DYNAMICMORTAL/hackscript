import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Location from "./components/Location";
import Prize from "./components/Prize";
import FAQ from "./components/FAQ";
import ScrollSpeedIndicator from "./components/ScrollSpeedIndicator";


function App() {
  return (
    <div className="bg-black text-secondary h-screen w-full font-f1">
      <ScrollSpeedIndicator />
      <Sidebar />
      <Hero />
      <About />
      <Timeline />
      <Prize />
      <FAQ />
      <Location />
      {/* add location in the footer   */}
    </div>
  );
}

export default App;
