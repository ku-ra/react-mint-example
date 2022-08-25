import { ReactNode, useEffect } from "react";
import { Button, Text, Flex, useDisclosure, Spinner } from "@chakra-ui/react";
import React from "react";
import { TransactionState, useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts"
import PenguContract from "../../abi/Pengu.json"
import { ContractAddress } from "../../constants";
import { BigNumber, utils } from "ethers";

export default function MintButton() {
    const { account, chainId } = useEthers();
    const ContractInterface = new utils.Interface(PenguContract.abi)
    const contract = new Contract(ContractAddress, ContractInterface) as any;
    const { state, send } = useContractFunction(contract, 'mint', { transactionName: "Mint" });
    const { status } = state;

    const mintTokens = () => {
        send(BigNumber.from(1), { value: utils.parseEther("0.01")});
    }

    return ( <>
        { status === "Mining" ? <Spinner color='blue.500' marginTop="10"/> : 
            <Button
                onClick={mintTokens}
                bg="gray.700"
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "blue.400",
                    backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                m="1px"
                px={6}
                height="38px"
                marginTop="10"
            >
                <Text color="white" fontSize="md">Mint your Token</Text>
            </Button>
            }    
    </>
        
    )
}