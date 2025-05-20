import { useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import {BswifiOffIcon }from "@chakra-ui/icons";
import { setNetworkStatus } from "../app/features/networkSlice";

const NetworkStatusProvider = ({ children }) => {
 
  const toastIdRef = useRef();
  const toast = useToast();
const dispatch=  useDispatch();
  useEffect(() => {

    window.addEventListener("offline", setOffline);

    window.addEventListener("online", setOnline);
  }, []);
  function close() {
    toast.closeAll(toastIdRef.current);
  }
  const setOnline = () => {
    dispatch(setNetworkStatus(true));
    close();
  };
  const setOffline = () => {
    dispatch(setNetworkStatus(false));
    showToast();
  };
  const showToast = () => {
    toastIdRef.current = toast({
      title: "You are offline",
      description: "Please check your internet connection.",
      status: "error",
      duration: null,
      isClosable: true,
    });
  };

 
    return  children ;
};

export default NetworkStatusProvider;
