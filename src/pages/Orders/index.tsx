import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Box, LinearProgress } from "@mui/material";
import OrderItem from "./components/OrderItem";
import Tabs from "./components/Tabs";
import { OrderStatus, OrderType } from "../../types/orderType";
import Search from "../../components/common/Search";

const Orders = () => {
  const orders = useAppSelector((state: RootState) => state.order.data);
  const loading = useAppSelector((state: RootState) => state.order.loading);
  const [value, setValue] = useState<OrderStatus>(OrderStatus.pending);
  const [ordersFilter, setOrdersFilter] = useState<OrderType[]>(orders);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setOrdersFilter(
      orders.filter((order) => {
        const user = order.user;
        const username = user.username.toLowerCase();
        const email = user.email.toLowerCase();
        const firstname = user.fullname.firstname.toLowerCase();
        const lastname = user.fullname.lastname.toLowerCase();
        const lowerSearchQuery = searchQuery.toLowerCase();

        return (
          order.order.status === value &&
          (username.includes(lowerSearchQuery) ||
            email.includes(lowerSearchQuery) ||
            firstname.includes(lowerSearchQuery) ||
            lastname.includes(lowerSearchQuery))
        );
      })
    );
  }, [value, orders, searchQuery]);

  return (
    <Box>
      <Box
        position={"fixed"}
        display={"flex"}
        alignItems={"center"}
        sx={{ backdropFilter: "blur(50px)" }}
        width={"100%"}
      >
        <Tabs value={value} setValue={setValue} />
        <Search
          placeholder={"Customer..."}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Box>
      <Box sx={{ pt: 8 }}>
        {loading && <LinearProgress />}

        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
          {ordersFilter?.map((order, index) => (
            <OrderItem {...order} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
