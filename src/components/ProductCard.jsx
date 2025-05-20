import { Link } from "react-router-dom";
import {
  useColorMode,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid white"} bg={"#000"} color={"#fff"}>
      <CardBody>
        <Image
          src={product.thumbnail?.url}
          alt="Product image"
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          objectFit={"cover"}
        />

        <Stack spacing={3} mt={6}>
          <Heading size={"md"} textAlign={"center"} mb={2}>
            {product.title} {/* Correctly access the title */}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"}>
            {product.description}
          </Text>
          <Button
            as={Link}
            to={{ pathname: `/products/${product.id}` }}
            state={{ data: product }}
            bg={colorMode === "light" ? "#eee" : "#096B68"}
            color={colorMode !== "light" ? "#eee" : "#096B68"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            mt={5}
            _hover={{
              backgroundColor: colorMode === "light" ? "#096B68" : "#eee",
              color: colorMode !== "light" ? "#096B68" : "#FFF",
              transition: "all 0.3s ease-in-out",
            }}
          >
            View Product
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
