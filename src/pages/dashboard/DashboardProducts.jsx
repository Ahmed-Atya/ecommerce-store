import DashboardProductsTable from '../../components/DashboardProductsTable';
import { Text } from '@chakra-ui/react';
const DashboardProducts = () => {
  return (
    <div>
      <Text size={"xl"} fontWeight={"bold"} mb={50}>Dashboard Products</Text>
      
      <DashboardProductsTable/>
    </div>
  )
}

export default DashboardProducts;