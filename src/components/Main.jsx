import React from "react";
import mainimg from "../assets/Degen Casino.gif";
import SlotMachine from "./SlotMachine";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectButton from "./ConnectBtn";

const Main = () => {
  return (
    <div className="container flex flex-col ">
      <div className="container flex  justify-end mt-4 z-10">
        <ConnectButton />
      </div>
      <div className="container flex flex-col gap-y-20 items-center -mt-16">
        <div className="h-1/4 ">
          <img
            src={mainimg}
            alt="mainimg"
            className="w-[25rem] h-full object-cover "
          />
        </div>
        <div className=" container h-3/4 ">
          <SlotMachine />
        </div>
      </div>
    </div>
  );
};

export default Main;
