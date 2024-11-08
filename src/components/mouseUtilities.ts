import { UserContextType } from "../context/UserContext";

export const clickedShip = (ship: string, shipRef: React.RefObject<HTMLDivElement>, {setTickedShip, setTileCount, setImagePath, setImageClass, imageRef}:UserContextType) => {
    setTickedShip(ship);
    setImagePath(`../images/${ship}.png`);
    setImageClass(`${ship}-img ship-images`);

    // set image element's draggable to true if it is false
    if (imageRef.current) {
        imageRef.current.draggable = true
    }
    // clear drag error message if there is 
    let clearDiv = document.querySelector(".drag-error-message") as HTMLElement;
    if (clearDiv) {
        clearDiv.textContent = "";
    }
    const el = document.querySelector('.ship-images') as HTMLElement;
    el.style.width = "100%";
    el.style.height = "auto";

    if (shipRef) {
        // shipElement.style.color = 'lime';
        console.log(shipRef)
    }

    switch (ship) {
    case "destroyer": setTileCount(2)
        break;
    case "submarine": setTileCount(3)
        break;
    case "cruiser": setTileCount(3)
        break;
    case "battleship": setTileCount(4)
        break;
    case "carrier": setTileCount(5);
        break;
    default:
        break;
    }
}