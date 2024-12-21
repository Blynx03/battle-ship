import { RefObject, Dispatch, SetStateAction } from "react";
import { BlockSizeProps } from "../context/UserContext";

// handles tile sizes to get images aspect ratio relative to the tile size
export function getTileSize(
    setBlockSize: Dispatch<SetStateAction<BlockSizeProps>>
) {
    const el = document.querySelector("#opponent-side1") as HTMLElement;
    if (el) {
        setBlockSize({ width: el.offsetWidth, height: el.offsetHeight });
    } else {
        console.warn("#opponent-side1 not found");
    }
}

// handles rotate during button or image click
export function handleRotate(
    setIsVertical: Dispatch<SetStateAction<boolean>>,
    rotateBtnRef: RefObject<HTMLButtonElement>
) {
    setIsVertical((prev) => {
        const newIsVertical = !prev;
        return newIsVertical;
    });

    if (rotateBtnRef.current) {
        rotateBtnRef.current.style.transform = "scale(1)";
        setTimeout(() => {
            if (rotateBtnRef.current) {
                rotateBtnRef.current.style.transform = "scale(1.2)";
            }
        }, 100);
    }
}

export function checkTile(num: number): boolean {
    return true;
}

// use to extract just the tile number of either playerSide
export function getTileNumber(el: HTMLElement, playerSide: string): number {
    return parseInt(el.getAttribute("id")?.replace(playerSide, "") || "0", 10);
}

// use to find or get the element with the tile number
export function getTileElement(playerSide: string, num: number) {
    return document.querySelector(`#${playerSide}${num}`);
}

// export function handleResizeImages(blockSize: BlockSizeProps, setBlockSize: Dispatch<SetStateAction<BlockSizeProps>>) {
//     const el = document.querySelector("#opponent-side1")
//     getTileSize(setBlockSize);

//     const widthRatio = newTileSize.width / oldWidth;
//     const allTiles = document.querySelectorAll<HTMLDivElement>(".tile");
//     allTiles.forEach(tileElement => {
//         if (tileElement.hasChildNodes()) {
//             const imageEl = tileElement.firstChild as HTMLImageElement;
//             imageEl.style.width = `${blockSize}`
//         }
//     })
// }
