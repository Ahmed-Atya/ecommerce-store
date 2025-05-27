import { Container, Flex, Heading, Text, Box, Grid } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetDashboardCategoriesQuery } from "../app/services/categories";
import ProductCard from "../components/ProductCard";
const HomePage = () => {

  const { data: categoriesData } = useGetDashboardCategoriesQuery();
console.log("categoriesData", categoriesData);
  const getProductsOfPhones = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_STRAPI_API_URL
        }/api/products?filters[categories][slug][$eq]=phones&populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const getProductsOfCloths = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_STRAPI_API_URL
        }/api/products?filters[categories][slug][$eq]=cloths&populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const getProductsOfAppliances = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_STRAPI_API_URL
        }/api/products?filters[categories][slug][$eq]=appliances&populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const getProductsOfSmartWatches = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_STRAPI_API_URL
        }/api/products?filters[categories][slug][$eq]=watches&populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const getProductsOfLaptops = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_STRAPI_API_URL
        }/api/products?filters[categories][slug][$eq]=laptops&populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const {
    data: phones,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["phones"],
    queryFn: getProductsOfPhones,
  });

  const {
    data: cloths,
    isLoading: isLoadingCloths,
    isError: isErrorCloths,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getProductsOfCloths,
  });

  const {
    data: appliances,
    isLoading: isLoadingAppliances,
    isError: isErrorAppliances,
  } = useQuery({
    queryKey: ["appliances"],
    queryFn: getProductsOfAppliances,
  });

  const {
    data: smartWatches,
    isLoading: isLoadingSmartWatches,
    isError: isErrorSmartWatches,
  } = useQuery({
    queryKey: ["watches"],
    queryFn: getProductsOfSmartWatches,
  });

  const {
    data: laptops,
    isLoading: isLoadingLaptops,
    isError: isErrorLaptops,
  } = useQuery({
    queryKey: ["laptops"],
    queryFn: getProductsOfLaptops,
  });

  if (
    isLoading ||
    isLoadingCloths ||
    isLoadingAppliances ||
    isLoadingSmartWatches ||
    isLoadingLaptops
  ) {
    return <Text>Loading...</Text>;
  }
  if (
    isError ||
    isErrorCloths ||
    isErrorAppliances ||
    isErrorSmartWatches ||
    isErrorLaptops
  ) {
    return <Text>Error fetching products</Text>;
  }
  if (!phones || !cloths || !appliances || !smartWatches || !laptops) {
    return <Text>No products found</Text>;
  }
  if (!categoriesData) {
    return <Text>No categories found</Text>;
  }
  return (
    // Categories
    <Container maxWidth="100%" sx={{ mt: 4 }}>
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Products Categories
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
            gap={6}
          >
            {categoriesData?.data?.map((category) => (
              <Box
                key={category.id}
                cursor="pointer"
                backgroundImage={`url(${category.image.url})`}
                backgroundSize="cover"
                height="300px"
                width="100%"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                borderRadius="8px"
                overflow="hidden"
                boxShadow="lg"
                position="relative"
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  borderRadius="8px"
                  padding={4}
                  height="100%"
                  backgroundColor="rgba(0, 0, 0, 0.6)"
                  position="relative"
                  zIndex="1"
                >
                  <Heading
                    as="h2"
                    size="md"
                    mb={2}
                    textAlign="center"
                    color="white"
                    textShadow="0 2px 4px rgba(0,0,0,0.5)"
                  >
                    {category.name}
                  </Heading>
                </Flex>
              </Box>
            ))}
          </Grid>
        </>
      </Flex>
      {/* Phones and touch screen Section */}
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Smart Phones and Accessories
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}
            gap={6}
          >
            {phones?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      </Flex>
      {/* Smart Watches Section */}
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Smart Watches 
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}
            gap={6}
          >
            {smartWatches?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      </Flex>
      {/* Cloths Section */}
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Cloths and Fashion
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}
            gap={6}
          >
            {cloths?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      </Flex>
      {/* appliance Section */}
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Appliances and Electronics
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}
            gap={6}
          >
            {appliances?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      </Flex>
      {/*  */}
      <Flex justifyContent={"center"} flexDirection={"column"} mb={4}>
        <>
          <Heading as="h2" size="lg" my={10} textAlign="center">
            Laptops and Computers
          </Heading>

          <Grid
            margin={30}
            templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}
            gap={6}
          >
            {laptops?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      </Flex>
    </Container>
  );
};

export default HomePage;
