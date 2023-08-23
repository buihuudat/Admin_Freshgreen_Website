import { Box, Paper, Typography } from "@mui/material";
import Area from "./components/chart/Area";
import CartItem from "./components/Cart";
import PieChart from "./components/chart/Pie";
import Bar from "./components/chart/BarChart";
import Date from "./components/Date";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { OrderStatus, OrderType, PayStatus } from "../../types/orderType";
import moment from "moment";
import _ from "lodash";
import HomeTabs from "./components/HomeTabs";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import OrderTable from "./components/OrderTable";
import { ProductType } from "../../types/productType";

dayjs.extend(isBetweenPlugin);

const HomePage = () => {
  const orderData = useAppSelector((state: RootState) => state.order.data);
  const [select, setSelect] = useState("day");
  const [orders, setOrders] = useState<OrderType[]>(orderData);
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(moment().format("yyyy-MM-D"))
  );
  const [dateSelected, setDateSelected] = useState({
    d: 1,
    m: 1,
    y: 2000,
  });
  const [spend, setSpend] = useState<{ name: string; value: number }>({
    name: "day",
    value: 1,
  });
  const [order, setOrder] = useState({
    pending: 0,
    access: 0,
    done: 0,
    payNow: 0,
    lastPay: 0,
  });

  const currentDate = useMemo(
    (v?: string) => moment(date?.toString()).format(v || "L"),
    [date]
  );

  useEffect(() => {
    setDateSelected({
      d: +moment(currentDate).format("D"),
      m: +moment(currentDate).format("M"),
      y: +moment(currentDate).format("YYYY"),
    });
  }, [currentDate]);

  useEffect(() => {
    switch (select) {
      case "day":
        setSpend({ name: "Ngày", value: dateSelected.d });
        setOrders(
          orderData.filter(
            (data) =>
              +moment(data.order.createdAt).format("D") === dateSelected.d
          )
        );
        break;
      case "month":
        setSpend({ name: "Tháng", value: dateSelected.m });
        setOrders(
          orderData.filter(
            (data) =>
              +moment(data.order.createdAt).format("M") === dateSelected.m
          )
        );
        break;
      case "year":
        setSpend({ name: "Năm", value: dateSelected.y });
        setOrders(
          orderData.filter(
            (data) =>
              +moment(data.order.createdAt).format("yyyy") === dateSelected.y
          )
        );
        break;
      default:
        setSpend({ name: "Ngày", value: dateSelected.d });
        setOrders(
          orderData.filter(
            (data) =>
              +moment(data.order.createdAt).format("D") === dateSelected.d
          )
        );
        break;
    }
  }, [dateSelected, select, orderData]);

  useEffect(() => {
    setOrder({
      pending: orders.filter((o) => o.order.status === OrderStatus.pending)
        .length,
      access: orders.filter((o) => o.order.status === OrderStatus.access)
        .length,
      payNow: orders.filter((o) => o.order.pay.status === PayStatus.success)
        .length,
      lastPay: orders.filter((o) => o.order.pay.status === PayStatus.pending)
        .length,
      done: orders.filter((o) => o.order.status === OrderStatus.done).length,
    });
  }, [orders]);

  const ordersData = useMemo(() => {
    return orders.flatMap((data) => data.order);
  }, [orders]);

  const pieData = useMemo(() => {
    const groupedProducts = _.groupBy(
      _.flatMap(
        ordersData.filter((order) => order.status === OrderStatus.done),
        (data) => data.products
      ),
      "title"
    );
    const summedProducts = _.map(groupedProducts, (products, name) => ({
      name,
      count: _.sumBy(products, "count"),
    }));
    return summedProducts.slice(0, 8);
  }, [ordersData]);

  const chartdata = useMemo(() => {
    return ordersData.map((order) => ({
      date: moment(order.createdAt).format("D/M/yyyy"),
      Done: order.status === OrderStatus.done && order.totalPrice,
      Refure: order.status === OrderStatus.refuse && order.totalPrice,
      Access: order.status === OrderStatus.access && order.totalPrice,
    }));
  }, [ordersData]);

  const barData = useMemo(() => {
    const groupedProducts = _.groupBy(
      _.flatMap(
        ordersData.filter((order) => order.status === OrderStatus.done),
        (data) => data.products
      ),
      "title"
    );

    const summedProducts = _.map(groupedProducts, (products, name) => ({
      name,
      Price: _.sumBy(products, "price"),
    }));
    return summedProducts.slice(0, 8);
  }, [ordersData]);

  const totalPrice = useMemo(() => {
    return ordersData
      .filter((order) => order.status === OrderStatus.done)
      .reduce((prev, order) => prev + order.totalPrice, 0);
  }, [ordersData]);

  const orderTable = useMemo(() => {
    const products = orders
      .map((data) => data.order.products)
      .flatMap((product) => product);

    return products.map((product: ProductType, index) => ({
      id: `${product._id?.toString()} + ${index} `,
      time: moment(product.createdAt).format("D-MM-yyyy"),
      image: product.images[0],
      name: product.title,
      price: Number(product.lastPrice),
      category: product.category,
      sold: product.sold || 0,
      quantity: product.quantity,
      status: product.status,
    }));
  }, [orders]);

  return (
    <div>
      <HomeTabs select={select} setSelect={setSelect} />
      <Typography
        align="center"
        fontWeight={600}
        mb={1}
        fontSize={25}
        color={"#ddd"}
      >
        Thống kê Ngày {dateSelected.d} tháng {dateSelected.m} năm{" "}
        {dateSelected.y}
      </Typography>

      <Box display={"flex"} flexDirection={"row"}>
        <CartItem title="Access" value={order.access} color="blue" />
        <CartItem title="Pending" value={order.pending} color="orange" />
        <CartItem title="Done" value={order.done} color="green" />
        <CartItem
          title="Thanh toán online"
          value={order.payNow}
          color="indigo"
        />
        <CartItem title="Thanh toán sau" value={order.lastPay} color="zinc" />
        <CartItem
          title="Tổng doanh thu"
          value={totalPrice}
          color="pink"
          type={"number"}
        />
      </Box>

      <Box py={3}>
        <Area data={chartdata} spend={spend} />
      </Box>

      <Box display={"flex"} flexDirection={"row"} gap={3}>
        <PieChart data={pieData} />
        <Bar data={barData} />
        <Paper
          sx={{
            background: "#111827",
            borderRadius: 2,
          }}
        >
          <Date date={date} setDate={setDate} />
        </Paper>
      </Box>

      <Box my={3}>
        <OrderTable data={orderTable} />
      </Box>
    </div>
  );
};

export default HomePage;
