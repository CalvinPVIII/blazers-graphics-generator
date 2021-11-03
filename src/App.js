import "./App.css";
import { useState, useEffect } from "react";
import PlayerCards from "./components/PlayerCards";
import Games from "./components/Games";

function App() {
    const [currentPage, setCurrentPage] = useState();
    return (
        <>
            {/* <PlayerCards /> */}
            <Games />
        </>
    );
}

export default App;
