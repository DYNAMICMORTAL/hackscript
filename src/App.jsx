import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";

function App() {
  return (
    <div className="bg-black text-secondary h-screen w-full font-f1">
      <Sidebar />
      <Hero />
      <About />
      <Timeline />
      <About />
    </div>
  );
}

export default App;
