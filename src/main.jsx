import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import NetworkStatusProvider from "./provider/NetworkStatusProvider.jsx";
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NetworkStatusProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </NetworkStatusProvider>
    </Provider>
  </QueryClientProvider>
);
