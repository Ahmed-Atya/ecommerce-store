import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Textarea,
  Select,
} from "@chakra-ui/react";

import {
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useCreateDashboardProductMutation,
} from "../app/services/products";
import { useGetDashboardCategoriesQuery } from "../app/services/categories";
import { Link as RouterLink } from "react-router-dom";
import { FiTrash, FiEdit3, FiEye, FiPlus } from "react-icons/fi";
import CustomAlertDialog from "../shared/AlertDialog";
import { useState, useEffect } from "react";
import CustomModal from "../shared/Modal";
import ProductTableSkeleton from "./ProductTableSkeleton";
import { useSelector } from "react-redux";
import { selectedNetwork } from "../app/features/networkSlice";
// import {createStandaloneToast} from "@chakra-ui/react";

// const { toast } = createStandaloneToast();

const DashboardProductsTable = () => {
  const { data, isLoading, error } = useGetDashboardProductsQuery({ page: 1 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isOnline} = useSelector(selectedNetwork);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onModalCreateClose,
  } = useDisclosure();

  const [deleteProduct, { isLoading: isDestroy, isSuccess }] =
    useDeleteDashboardProductMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductMutation();

  const [
    createNewProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductMutation();

  // Category
  const { data: categoriesData } = useGetDashboardCategoriesQuery();
  console.log(categoriesData, "categoriesData");

  const [productToDelete, setProductToDelete] = useState(null);

  const [productToEdit, setProductToEdit] = useState(null);

  const [productClickedId, setProductClickedId] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData?.data[0]
  );

  useEffect(() => {
    if (isSuccess) {
      setProductToDelete(null);
      onClose();
    }

    if (isUpdatingSuccess) {
      setProductToDelete(null);
      onModalClose();
    }
    if (isCreatingSuccess) {
      setProductToEdit(null);
      onModalCreateClose();
    }
  }, [
    isSuccess,
    onClose,
    isUpdatingSuccess,
    onModalClose,
    isCreatingSuccess,
    onModalCreateClose,
  ]);

  if (isLoading || !isOnline) return <ProductTableSkeleton />;

  if (error) return <div>Error...</div>;
  // Product Edit Handlers
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };

  const priceInputChangeHandler = (value) => {
    setProductToEdit({ ...productToEdit, price: +value });
  };

  const stockInputChangeHandler = (value) => {
    setProductToEdit({ ...productToEdit, stock: +value });
  };

  // create a new product
  const inputChangeCreateHandler = (e) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };

  const priceInputChangeCreateHandler = (value) => {
    setProductToEdit({ ...productToEdit, price: +value });
  };

  const stockInputChangeCreateHandler = (value) => {
    setProductToEdit({ ...productToEdit, stock: +value });
  };
  const categoryChangeHandlerEdit = (e) => {
    const { value } = e.target;
    const selectedCategory = categoriesData.data.find(
      (category) => category.name === value
    );
    setSelectedCategory(selectedCategory);
    setProductToEdit((prevProduct) => {
      if (prevProduct.categories.length === 0) {
        return {
          ...prevProduct,
          categories: [
            {
              name: selectedCategory.name,
              id: selectedCategory.id,
              documentId: selectedCategory.documentId,
              createdAt: selectedCategory.createdAt,
              updatedAt: selectedCategory.updatedAt,
              description: selectedCategory.description,
            },
          ],
        };
        
      }

      return {
        ...prevProduct,
        categories: prevProduct.categories.map((category, index) =>
          index === 0
            ? {
                ...category,
                name: selectedCategory.name,
                id: selectedCategory.id,
                documentId: selectedCategory.documentId,
                createdAt: selectedCategory.createdAt,
                updatedAt: selectedCategory.updatedAt,
                description: selectedCategory.description,
              }
            : category
        ),
      };
    });
  };
  // End create a new product

  if (isUpdating) {
    return <ProductTableSkeleton />;
  }
  const categoryChangeHandlerCreate = (e) => {
    const { value } = e.target;
    const selectedCategory = categoriesData.data.find(
      (category) => category.name === value
    );
    setSelectedCategory(selectedCategory);
    setProductToEdit((prevProduct) => {
     
        return {
          ...prevProduct,
          categories: [
            {
              name: selectedCategory.name,
              id: selectedCategory.id,
              documentId: selectedCategory.documentId,
              createdAt: selectedCategory.createdAt,
              updatedAt: selectedCategory.updatedAt,
              description: selectedCategory.description,
            },
          ],
        };
        
      

    });
  };
  const submitHandler = () => {
    updateProduct({
      documentId: productClickedId,
      body: {
        data: {
          title: productToEdit.title,
          description: productToEdit.description,
          price: productToEdit.price,
          categories: productToEdit.categories.map((cat) => cat.id), 
          stock: productToEdit.stock,
        },
      },
    })
      .unwrap()
      .then(() => {
        onModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(productToEdit, "productToEdit from submit edit handler");

  };

  
  // const inputThumbnailCreateHandler = (e) => {
  //   const file = e.target.files[0];
  //   setProductToEdit({
  //     ...productToEdit,
  //     thumbnailFile: file,
  //   });
  // };
  
  const submitCreateHandler = async () => {
    try {
      const createPayload = {
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
        categories: productToEdit.categories.map((cat) => cat.id),
        // thumbnail: thumbnailData ? thumbnailData.id : undefined, // or thumbnailData.url depending on your API schema
      };
  
      await createNewProduct({
        body: {
          data: createPayload,
        },
      }).unwrap();
  
      onModalCreateClose();
    } catch (err) {
      console.error("Create product failed", err);
    }
  };
  

  return (
    <>
      <Button
        borderRadius={"sm"}
        textColor={`white`}
        bg={`green.400`}
        variant="solid"
        mr={3}
        mb={5}
        onClick={() => {
          onModalCreateOpen();
        }}
      >
        <FiPlus />
        Add new Product
      </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>TITLE</Th>
              <Th>CATEGORY</Th>
              <Th>THUMBNAIL</Th>
              <Th>PRICE</Th>
              <Th>STOCK</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((product) => {
              console.log(product, "product from map");
              const cates = product.categories?.map((item) => (
                <span key={item.id} mr={3}>
                  {item.name}
                </span>
              ));
              // console.log(product, "product");
              return (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product.title}</Td>
                  <Td>
                    {
                      <Flex gap={2} flexWrap={"wrap"}>
                        {cates}
                      </Flex>
                    }
                  </Td>
                  <Td>
                    <img
                      src={`${
                        product.thumbnail?.url
                      }`}
                      alt="thumbnail"
                      width={50}
                      height={50}
                    />
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>{product.stock}</Td>
                  <Td>
                    <Button
                      borderRadius={"sm"}
                      as={RouterLink}
                      to={`/products/${product.id}`}
                      bg={`yellow.400`}
                      textColor={`#222`}
                      variant="solid"
                      mr={3}
                      onClick={onOpen}
                      _hover={{
                        bg: "yellow.500",
                      }}
                    >
                      <FiEye />
                    </Button>
                    <Button
                      borderRadius={"sm"}
                      textColor={`white`}
                      bg={`green.400`}
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        setSelectedCategory(product.categories[0]);
                        console.log(selectedCategory, "selectedCategory");
                        onModalOpen();
                        setProductToEdit(product);
                        setProductClickedId(product.documentId);
                      }}
                      _hover={{
                        bg: "green.500",
                      }}
                    >
                      <FiEdit3 />
                    </Button>

                    <Button
                      borderRadius={"sm"}
                      bg={`red.400`}
                      textColor={`white`}
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        setProductToDelete(product);
                        onOpen();
                      }}
                      _hover={{
                        bg: "red.500",
                      }}
                    >
                      <FiTrash />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>TITLE</Th>
              <Th>CATEGORY</Th>
              <Th>THUMBNAIL</Th>
              <Th>PRICE</Th>
              <Th>STOCK</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title={"Are You Sure ?"}
        description={
          "Are you sure you want to delete this product? This action cannot be undone."
        }
        okTxt={"Delete"}
        cancelText={"Cancel"}
        isLoading={isDestroy}
        okHandler={() => {
          deleteProduct(productToDelete.documentId);
        }}
      />
      {/* End Custom Alert Dialog */}
      {/* Custom Edit Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Product"}
        okText={"Update"}
        cancelText={"cancel"}
        handleOk={submitHandler}
        isLoading={isUpdating}
      >
        <FormControl mb={4}>
          <FormLabel>Product Title</FormLabel>
          <Input
            placeholder="title"
            value={productToEdit?.title}
            onChange={inputChangeHandler}
            name="title"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Category</FormLabel>
          <Select
            onChange={categoryChangeHandlerEdit}
            name="categories"
            defaultValue={selectedCategory?.name}
            placeholder="Select option"
          >
            {categoriesData?.data.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <Textarea
            value={productToEdit?.description}
            onChange={inputChangeHandler}
            placeholder="Here is a sample placeholder"
            size="sm"
            name="description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Price</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            defaultValue={productToEdit?.price}
            onChange={priceInputChangeHandler}
            name="price"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Stock</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.stock}
            precision={0}
            step={1}
            onChange={stockInputChangeHandler}
            name="stock"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </CustomModal>
      {/* End Custom Edit Modal */}
      {/* Custom create Modal */}
      <CustomModal
        isOpen={isModalCreateOpen}
        onClose={onModalCreateClose}
        title={"create a Product"}
        okText={"Create"}
        cancelText={"cancel"}
        handleOk={submitCreateHandler}
        isLoading={isCreating}
      >
        <FormControl mb={4}>
          <FormLabel>Product Title</FormLabel>
          <Input
            type="text"
            placeholder="title"
            onChange={inputChangeCreateHandler}
            name="title"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Category</FormLabel>
          <Select
            onChange={categoryChangeHandlerCreate}
            name="categories"
            defaultValue={selectedCategory?.name}
            placeholder="Select a category"
          >
            {categoriesData?.data.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <Textarea
            value={productToEdit?.description}
            onChange={inputChangeCreateHandler}
            placeholder="Here is a sample placeholder"
            size="sm"
            name="description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Price</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            defaultValue={productToEdit?.price}
            onChange={priceInputChangeCreateHandler}
            name="price"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Product Stock</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.stock}
            precision={0}
            step={1}
            onChange={stockInputChangeCreateHandler}
            name="stock"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        
      </CustomModal>

      {/* End Custom create Modal */}
    </>
  );
};

export default DashboardProductsTable;



