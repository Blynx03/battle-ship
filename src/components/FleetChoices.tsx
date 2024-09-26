import React, { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";

const FleetChoices = (): JSX.Element => {
  const [imagePath, setImagePath] = useState<string | undefined>("");
  const [imageClass, setImageClass] = useState<string | undefined>("");
  const [deg, setDeg] = useState<number | 0>(0);
  const context = useContext(UserContext);
  const blockSize = context?.blockSize;
  const setBlockSize = context?.setBlockSize;
  const imageRef = useRef<HTMLImageElement>(null);
  const destroyerRef = useRef<HTMLDivElement>(null);
  const submarineRef = useRef<HTMLDivElement>(null);
  const cruiserRef = useRef<HTMLDivElement>(null);
  const battleshipRef = useRef<HTMLDivElement>(null);
  const carrierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    console.log(blockSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [setBlockSize]);

  function handleSize() {
    const el = document.querySelector("#top-side1") as HTMLElement;

    if (el && setBlockSize) {
      setBlockSize({ width: el.offsetWidth, height: el.offsetHeight });
    }
  }

  function handleShipHover(ship: string) {
    setImagePath(`../images/${ship}.png`);
    setImageClass(`${ship}-img ship-images`);
  }

  function handleClick(ship: string) {
    console.log("handle click", ship);
  }

  function handleFlip(deg: number) {
    if (deg === 270) {
      setDeg(deg - 270);
    } else {
      setDeg(270);
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `rotate(${deg}deg)`;
    }
  }

  useEffect(() => {
    let element = document.querySelector(".block");
    if (element && setBlockSize) {
      let rect = element?.getBoundingClientRect();
      setBlockSize({ width: rect.width, height: rect.height });
    }
  }, [setBlockSize]);

  return (
    <>
      <div className="fleet-info">
        Drag and place all five ships onto the game board.
      </div>
      <div className="fleet-container">
        <div className="fleet-name-container">
          <div className="destroyer-container ship-name-container">
            <div
              ref={destroyerRef}
              className="destroyer ship-name"
              onClick={() => handleClick("destroyer")}
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
              onClick={() => handleClick("submarine")}
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
              onClick={() => handleClick("cruiser")}
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
              onClick={() => handleClick("battleship")}
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
              onClick={() => handleClick("carrier")}
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
              ref={imageRef}
              className={imageClass}
              src={imagePath}
              draggable
            />
          </div>
          <button className="flip-btn" onClick={() => handleFlip(deg)}>
            Rotate Ship
          </button>
        </div>
      </div>
    </>
  );
};

export default FleetChoices;
