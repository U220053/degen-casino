import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import {
  createConfig,
  injectedWithFallback,
  walletConnect,
  coinbaseWallet,
  safe,
} from "wagmi";
import { getChainInfo } from "./chainInfo"; // Import your chainInfo helper
import { UniverseChainId, ALL_CHAIN_IDS } from "./chainIds"; // Update with your chain constants
import { http } from "viem"; // Replace with your HTTP client

export const wagmiConfig = createConfig({
  chains: [
    getChainInfo(UniverseChainId.Mainnet),
    ...ALL_CHAIN_IDS.map(getChainInfo),
  ],
  connectors: [
    farcasterFrame(),
    injectedWithFallback(),
    walletConnect(WC_PARAMS),
    coinbaseWallet({
      appName: "YourAppName",
      appLogoUrl: "https://yourapp.com/logo.png",
      reloadOnDisconnect: false,
      enableMobileWalletLink: true,
    }),
    safe(),
  ],
  client({ chain }) {
    return createClient({
      chain,
      batch: { multicall: true },
      pollingInterval: 12000,
      transport: http(chain.rpcUrls.interface.http[0]),
    });
  },
});
