import { ChakraProvider, Text } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import "@fontsource/inter";
import MintStatus from "./components/mint/MintStatus";
import MintButton from "./components/mint/MintButton";
import { useEthers } from "@usedapp/core";

function App() {

  const { account, chainId } = useEthers();
  const isSupportedChain = chainId == 5;

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        { account && isSupportedChain ? (
          <>
            <MintStatus/>
            <MintButton/>
          </>
        ) : <Text color="white" fontSize="md">Please connect your wallet to Goerli Testnet</Text>}
      </Layout>
    </ChakraProvider>
  );
}

export default App;