import { useState, useEffect, useContext } from "react";
import GameName from "./GameName";
import FleetChoices from "./FleetChoices";
import UserContext, { UserContextType } from "../context/UserContext";


const LoadBoard = (): JSX.Element => {
    const [pageReady, setPageReady] = useState(false);
    const { mainPageContainerRef, mainPageImageContainerRef, mainPageChoicesContainerRef, mainPageTitleContainerRef, gameOn } = useContext(UserContext) as UserContextType;


    useEffect(() => {
        // create fleet and information section
        
        const titleLetters = document.querySelectorAll(
            ".letters"
        ) as NodeListOf<HTMLElement>;

        if (mainPageImageContainerRef.current && mainPageChoicesContainerRef.current && mainPageTitleContainerRef.current) {
            mainPageImageContainerRef.current.style.animation = "fade-out 1000ms linear forwards";
            mainPageChoicesContainerRef.current.style.animation = "fade-out 1000ms linear forwards";
            setTimeout(() => {
                if (mainPageImageContainerRef.current && mainPageChoicesContainerRef.current) {
                    mainPageImageContainerRef.current.remove();
                    mainPageChoicesContainerRef.current.remove();    
                }
            }, 1000);

            mainPageTitleContainerRef.current.style.animation =
            "move-title-container 1000ms linear forwards";
            titleLetters.forEach((letter) =>
                (letter.style.animation = "move-letters 1000ms linear forwards")
            );
        }
        if (!gameOn && mainPageContainerRef.current) {
            mainPageContainerRef.current.style.flexDirection = "row";
            mainPageContainerRef.current.style.alignItems = "stretch";
        }
    }, [pageReady]);

    useEffect(() => {
        setPageReady(true);
    }, []);

    return (
        <>
            <GameName value="game" />
            {!gameOn ? <FleetChoices /> : null}
        </>
    );

};

export default LoadBoard;
