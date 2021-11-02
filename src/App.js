import "./App.css";
import { useState, useEffect } from "react";
import PlayerCards from "./components/PlayerCards";

function App() {
    const [currentPage, setCurrentPage] = useState();
    return <PlayerCards />;
}

export default App;
