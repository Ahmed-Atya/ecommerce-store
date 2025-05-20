import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Flex,
  Text
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedGlobal,
  onCloseCartDrawerAction,
} from "../app/features/globalSlice";

import { selectedCart ,clearCart} from "../app/features/cartSlice";
import CartDrawerItem from "./CartDrawerItem";
const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector(selectedGlobal);
  const { total } = useSelector(selectedCart);

  const btnRef = useRef();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectedCart);
  const onClose = () => {
    dispatch(onCloseCartDrawerAction());
  };
  const onClear = () => {
    dispatch(clearCart(cartItems))
  }

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton  onClick={onClose}/>
        <DrawerHeader>{cartItems.length ? <Text>Your Cart Items</Text>:<Text>Cart is Empty!</Text>}</DrawerHeader>

        <DrawerBody>
          {cartItems.map((item) => (
            <CartDrawerItem key={item.id} item={item} cartItems={cartItems} />
          ))
         
          }
          {cartItems.length ? (
            <Flex justifyContent="space-between" mt={40}>
              <Text fontSize="lg" fontWeight="bold">
                Total:
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                ${total}
              </Text>
            </Flex>
          ) : null}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClear} colorScheme="red">
            Clear All
          </Button>
          <Button colorScheme="blue">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
