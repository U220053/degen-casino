import { useState } from "react";
import { Button } from "./ui/button";
import degen from "../assets/image 9.svg";
import img1 from "../../public/Group16.png";
import "./Slot.css";
import globe from "../assets/image 26.png";
import bomb from "../assets/image 27.png";
import book from "../assets/image 28.png";
import broom from "../assets/image 29.png";
import tonic from "../assets/image 30.png";
import gem from "../assets/image 31.png";
import key from "../assets/image 32.png";
import champion from "../assets/image 33.png";
import coin from "../assets/image 34.png";
import { useAccount } from "wagmi";
import { Dialog } from "primereact/dialog";
import "./Modal.css";

const SlotMachine = () => {
  // Even shorter spin parameters
  const { isConnected } = useAccount();
  const SPIN_DURATION = 1; // Total spin time (milliseconds)
  const STOP_DELAY = 150; // Delay between each reel stopping
  const TRANSITION_DURATION = 250; // CSS transition duration
  const ITEMS_TO_SCROLL = 50; // Number of items to scroll through

  const items = [
    <img src={globe} alt="globe" className="w-full h-full object-contain" />,
    <img src={bomb} alt="bomb" className="w-full h-full object-contain" />,
    <img src={book} alt="book" className="w-full h-full object-contain" />,
    <img src={broom} alt="broom" className="w-full h-full object-contain" />,
    <img src={tonic} alt="tonic" className="w-full h-full object-contain" />,
    <img src={gem} alt="gem" className="w-full h-full object-contain" />,
    <img src={key} alt="key" className="w-full h-full object-contain" />,
    <img
      src={champion}
      alt="champion"
      className="w-full h-full object-contain"
    />,
    <img src={coin} alt="coin" className="w-full h-full object-contain" />,
  ];

  // const items = [
  //   "🍭",
  //   "❌",
  //   "⛄️",
  //   "🦄",
  //   "🍌",
  //   "💩",
  //   "👻",
  //   "😻",
  //   "💵",
  //   "🤡",
  //   "🦖",
  //   "🍎",
  //   "😂",
  //   "🖕",
  // ];
  const [doors, setDoors] = useState([
    { currentIndex: 0, items: items, spinning: false, stopped: false },
    { currentIndex: 0, items: items, spinning: false, stopped: false },
    { currentIndex: 0, items: items, spinning: false, stopped: false },
  ]);

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  const spinDoor = (door, index) => {
    // Generate fewer items for quicker spin
    const newItems = Array.from(
      { length: ITEMS_TO_SCROLL },
      () => items[Math.floor(Math.random() * items.length)]
    );

    return {
      ...door,
      items: newItems,
      spinning: index === 0,
      stopped: false,
      currentIndex: 0,
    };
  };

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setWinner(false);

    // Disable transition and reset all doors
    setTransitionEnabled(false);
    setDoors((prevDoors) => prevDoors.map(spinDoor));

    // Re-enable transition after a brief delay
    setTimeout(() => {
      setTransitionEnabled(true);

      // Sequentially stop reels with reduced timing
      doors.forEach((_, index) => {
        setTimeout(() => {
          setDoors((prevDoors) =>
            prevDoors.map((door, doorIndex) =>
              doorIndex === index
                ? {
                    ...door,
                    spinning: false,
                    stopped: true,
                    currentIndex: Math.floor(ITEMS_TO_SCROLL / 2),
                  }
                : door
            )
          );

          // Check for winner after last reel stops
          if (index === doors.length - 1) {
            const finalItems = doors.map(
              (door) => door.items[Math.floor(ITEMS_TO_SCROLL / 2)]
            );
            if (finalItems.every((item) => item === finalItems[0])) {
              setWinner(true);
            }
            setSpinning(false);
          }
        }, SPIN_DURATION + index * STOP_DELAY);
      });
    }, 50);
  };
  const openDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };
  return (
    <div className="flex flex-col items-center">
      {winner && (
        <div className="font-redhat text-[45.53px] font-black leading-[60.24px] text-left animate-bounce flex flex-row">
          <p className="mr-2 bg-gradient-to-b from-white to-[#8B5CF6] bg-clip-text text-transparent">
            JACKPOT
          </p>
          <img src={degen} alt="wallet" className="w-10 h-10 mr-2" />
          <p className="bg-gradient-to-b from-white to-[#8B5CF6] bg-clip-text text-transparent">
            100,000 DEGENS
          </p>
        </div>
      )}

      <div className="flex flex-col items-center px-8 bg-[url('/Group18.png')] bg-contain bg-no-repeat bg-center w-[50rem] h-2/3">
        <div className="flex gap-4 p-16 rounded-lg shadow-lg">
          {doors.map((door, index) => (
            <div
              key={index}
              className="door w-40 h-60 overflow-hidden relative"
            >
              <div
                className={`boxes flex flex-col transition-transform ease-in-out`}
                style={{
                  transitionDuration: transitionEnabled
                    ? `${TRANSITION_DURATION}ms`
                    : "0ms",
                  transform:
                    door.spinning || !door.stopped
                      ? `translateY(-${door.currentIndex * 60}px)`
                      : `translateY(-${
                          Math.floor(ITEMS_TO_SCROLL / 2) * 60
                        }px)`,
                }}
              >
                {door.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`box flex items-center justify-center text-6xl bg-white border-2 border-gray-200 h-[60px]
                    ${
                      itemIndex === Math.floor(ITEMS_TO_SCROLL / 2)
                        ? "border-blue-500"
                        : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-row gap-4 h-1/3 items-center justify-between mb-2 mt-8">
        <div className="w-1/3 flex items-center -mb-8">
          <div className="flex items-center">
            <div className="w-[13.5rem] h-[4rem] rounded-r-[0.875rem] rounded-l-[2rem] bg-purple-700 text-right flex items-center justify-center text-white relative">
              <img
                src={degen}
                alt="wallet"
                className="w-[4rem] absolute left-0 top-1/2 -translate-y-1/2"
              />
              <div className="-mr-8">Wallet Balance</div>
            </div>
          </div>
        </div>
        <div className="w-1/3 text-center flex flex-col items-center justify-center">
          <p className="mb-2">Spin for 0</p>

          <Button
            onClick={spin}
            disabled={spinning || !isConnected}
            className="text-lg text-white w-[500px] h-[65px] bg-gradient-to-r from-[#D9D9D9] to-[#8B5CF6] shadow-[0_8px_#264BAC,0_60px_25px_rgba(66,112,234,0.19)] transform"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            }}
          >
            SPIN
          </Button>
        </div>
        <div
          className="w-1/3 text-center flex items-center justify-center -mb-8"
          onClick={openDialog}
        >
          <img src={img1} alt="wallet" className="" />
        </div>
      </div>
      <Dialog
        visible={dialogVisible}
        onHide={hideDialog}
        closable={false}
        showHeader={false}
      >
        {/* <div className="h-[544.16px] bg-gradient-to-b from-[#D9D9D9] to-[#8B5CF6] flex items-center justify-center"> */}
        <div className="h-[513px] w-[600px] bg-[#1C0241] border-[10px] rounded-[32px] border-purple-700">
          <img src={img1} alt="wallet" className="" onClick={hideDialog} />
        </div>
        {/* </div> */}
      </Dialog>
    </div>
  );
};

export default SlotMachine;
