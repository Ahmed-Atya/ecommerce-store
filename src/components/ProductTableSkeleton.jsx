import React from "react";
import { Stack, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
const ProductTableSkeleton = () => {
  return (
    <Stack maxw={"85%"} m={"auto"} my={10}>
      {Array.from({ length: 10 }, (_, i) => (
        <Flex
          key={i}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={2}
          borderBottom={"1px solid #333"}
          rounded={"md"}
          h={"50px"}
        >
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Skeleton w={"120px"} h={"9px"} bg={"gray"}></Skeleton>
          <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
            <Skeleton
              w={"50px"}
              h={"30px"}
              bg={"gray"}
              startColor="blue.300"
              endColor=""
            ></Skeleton>

            <Skeleton
              w={"50px"}
              h={"30px"}
              startColor="red.300"
              endColor="red-500"
            ></Skeleton>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default ProductTableSkeleton;
