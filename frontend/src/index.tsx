import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

import { Config, DAppProvider, Goerli, Mainnet } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config: Config = {
  readOnlyChainId: Goerli.chainId, 
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

ReactDOM.render(
  <React.StrictMode>
    {/* 
       Wrap our app in the provider, config is required, 
        but can be left as an empty object: 
    */}
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);