"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
// internally crafted imports of resources
import { store } from "@/ReduxConfig/store";
import React from "react";

// internally crafted imports of resources
import Context from "@/context/context";

type ProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: ProviderProps) {
  const [info, setInfo] = React.useState<string>("Who are you ?");

  const data = React.useMemo(() => ({ info, setInfo }), [info]);

  return (
    <>
      <CacheProvider>
        <ChakraProvider resetCSS>
          <Provider store={store}>
            <Context.Provider value={data}>{children}</Context.Provider>
          </Provider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
