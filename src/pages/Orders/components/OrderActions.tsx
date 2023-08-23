import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { OrderItemType, OrderStatus } from "../../../types/orderType";
import { memo, useState } from "react";
import { UserType } from "../../../types/userType";
import { useAppDispatch } from "../../../redux/hooks";
import { orderActions } from "../../../actions/orderActions";

interface Props {
  order: OrderItemType;
  user: UserType;
}
const OrderActions = memo((props: Props) => {
  const { order, user } = props;
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState("");

  const handleSubmit = () => {
    dispatch(
      orderActions.submitStatusOrder({
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.access,
      })
    );
  };
  const handleRefure = () => {
    if (message.length < 5) {
      setMessageErr("Lý do không hợp lệ");
      return;
    }
    dispatch(
      orderActions.submitStatusOrder({
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.refuse,
        message,
      })
    );
    setMessageErr("");
    setShow(false);
  };

  return order.status === OrderStatus.pending ? (
    <Box sx={{ display: "flex", gap: 1, p: 1, flexDirection: "column" }}>
      <LoadingButton
        fullWidth
        color="primary"
        variant="outlined"
        onClick={handleSubmit}
      >
        Xác nhận đơn hàng
      </LoadingButton>
      {!show ? (
        <LoadingButton
          fullWidth
          color="error"
          variant="outlined"
          onClick={() => setShow(!show)}
        >
          Hủy đơn hàng
        </LoadingButton>
      ) : (
        <Box>
          <TextField
            name="message"
            label="message"
            onChange={(e) => setMessage(e.target.value)}
            required
            fullWidth
            error={messageErr !== ""}
            helperText={messageErr}
          />
          <Box display={"flex"} flexDirection={"row"}>
            <LoadingButton
              fullWidth
              color="warning"
              variant="outlined"
              onClick={() => setShow(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="error"
              variant="contained"
              onClick={handleRefure}
            >
              Xác nhận
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  ) : order.status === OrderStatus.access ? (
    <Button variant="text" fullWidth color="success" disabled>
      Đang giao hàng
    </Button>
  ) : (
    <Box p={1}>
      <Button variant="text" fullWidth color="error" disabled>
        Đã hủy
      </Button>
      <Typography>
        Lí do:{" "}
        <b style={{ color: "red" }}>
          <i>{order.message}</i>
        </b>
      </Typography>
    </Box>
  );
});

export default OrderActions;
