import { Box, LinearProgress, Typography } from "@mui/material";
import NewsItem from "./NewsItem";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { memo } from "react";
import { ProductType } from "../../../types/productType";

const ProductList = memo(({ products }: { products: ProductType[] }) => {
  const loading = useAppSelector((state: RootState) => state.news.isLoading);

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
        <NewsItem key={product._id} product={product} />
      ))}
    </Box>
  );
});

export default ProductList;
