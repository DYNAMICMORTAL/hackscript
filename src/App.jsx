import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-black text-secondary h-screen w-full">
      <Sidebar />
      <Hero />
    </div>
  );
}

export default App;
