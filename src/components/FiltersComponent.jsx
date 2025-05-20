import {
  Box,
  Heading,
  Divider,
  Checkbox,
  CheckboxGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RadioGroup,
  Radio,
  Stack,
  Button,
  ButtonGroup,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useState } from 'react';

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const categories = ['cloths', 'tech', 'smart phones', 'smart watches', 'food'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const ratings = ['5', '4', '3', '2', '1'];

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSize('');
    setSelectedRating('');
  };

  return (
    <Box
      w="xs"
      p={4}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="md"
      position="sticky"
      top="4"
      h="fit-content"
      overflowY="auto"
    >
      <Heading as="h3" size="md" mb={4}>
        Filters
      </Heading>

      <Accordion defaultIndex={[0]} allowMultiple>
        {/* Price Filter */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">Price Range</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Slider
              aria-label={['min-price', 'max-price']}
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
              min={0}
              max={1000}
              step={50}
            >
              <SliderTrack bg="gray.100">
                <SliderFilledTrack bg="blue.500" />
              </SliderTrack>
              <SliderThumb boxSize={6} index={0} />
              <SliderThumb boxSize={6} index={1} />
            </Slider>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        {/* Category Filter */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">Categories</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
              <Stack spacing={2}>
                {categories.map((category) => (
                  <Checkbox key={category} value={category}>
                    {category}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">Brands</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <CheckboxGroup value={selectedBrands} onChange={setSelectedBrands}>
              <Stack spacing={2}>
                {brands.map((brand) => (
                  <Checkbox key={brand} value={brand}>
                    {brand}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">Size</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ButtonGroup size="sm" isAttached variant="outline">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'solid' : 'outline'}
                  onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
          </AccordionPanel>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">Rating</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <RadioGroup value={selectedRating} onChange={setSelectedRating}>
              <Stack spacing={2}>
                {ratings.map((rating) => (
                  <Radio key={rating} value={rating}>
                    {'⭐'.repeat(Number(rating))}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Divider my={4} />

      <Button
        w="full"
        colorScheme="red"
        variant="outline"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;