import { useState, useEffect } from "react";
import "../styles/Player.css";
import { playerImages } from "../playerImages";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import downloadjs from "downloadjs";

function Player(props) {
    const image = playerImages[`${props.firstName} ` + `${props.lastName}`];
    const [plusminus, setPlusMinus] = useState("-1");
    const [nickName, setNickName] = useState("");
    const onPlusMinusChangeEnter = (e) => {
        setPlusMinus(e.target.value);
    };
    const onSetNickNameEnter = (e) => {
        setNickName(`"${e.target.value}"`);
    };

    const onDownloadImage = (id) => {
        console.log(document.getElementById(id));
        htmlToImage.toPng(document.getElementById(id)).then((dataUrl) => {
            downloadjs(dataUrl, "image.png");
        });
    };
    return (
        <>
            <div className="player-wrapper" id={props.id}>
                <div className="player-image-wrapper">
                    <img
                        src={image}
                        alt={props.lastName}
                        className="player-image"
                    />
                </div>
                <div className="player-name">
                    <p className="player-first-name">
                        {props.firstName + " " + nickName}
                    </p>
                    <p className="player-last-name">{props.lastName}</p>
                </div>
                <div className="player-stats">
                    <div className="left-column">
                        <p className="player-points">PTS {props.points}</p>
                        <p className="player-rebounds">REB {props.rebounds}</p>
                        <p className="player-assists">AST {props.assists}</p>
                        <p className="player-steals">STL {props.steals}</p>
                        <p className="player-blocks">BLK {props.blocks}</p>
                        <p className="player-minutes">
                            MIN{" "}
                            {Math.round(
                                parseFloat(props.minutes.replace(":", "."))
                            )}
                        </p>
                    </div>
                    <div className="right-column">
                        <p className="player-fgs">
                            FG {props.fgm}/{props.fga}
                        </p>
                        <p className="player-fts">
                            FT {props.ftm}/{props.fta}
                        </p>
                        <p className="player-3ps">
                            FG {props.fg3m}/{props.fg3a}
                        </p>
                        <p className="player-turnovers">TO {props.turnovers}</p>
                        <p className="player-fouls">PF {props.fouls}</p>
                        <p className="player-plusminus">+/- {plusminus}</p>
                    </div>
                </div>
            </div>
            <div className="player-info-edit">
                <p>Edit +/-</p>
                <input type="text" onChange={onPlusMinusChangeEnter} />
                <p>Edit Nickname</p>
                <input type="text" onChange={onSetNickNameEnter} />
                <button
                    onClick={() => {
                        setNickName("");
                    }}
                >
                    Clear
                </button>

                <br />
                <button
                    onClick={() => {
                        onDownloadImage(props.id);
                    }}
                >
                    Download Image
                </button>
            </div>
        </>
    );
}

export default Player;
