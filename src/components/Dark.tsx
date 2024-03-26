import {  ChakraProvider, Heading } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";

type Props = {};  

export default function Dark() {
  return (
    <ChakraProvider>
      <DarkModeSwitch />
    </ChakraProvider>
  );
}
