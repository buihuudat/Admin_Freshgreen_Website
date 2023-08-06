import { Box, SpeedDial } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import Search from "../../components/common/Search";
import { productActions } from "../../actions/productActions";
import { RootState } from "../../redux/store";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import { setProductModal } from "../../redux/slices/productSlice";
import { ProductType } from "../../types/productType";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const products = useAppSelector((state: RootState) => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.gets());
  }, [dispatch]);

  const handleOpenModel = () => {
    dispatch(setProductModal({ open: true }));
  };

  const filterProductsList = useMemo(
    () =>
      products.length
        ? products.filter((product: ProductType) =>
            product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [],
    [products, searchQuery]
  );

  return (
    <Box>
      <Search
        placeholder="product..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ProductModal />
      <ProductList products={filterProductsList} />
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
    </Box>
  );
};

export default Products;
