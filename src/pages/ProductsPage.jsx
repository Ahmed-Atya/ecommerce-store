import { Flex, Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonComponent from "../components/SkeletonComponent";
import FilterSidebar from "../components/FiltersComponent";

const ProductsPage = () => {
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API_URL}/api/products?populate=*`
      );
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
        gap={6}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </Grid>
    );
  }

  if (isError) return <div>Error loading products</div>;
  if (!data || !data.data || data.data.length === 0)
    return <div>No products found</div>;

  return (
    // <Flex justifyContent={"space-between"} mt={10}>
    //   {/* <FilterSidebar/> */}
     
    // </Flex>
     <Grid
        margin={30}
        templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
        gap={6}
      >
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
  );
};

export default ProductsPage;
