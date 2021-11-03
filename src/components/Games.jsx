import { useState, useEffect } from "react";
import PlayerCards from "./PlayerCards";
// import "../styles/PlayerCards.css";

function Games() {
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [apiReturn, setApiReturn] = useState();
    const [currentGame, setCurrentGame] = useState();
    const today = new Date().toISOString().slice(0, 10);
    const [playerCardsVisible, setPlayerCardsVisible] = useState(false);
    console.log(today);
    useEffect(() => {
        fetch(
            `https://www.balldontlie.io/api/v1/games?team_ids[]=25&seasons[]=2021&dates[]=${today}}`
        )
            .then((result) => result.json())
            .then((result) => {
                if (result.data.length > 0) {
                    setCurrentGame(result.data);
                } else {
                    console.log(false);
                    setCurrentGame(false);
                }
                setIsApiLoaded(true);
            });
    }, []);

    const onGameClick = () => {
        setPlayerCardsVisible(true);
    };
    if (isApiLoaded && currentGame !== false && playerCardsVisible === false) {
        return (
            <div
                className="games-wrapper"
                onClick={() => {
                    onGameClick();
                }}
            >
                <p className="visitor-team-name">
                    {currentGame[0].visitor_team.full_name}
                </p>
                <p>@</p>
                <p className="home-team-name">
                    {currentGame[0].home_team.full_name}
                </p>
            </div>
        );
    } else if (
        isApiLoaded &&
        currentGame !== false &&
        playerCardsVisible === true
    ) {
        return <PlayerCards gameId={currentGame[0].id} />;
    } else if (isApiLoaded && currentGame === false) {
        return <div className="">No games today</div>;
    } else {
        return <p>Please Wait </p>;
    }
}

export default Games;
