import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../App.css";

function ConnectBtn() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-riv-primary whitespace-nowrap"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="flex_btn_menu_connect">
                  <div className="flexTwoBtn">
                    <button
                      className="btn btn-riv-secondary connect_btn_wdth imDark mrMobile"
                      onClick={openAccountModal}
                      type="button"
                    >
                      <div className="flexConnec">
                        <h6 className=" imBalance whitespace-nowrap">
                          {account.displayName}
                        </h6>
                        <h6 className="imBalance whitespace-nowrap">
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </h6>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectBtn;
