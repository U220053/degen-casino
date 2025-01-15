import React, { useEffect } from "react";
import SlotMachine from "./components/SlotMachine";
import Main from "./components/Main";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import FrameSDK from "@farcaster/frame-sdk";
import farcasterFrame from "@farcaster/frame-wagmi-connector";
import { connect } from "wagmi/actions";

function FarcasterFrameProvider({ children }) {
  useEffect(() => {
    const init = async () => {
      const context = await FrameSDK.context;

      // Auto-connect if running in a Farcaster frame
      if (context?.client?.clientFid) {
        connect(config, { connector: farcasterFrame() });
      }

      // Notify Farcaster that the app is ready
      setTimeout(() => {
        FrameSDK.actions.ready();
      }, 500);
    };

    init();
  }, []);

  return <>{children}</>;
}

function App() {
  const degen = {
    id: 666666666,
    name: "Degen L3",
    network: "DEGEN",
    iconUrl: "../img/degen01.svg",
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
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <FarcasterFrameProvider>
            <div className="min-h-screen flex items-center justify-center text-white bg-[#2C0653] bg-[url(/DegenCasinoBg.gif)] bg-cover bg-no-repeat bg-center">
              <Main />
            </div>
          </FarcasterFrameProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
