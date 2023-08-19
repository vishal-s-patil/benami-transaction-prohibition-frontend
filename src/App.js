import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Outlet />
      </header>
    </div>
  );
}

export default App;
