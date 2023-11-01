import { NotificationType } from "../../../types/notificationType";
import { Paper } from "@mui/material";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: Array<NotificationType>;
}

export default function List(props: Props) {
  const { notifications } = props;

  return (
    <Paper elevation={8} sx={{ padding: 5, maxHeight: 500, overflowY: "auto" }}>
      {notifications
        .map((notification) => (
          <NotificationItem key={notification._id} {...notification} />
        ))
        .reverse()}
    </Paper>
  );
}
