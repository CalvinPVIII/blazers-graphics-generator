import { useState, useEffect } from "react";
import "../styles/PlayerCards.css";
import Player from "./Player";

function PlayerCards(props) {
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [apiReturn, setApiReturn] = useState();
    const [blazersPlayers, setBlazersPlayers] = useState();
    useEffect(() => {
        fetch(
            `https://www.balldontlie.io/api/v1/stats?game_ids[]=${props.gameId}}&seasons[]=2021`
        )
            .then((result) => result.json())
            .then((result) => {
                setApiReturn(result.data);
                console.log(result.data);
                let blazers = [];

                result.data.forEach((player) => {
                    if (player.team.id === 25) {
                        blazers.push(player);
                    }
                });
                console.log(blazers);
                setBlazersPlayers(blazers);
                setIsApiLoaded(true);
            });
    }, []);
    if (isApiLoaded) {
        return (
            <div className="player-card-wrapper">
                {blazersPlayers.map((player) => (
                    <div className="player-card">
                        <Player
                            firstName={player.player.first_name}
                            lastName={player.player.last_name}
                            points={player.pts}
                            rebounds={player.reb}
                            assists={player.ast}
                            steals={player.stl}
                            blocks={player.blk}
                            minutes={player.min}
                            fgm={player.fgm}
                            fga={player.fga}
                            ftm={player.ftm}
                            fta={player.fta}
                            fg3m={player.fg3m}
                            fg3a={player.fg3a}
                            turnovers={player.turnover}
                            fouls={player.pf}
                            id={player.id}
                            key={player.id}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return <p>Please Waut </p>;
    }
}

export default PlayerCards;
