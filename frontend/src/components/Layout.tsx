import { ReactNode } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <VStack bg="gray.800" h="100vh" padding="6">
        <Header />
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="gray.800"
          h="full"
        >
          {children}
        </Flex>      
      </VStack>

    </>
 
  )
}