import { PlayerProps, SideType } from "../context/UserContext";
import { getTileElement } from "../utlities/operationUtilities";

type ResultType = {
    isTaken: boolean;
    bgColor: "red" | "palegreen";
    tiles: number[];
};
// | { isTaken: boolean; bgColor: "red" | "palegreen" | null };

const assignBackgroundColor = (
    tileNum: number,
    playerSide: SideType,
    isVertical: boolean,
    tileCount: number,
    playerTiles: PlayerProps[],
    opponentTiles: PlayerProps[]
): ResultType => {
    let tiles: number[] = [];
    let bgColor: "red" | "palegreen" = "red";
    let isTaken: boolean = false;
    let redHorTwoTiles: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let redHorThreeTiles: number[] = [
        1, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90,
        91, 100,
    ];
    let redHorFourTiles: number[] = [
        1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41, 49, 50, 51, 59, 60,
        61, 69, 70, 71, 79, 80, 81, 89, 90, 91, 99, 100,
    ];
    let redHorFiveTiles: number[] = [
        1, 2, 9, 10, 11, 12, 19, 20, 21, 22, 29, 30, 31, 32, 39, 40, 41, 42, 49,
        50, 51, 52, 59, 60, 61, 62, 69, 70, 71, 72, 79, 80, 81, 82, 89, 90, 91,
        92, 99, 100,
    ];

    function checkIfTaken(tiles: number[]): boolean {
        const arrayEl = tiles.map((tile) => getTileElement(playerSide, tile));
        return arrayEl.some((el) => el?.hasAttribute("taken"));
    }

    //
    switch (tileCount) {
        case 2:
            if (isVertical) {
                tiles.push(tileNum - 10, tileNum);
                // Check if any of the tiles exists in the playerTiles
                isTaken = checkIfTaken(tiles);

                bgColor =
                    tileNum < 11 || tileNum > 100 || isTaken
                        ? "red"
                        : "palegreen";
            } else {
                tiles.push(tileNum, tileNum + 1);
                isTaken = checkIfTaken(tiles);
                bgColor =
                    redHorTwoTiles.includes(tileNum) || isTaken
                        ? "red"
                        : "palegreen";
            }
            break;

        case 3:
            if (isVertical) {
                tiles.push(tileNum - 10, tileNum, tileNum + 10);
                isTaken = checkIfTaken(tiles);
                bgColor =
                    tileNum < 11 || tileNum > 90 || isTaken
                        ? "red"
                        : "palegreen";
            } else {
                tiles.push(tileNum - 1, tileNum, tileNum + 1);
                isTaken = checkIfTaken(tiles);
                bgColor =
                    redHorThreeTiles.includes(tileNum) || isTaken
                        ? "red"
                        : "palegreen";
            }
            break;

        case 4:
            if (isVertical) {
                tiles.push(tileNum - 10, tileNum, tileNum + 10, tileNum + 20);
                isTaken = checkIfTaken(tiles);
                bgColor =
                    tileNum < 11 || tileNum > 80 || isTaken
                        ? "red"
                        : "palegreen";
            } else {
                tiles.push(tileNum - 1, tileNum, tileNum + 1, tileNum + 2);
                isTaken = checkIfTaken(tiles);
                bgColor =
                    redHorFourTiles.includes(tileNum) || isTaken
                        ? "red"
                        : "palegreen";
            }
            break;

        case 5:
            if (isVertical) {
                tiles.push(
                    tileNum - 20,
                    tileNum - 10,
                    tileNum,
                    tileNum + 10,
                    tileNum + 20
                );
                isTaken = checkIfTaken(tiles);
                bgColor =
                    tileNum < 21 || tileNum > 80 || isTaken
                        ? "red"
                        : "palegreen";
            } else {
                tiles.push(
                    tileNum - 2,
                    tileNum - 1,
                    tileNum,
                    tileNum + 1,
                    tileNum + 2
                );
                isTaken = checkIfTaken(tiles);
                bgColor =
                    redHorFiveTiles.includes(tileNum) || isTaken
                        ? "red"
                        : "palegreen";
            }
            break;

        default:
            break;
    }
    return { isTaken, bgColor, tiles };
};

export default assignBackgroundColor;
