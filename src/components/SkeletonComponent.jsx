import React from "react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
const SkeletonComponent = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" mb={10} border={2} borderColor="gray.200">
      <SkeletonCircle size="150" mx="auto" />
      <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default SkeletonComponent;
