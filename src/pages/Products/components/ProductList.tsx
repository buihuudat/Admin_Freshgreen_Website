import { Box, LinearProgress, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { memo } from "react";
import { ProductType } from "../../../types/productType";
import ProductItem from "./ProductItem";

const ProductList = memo(({ products }: { products: ProductType[] }) => {
  const loading = useAppSelector((state: RootState) => state.product.loading);

  return loading ? (
    <LinearProgress />
  ) : !products.length ? (
    <Typography fontSize={23} fontWeight={600} align="center">
      There are no product yet!
    </Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        px: 3,
      }}
    >
      {products.map((product: ProductType) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </Box>
  );
});

export default ProductList;
