import * as React from "react";
import { Box, ChakraProvider, Heading } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import { space } from "postcss/lib/list";

type Props = {};  

export default function Dark() {
  return (
    <ChakraProvider>
      <DarkModeSwitch />
    </ChakraProvider>
  );
}
