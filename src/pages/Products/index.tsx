import { Box, LinearProgress, SpeedDial, Typography } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useState } from "react";
import Search from "../../components/common/Search";
import { productActions } from "../../actions/productActions";
import { RootState } from "../../redux/store";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import { setProductModal } from "../../redux/slices/productSlice";
import { ProductType } from "../../types/productType";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { products, loading } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();
  const [filterProductsList, setFilterProductsList] =
    useState<ProductType[]>(products);

  useEffect(() => {
    dispatch(productActions.gets());
  }, [dispatch]);

  const handleOpenModel = useCallback(() => {
    dispatch(setProductModal({ open: true }));
  }, [dispatch]);

  useEffect(() => {
    const productsResearch = products.length
      ? products.filter((product: ProductType) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    setFilterProductsList(productsResearch);
  }, [products, searchQuery]);

  return (
    <Box px={2}>
      <Box mb={4}>
        <Search
          placeholder="product..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Box>
      {!products.length ? (
        <LinearProgress />
      ) : filterProductsList.length ? (
        <ProductList products={filterProductsList} />
      ) : (
        <Typography fontSize={23} fontWeight={600} align="center">
          There are no product yet!
        </Typography>
      )}
      <SpeedDial
        ariaLabel="Create an product"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenModel}
      />

      <ProductModal />
    </Box>
  );
};

export default Products;
