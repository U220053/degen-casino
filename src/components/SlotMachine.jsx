import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import degen from "../assets/image 9.svg";
import img1 from "../../public/Group16.png";
import "./Slot.css";

const SlotMachine = () => {
  // Configurable spin parameters
  const SPIN_DURATION = 4000; // Total spin time (milliseconds)
  const STOP_DELAY = 500; // Delay between each reel stopping
  const TRANSITION_DURATION = 500; // CSS transition duration
  const ITEMS_TO_SCROLL = 15; // Number of items to scroll through

  const items = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎",
    "😂",
    "🖕",
  ];

  const [doors, setDoors] = useState([
    { currentIndex: 0, items: items, spinning: false, stopped: false },
    { currentIndex: 0, items: items, spinning: false, stopped: false },
    { currentIndex: 0, items: items, spinning: false, stopped: false },
  ]);

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const spinDoor = (door, index) => {
    // Generate more items to create a longer scrolling effect
    const newItems = Array.from(
      { length: ITEMS_TO_SCROLL },
      () => items[Math.floor(Math.random() * items.length)]
    );

    return {
      ...door,
      items: newItems,
      spinning: index === 0, // Only first reel starts spinning initially
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

    // Re-enable transition after resetting doors
    setTimeout(() => {
      setTransitionEnabled(true);

      // Sequentially stop reels
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
    }, 50); // Small delay to ensure the transition is re-enabled
  };

  console.log("doors", doors);
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
            disabled={spinning}
            className="text-lg text-white w-[500px] h-[65px] bg-gradient-to-r from-[#D9D9D9] to-[#8B5CF6] shadow-[0_8px_#264BAC,0_60px_25px_rgba(66,112,234,0.19)] transform"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {spinning ? <Loader2 className="w-6 h-6 animate-spin" /> : "SPIN"}
          </Button>
        </div>
        <div className="w-1/3 text-center flex items-center justify-center -mb-8">
          <img src={img1} alt="wallet" className="" />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
