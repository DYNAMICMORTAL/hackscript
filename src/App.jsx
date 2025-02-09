import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";

function App() {
  return (
    <div className="bg-black text-secondary h-screen w-full">
      <Sidebar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
