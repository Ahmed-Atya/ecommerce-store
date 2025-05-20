import {createStandaloneToast} from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const addItemToCart=(cartItem={}, cartItems=[]) => {
  
  const exist =cartItems.find((item)=> item.id === cartItem.id);
  if(exist){
    toast({
      title: "Item Already in Cart",
      description: "This item is already in your cart.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return cartItems.map((item)=> {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }
    );
  } 
    else{
      
      toast({
        title: "Item Added to Cart",
        description: "This item has been added to your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
        });
        return [...cartItems, {...cartItem, quantity: 1}];
    }
    
}

