import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,

} from "@chakra-ui/react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  getTotalCheckout,
} from "../app/features/cartSlice";

const CartDrawerItem = ({ item }) => {
  const dispatch = useDispatch();

  const onIncrement = () => {
    dispatch(increaseQuantity(item));
    dispatch(getTotalCheckout());
  };
  const onRemove = () => {
    dispatch(removeFromCart(item));
    dispatch(getTotalCheckout());

  };
  const onDecrement = () => {
    dispatch(decreaseQuantity(item));
    dispatch(getTotalCheckout());

  };
  return (
    <Flex
      p={1}
      mb={6}
      mt={3}
      borderBottomWidth="1px"
      borderColor="gray.100"
      _last={{ borderBottomWidth: 0 }}
    >
      {/* Product Image */}
      <Box flexShrink={0} w="80px" h="80px" borderRadius="md" overflow="hidden">
        <Image
          src={`${item.thumbnail.url}`}
          alt={item.title}
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>

      {/* Product Info */}
      <Flex flex={1} ml={3} direction="column" justify="space-between">
        <Box>
          <Text fontWeight="semibold" noOfLines={1} fontSize={'md'}>
            {item.title}
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {item.description.slice(0, 0)}...
          </Text>
        </Box>

        {/* Quantity Controls */}
        <Flex align="center" justify="space-between">
          <Flex align="center" justify={"space-between"}>
            <IconButton
              icon={<FaMinus />}
              size="xs"
              aria-label="Decrease quantity"
              onClick={onDecrement}
            />
            <Text mx={2} fontWeight="medium">
              {item.quantity}
            </Text>
            <IconButton
              icon={<FaPlus />}
              size="xs"
              aria-label="Increase quantity"
              onClick={onIncrement}
            />
          </Flex>

          <Text fontWeight="medium" fontSize="md" ml={3}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      {/* Remove Button */}
      <IconButton
        icon={<FaTrash />}
        aria-label="Remove item"
        onClick={onRemove}
        variant="ghost"
        colorScheme="red"
        size="sm"
        ml={2}
      />
    </Flex>
  );
};

export default CartDrawerItem;
