import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductType } from "../../../types/productType";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { formatDateInput } from "../../../utils/handlers/formatDateInput";
import { formattedAmount } from "../../../utils/handlers/formatMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../redux/hooks";
import { productActions } from "../../../actions/productActions";
import EditIcon from "@mui/icons-material/Edit";
import { setProductModal } from "../../../redux/slices/productSlice";

const ProductItem = memo(({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();

  const handleView = () => {};

  const handleEdit = useCallback(() => {
    dispatch(setProductModal({ open: true, data: product }));
  }, [dispatch, product]);

  const handleDelete = () => {
    product._id && dispatch(productActions.delete(product._id));
  };

  return (
    <Box>
      <Card sx={{ width: 300, height: 500 }}>
        {/* shop info */}
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            pt: 1,
          }}
        >
          <Avatar
            src={product.shop.user?.avatar}
            alt={product.shop.name}
            sx={{ width: 40, height: 40 }}
          />
          <Typography>{product.shop.name || "Anonymous"}</Typography>
        </CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"13"} fontStyle={"italic"}>
            {formatDateInput(product.createdAt)}
          </Typography>
          <Typography
            fontSize={"13"}
            fontStyle={"italic"}
            fontWeight={600}
            color={"red"}
          >
            count:{product.currentQuantity}
          </Typography>
          <Typography
            fontSize={"13"}
            fontStyle={"italic"}
            fontWeight={600}
            color={"red"}
          >
            sold:{product.sold}
          </Typography>
        </CardContent>
        <CardMedia
          component={"img"}
          src={product.images[0]}
          sx={{ objectFit: "cover", height: 200 }}
        />
        <CardContent>
          <Typography
            align="center"
            fontSize={23}
            fontWeight={600}
            textTransform={"capitalize"}
          >
            {product.title.length > 20
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Typography
              fontSize={28}
              fontWeight={600}
              color={"#555"}
              sx={{ textDecoration: "line-through" }}
            >
              {formattedAmount(product.price ?? 0)}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Typography fontSize={25} fontWeight={600} color={"green"}>
              {formattedAmount(product.lastPrice ?? 0)}
            </Typography>
            <Typography fontSize={22} fontWeight={600} color={"orange"}>
              {product.discount}%
            </Typography>
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="warning" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleView}>
            <VisibilityIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
});

export default ProductItem;
