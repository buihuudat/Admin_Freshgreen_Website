import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { NewsType } from "../../../types/newsType";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserType } from "../../../types/userType";
import { useAppDispatch } from "../../../redux/hooks";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../utils/api/userApi";
import { newsActions } from "../../../actions/newsActions";
import { setNewsModal } from "../../../redux/slices/modalSlice";
import { ProductType } from "../../../types/productType";

interface ProductItemProps {
  product: ProductType;
}

const ProductItem = memo((props: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const handleView = () => {
  //   dispatch(setNewsModal({ open: true, data: props.news }));
  // };

  // const handleDelete = async () => {
  //   dispatch(newsActions.delete(props.news._id as string));
  // };

  return <Box>product</Box>;
});

export default ProductItem;
