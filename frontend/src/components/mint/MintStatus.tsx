import { ReactNode, useEffect } from "react";
import { Flex, useDisclosure, Text, Progress } from "@chakra-ui/react";
import React from "react";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts"
import PenguContract from "../../abi/Pengu.json"
import { ContractAddress } from "../../constants";
import { utils } from "ethers";

export default function MintStatus() {
    const { account, chainId } = useEthers();
    const ContractInterface = new utils.Interface(PenguContract.abi)
    const contract = new Contract(ContractAddress, ContractInterface) as any;
    //const { state, send } = useContractFunction(contract, 'totalSupply');
    //const { status } = state;

    const totalSupply = useCall(contract && { contract: contract, method: 'totalSupply', args: [] });
    const maxSupply = useCall(contract && { contract: contract, method: 'maxSupply', args: [] });

    return (<Flex direction="column" textAlign="center">
            <Text color="white" fontSize="3xl" fontWeight="black" paddingBottom="10">Mint your first token here now</Text>
            <Progress value={totalSupply && maxSupply ? totalSupply.value / maxSupply.value : 0} size='xs' colorScheme='pink' width="500px"></Progress>
            <Text color="white" fontSize="xs" paddingTop="5">
            { totalSupply && maxSupply && totalSupply.value + " / " + maxSupply.value}
            </Text>
        </Flex>
    )
}