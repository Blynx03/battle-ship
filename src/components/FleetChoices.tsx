import { useState, useRef, useEffect } from "react";
import UserContext, { UserContextType } from "../context/UserContext";

// interface FleetChoicesProps {
//   numberOfPlayers: string;
//   setNumberOfPlayers: Dispatch<SetStateAction<string>>;
//   blockSize: { width: number; height: number };
//   setBlockSize?: Dispatch<SetStateAction<{ width: number; height: number }>>;
//   degree: number;
//   setDegree?: Dispatch<SetStateAction<number>>;
// }

const FleetChoices = ({
  blockSize,
  setBlockSize,
  isVertical,
  setIsVertical,
  tickedShip,
  setTickedShip,
  tileCount,
  setTileCount,
}: Pick<
  UserContextType,
  | "blockSize"
  | "setBlockSize"
  | "isVertical"
  | "setIsVertical"
  | "tickedShip"
  | "setTickedShip"
  | "tileCount"
  | "setTileCount"
>): JSX.Element => {
  const [imagePath, setImagePath] = useState<string | undefined>("");
  const [imageClass, setImageClass] = useState<string | undefined>("");

  const imageRef = useRef<HTMLImageElement>(null);
  const destroyerRef = useRef<HTMLDivElement>(null);
  const submarineRef = useRef<HTMLDivElement>(null);
  const cruiserRef = useRef<HTMLDivElement>(null);
  const battleshipRef = useRef<HTMLDivElement>(null);
  const carrierRef = useRef<HTMLDivElement>(null);
  const rotateBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      console.log('fleetChoices ship, count, vertical = ', tickedShip, tileCount, isVertical)

      }, [tickedShip, isVertical, tileCount, setTickedShip, setIsVertical])

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    if (blockSize !== undefined) {
    }
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [blockSize]);

  function handleSize() {
    const el = document.querySelector("#top-side1") as HTMLElement;
    // console.log(
    //   "under handleSize, width: ",
    //   el.offsetWidth,
    //   "height: ",
    //   el.offsetHeight
    // );
    if (el && setBlockSize) {
      setBlockSize({ width: el.offsetWidth, height: el.offsetHeight });
    }
  }

  function handleShipHover(ship: string) {
    setImagePath(`../images/${ship}.png`);
    setImageClass(`${ship}-img ship-images`);
  }

  function clickedShip(ship: string) {
    setTickedShip(ship);
    console.log('clickedship',ship)
    switch (ship) {
      case "destroyer":
        if (destroyerRef.current) {
          destroyerRef.current.style.color = "tomato";
          setTileCount(2);
        }
        break;
      case "submarine":
        if (submarineRef.current) {
          submarineRef.current.style.color = "tomato";
          setTileCount(3);
        }
        break;
      case "cruiser":
        if (cruiserRef.current) {
          cruiserRef.current.style.color = "tomato";
          setTileCount(3);
        }
        break;
      case "battleship":
        if (battleshipRef.current) {
          battleshipRef.current.style.color = "tomato";
          setTileCount(4);
        }
        break;
      case "carrier":
        if (carrierRef.current) {
          carrierRef.current.style.color = "tomato";
          setTileCount(5);
        }
        break;
      default:
        break;
    }
  }

  function handleRotate() {
    console.log(imageRef.current);
    if (imageRef.current) {
      setIsVertical((prev) => {
        const newIsVertical = !prev;
        if (imageRef.current) {
          imageRef.current.style.transform = newIsVertical
            ? "rotate(270deg)"
            : "rotate(0deg)";
        }
        return newIsVertical;
      });
      if (rotateBtn.current) {
        rotateBtn.current.style.transform = "scale(1)";
      }
      setTimeout(() => {
        if (rotateBtn.current) {
          rotateBtn.current.style.transform = "scale(1.2)";
        }
      }, 100);
    }
  }

  useEffect(() => {
    let element = document.querySelector(".tile");
    if (element) {
      let rect = element?.getBoundingClientRect();
      setBlockSize({ width: rect.width, height: rect.height });
    }
    console.log('useeffect tickedship - ', tickedShip);
  }, [tickedShip, setTickedShip]);

  // function handleDragStart(event: React.DragEvent<HTMLImageElement>) {
  //   const customImage = document.createElement("img");
  //   let element = document.querySelector(".tile");
  //   if (element) {
  //     console.log("isVertical in handledragstart = ", isVertical);
  //     let rect = element.getBoundingClientRect();
  //     customImage.src = `../images/${tickedShip}.png`;
  //     if (isVertical) {
  //       customImage.style.width = `${rect.width * tileCount - 8}px`;
  //       customImage.style.height = `${rect.height - 8}px`;
  //       customImage.style.transform = `rotate(0deg)`;
  //     } else {
  //       customImage.style.width = `${rect.width - 8}px`;
  //       customImage.style.height = `${rect.height * tileCount - 8}px`;
  //       customImage.style.transform = `rotate(270deg)`;
  //     }

  //     setBlockSize({ width: rect.width, height: rect.height });
  //     if (event.dataTransfer) {
  //       event.dataTransfer.setDragImage(customImage, 10, 10);
  //     }
  //     customImage.style.transform = isVertical
  //       ? "rotate(270deg)"
  //       : "rotate(0deg)";
  //     document.body.appendChild(customImage);
  //   }
  // }

  function handleDragStart(event: React.DragEvent<HTMLImageElement>) {
    const imageElement = document.querySelector(
      ".ship-images"
    ) as HTMLImageElement;

    if (imageElement) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      let width: number;
      let height: number;

      const customImage = new Image();
      customImage.src = `../images/${tickedShip}.png`;

      customImage.onload = function () {
        if (isVertical) {
          width = imageElement.naturalWidth;
          height = imageElement.naturalHeight * tileCount;
        } else {
          width = imageElement.naturalWidth * tileCount;
          height = imageElement.naturalHeight;
        }

        canvas.width = width;
        canvas.height = height;

        if (context) {
          if (isVertical) {
            context.drawImage(imageElement, 0, 0, width, height);
          } else {
            context.translate(width / 2, height / 2);
            context.rotate((270 * Math.PI) / 180);
            context.drawImage(
              imageElement,
              -height / 2,
              -width / 2,
              height,
              width
            );
          }
        }
        if (event.dataTransfer) {
          event.dataTransfer.setDragImage(canvas, width / 4, height / 4);
        }
      };
    }
  }

  useEffect(() => {
    console.log("updated tickedship", tickedShip);
  },[tickedShip, setTickedShip]);
  

  return (
    <>
      <div className="fleet-info">
        Click on a ship name and drag and place all five ships onto the bottom
        part of the game board.
      </div>
      <div className="fleet-container">
        <div className="fleet-name-container">
          <div className="destroyer-container ship-name-container">
            <div
              ref={destroyerRef}
              className="destroyer ship-name"
              onClick={() => clickedShip("destroyer")}
              onMouseOver={() => handleShipHover("destroyer")}
            >
              Destroyer
            </div>
            <div className="destroyer-tile info-num-tiles">(2 Tiles)</div>
          </div>

          <div className="submarine-container ship-name-container">
            <div
              ref={submarineRef}
              className="submarine ship-name"
              onClick={() => clickedShip("submarine")}
              onMouseOver={() => handleShipHover("submarine")}
            >
              Submarine
            </div>
            <div className="submarine-tile info-num-tiles">(3 Tiles)</div>
          </div>

          <div className="cruiser-container ship-name-container">
            <div
              ref={cruiserRef}
              className="cruiser ship-name"
              onClick={() => clickedShip("cruiser")}
              onMouseOver={() => handleShipHover("cruiser")}
            >
              Cruiser
            </div>
            <div className="cruiser-tile info-num-tiles">(3 Tiles)</div>
          </div>

          <div className="battleship-container ship-name-container">
            <div
              ref={battleshipRef}
              className="battleship ship-name"
              onClick={() => clickedShip("battleship")}
              onMouseOver={() => handleShipHover("battleship")}
            >
              Battleship
            </div>
            <div className="battleship-tile info-num-tiles">(4 Tiles)</div>
          </div>

          <div className="carrier-container ship-name-container">
            <div
              ref={carrierRef}
              className="carrier ship-name"
              onClick={() => clickedShip("carrier")}
              onMouseOver={() => handleShipHover("carrier")}
            >
              Carrier
            </div>
            <div className="carrier-tile info-num-tiles">(5 Tiles)</div>
          </div>
        </div>
        <div className="image-btn-container">
          <div className="ship-image-container">
            <img
              id={tickedShip}
              ref={imageRef}
              className={imageClass}
              src={imagePath ? imagePath : `../images/destroyer.png`}
              onDragStart={(event) => handleDragStart(event)}
              draggable
            />
          </div>
          <button ref={rotateBtn} className="rotate-btn" onClick={handleRotate}>
            Rotate Ship
          </button>
        </div>
      </div>
    </>
  );
};

export default FleetChoices;
