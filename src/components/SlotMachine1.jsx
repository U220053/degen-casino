import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import degen from "../assets/image 9.svg";
import img1 from "../../public/Group16.png";
import "./Slot.css";

const SlotMachine1 = () => {
  const symbols = ["🍒", "💎", "7️⃣", "🍀", "⭐"];
  const [reels, setReels] = useState(["7️⃣", "7️⃣", "7️⃣"]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(false);

  const spin = () => {
    setSpinning(true);
    setWinner(false);

    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setReels((prevReels) =>
        prevReels.map(() => symbols[Math.floor(Math.random() * symbols.length)])
      );
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);
        setSpinning(false);

        if (finalReels.every((symbol) => symbol === "7️⃣")) {
          setWinner(true);
        }
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      {winner && (
        <div className="text-2xl font-bold text-green-500 animate-bounce">
          🎉 JACKPOT! 🎉
        </div>
      )}
      <div className=" flex flex-col items-center  px-8 bg-[url('/Group18.png')] bg-contain bg-no-repeat bg-center w-[50rem]  h-2/3 ">
        <div className="flex gap-4  p-16 rounded-lg shadow-lg  ">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`w-40 h-40 flex items-center justify-center bg-white rounded-lg text-4xl`}
              //  ${spinning ? "animate-bounce" : ""}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-row gap-4 h-1/3 items-center justify-between mb-2">
        <div className="w-1/3 flex items-center -mb-8">
          <div className="flex items-center ">
            <div className="w-[13.5rem] h-[4rem] rounded-r-[0.875rem] rounded-l-[2rem] bg-purple-700 text-right flex items-center justify-center text-white relative">
              <img
                src={degen}
                alt="wallet"
                className="w-[4rem] absolute left-0 top-1/2 -translate-y-1/2 "
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
            className="text-lg text-white  w-[500px] h-[65px]  bg-gradient-to-r from-[#D9D9D9] to-[#8B5CF6] shadow-[0_8px_#264BAC,0_60px_25px_rgba(66,112,234,0.19)] transform "
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {spinning ? <Loader2 className="w-6 h-6 animate-spin" /> : "SPIN"}
          </Button>
        </div>
        <div className="w-1/3 text-center flex items-center justify-center  -mb-8">
          {" "}
          <img src={img1} alt="wallet" className="" />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine1;
