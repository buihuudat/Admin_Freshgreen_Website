import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Box, LinearProgress } from "@mui/material";
import OrderItem from "./components/OrderItem";
import Tabs from "./components/Tabs";
import { OrderStatus, OrderType } from "../../types/orderType";

const Orders = () => {
  const orders = useAppSelector((state: RootState) => state.order.data);
  const loading = useAppSelector((state: RootState) => state.order.loading);
  const [value, setValue] = useState<OrderStatus>(OrderStatus.pending);
  const [ordersFilter, setOrdersFilter] = useState<OrderType[]>(orders);

  useEffect(() => {
    setOrdersFilter(orders.filter((order) => order.order.status === value));
  }, [value, orders]);

  return (
    <Box>
      <Tabs value={value} setValue={setValue} />
      {loading ? (
        <LinearProgress />
      ) : (
        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
          {ordersFilter?.map((order, index) => (
            <OrderItem {...order} key={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Orders;
