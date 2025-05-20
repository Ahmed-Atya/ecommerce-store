import { Link } from "react-router-dom";
import {
  useColorMode,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";


const ProductDetailsCard = ({product} ) => {
 
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #000"} bg={"#000"} color={"#fff"} product={product}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_STRAPI_API_URL}${product.thumbnail?.url}`}
          alt="Product image"
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          objectFit={"cover"}
          // fallbackSrc={imgFalBack}
        />

        <Stack spacing={3} mt={6}>
          <Heading size={"md"} textAlign={"center"} mb={2}>
            {product.title} {/* Correctly access the title */}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"}>
            {product.description}{" "}
          </Text>
          <Button
            as={Link}
            to={`products/${product.id}`} // Use the product ID in the link
            bg={colorMode === "light" ? "#eee" : "#222"}
            color={colorMode !== "light" ? "#eee" : "#222"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            mt={5}
          >
           Add to Cart
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductDetailsCard;
