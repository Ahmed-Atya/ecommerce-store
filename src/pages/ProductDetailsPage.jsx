import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Flex,
  Text,
  useColorMode,
  Image,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import SkeletonComponent from "../components/SkeletonComponent";
import {
  addToCart,
  getTotalCheckout,
  selectedCart,
} from "../app/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.data;
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectedCart);
  const getProduct = async () => {
    if (!product?.documentId) {
      throw new Error("No product ID available");
    }
    const { data } = await axios.get(
      `${import.meta.env.VITE_STRAPI_API_URL}/api/products/${
        product.documentId
      }?populate=*`
    );
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: getProduct,
    enabled: !!product?.documentId, // Only run query if documentId exists
  });

  const goBack = () => navigate(-1);

  useEffect(() => {
    document.title = `Product store | Product ${data?.data?.title || ""} Page`;
  }, [data]);

  if (isLoading) return <SkeletonComponent />;
  if (isError) return <div>Error loading product</div>;
  if (!data) return <div>No product found</div>;

  const productDetails = data.data;

  const addToCartHandler = () => {
    dispatch(addToCart(productDetails));
    dispatch(getTotalCheckout(cartItems));
  };
  return (
    <>
      <Flex
        alignItems="center"
        p={4}
        bg={colorMode === "light" ? "#eee" : "#222"}
        my={7}
        mx={"auto"}
        cursor="pointer"
        onClick={goBack}
      >
        <BsArrowLeft size={30} />
        <Text ml={3}>Go back</Text>
      </Flex>
      <Card
        border={"1px solid #000"}
        bg={"#000"}
        color={"#fff"}
        w={600}
        mx={"auto"}
      >
        <CardBody>
          <Image
            src={`${productDetails.thumbnail?.url}`}
            alt="Product image"
            boxSize={"200px"}
            borderRadius={"full"}
            mx={"auto"}
            objectFit={"cover"}
            // fallbackSrc={imgFalBack}
          />

          <Stack spacing={3} mt={6}>
            <Heading size={"md"} textAlign={"center"} mb={2}>
              {productDetails.title}
            </Heading>
            <Text textAlign={"center"} fontSize={"sm"}>
              {productDetails.description}
            </Text>
            <Button
              as={Link}
              to={`/products/${productDetails.id}`}
              bg={colorMode === "light" ? "#eee" : "#096B68"}
              color={colorMode !== "light" ? "#eee" : "#096B68"}
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
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductDetailsPage;
