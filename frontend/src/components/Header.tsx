import { ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ConnectButton from "./ConnectButton";
import AccountModal from "./AccountModal";

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <Flex justify="flex-end" width="full">
            <ConnectButton handleOpenModal={onOpen} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
  }