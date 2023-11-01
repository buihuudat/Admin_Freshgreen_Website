import { Avatar, Box, Paper, Typography } from "@mui/material";
import { UserType, fullnameOfUser } from "../../../../types/userType";

interface Props {
  fromSeft: boolean;
  message: string;
  reveicer: any;
  user: UserType;
}

const MessageItem = (props: Props) => {
  const { message, fromSeft, reveicer, user } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fromSeft ? "start" : "end",
        pb: 2,
      }}
    >
      <Paper elevation={5} sx={{ width: "max-content" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            padding: 1,
            flexDirection: fromSeft ? "row" : "row-reverse",
          }}
        >
          <Avatar
            src={fromSeft ? reveicer.avatar : user.avatar}
            alt={"avatar"}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: fromSeft ? "start" : "end",
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              {fromSeft ? reveicer.name : fullnameOfUser(user.fullname)}
            </Typography>
            <Typography textAlign={"justify"}>{message}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageItem;
