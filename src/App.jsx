import React from "react";
import SlotMachine from "./components/SlotMachine";
import Main from "./components/Main";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const degen = {
    id: 666666666,
    name: "Degen L3",
    network: "DEGEN",
    iconUrl: "../img/degen01.svg",
    //iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: "degen",
      symbol: "DEGEN",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.degen.tips"],
      },
      public: {
        http: ["https://rpc.degen.tips"],
      },
    },
    blockExplorers: {
      default: { name: "SnowTrace", url: "https://explorer.degen.tips/" },
    },
  };
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [degen],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className=" min-h-screen flex items-center justify-center  text-white bg-[#2C0653] bg-[url(/DegenCasinoBg.gif)] bg-cover bg-no-repeat bg-center">
            {/* <SlotMachine /> */}
            <Main />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
