import { Box } from "@mui/material";
import { memo } from "react";
import { ProductType } from "../../../types/productType";
import ProductItem from "./ProductItem";

const ProductList = memo(({ products }: { products: ProductType[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {products.map((product: ProductType) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </Box>
  );
});

export default ProductList;
