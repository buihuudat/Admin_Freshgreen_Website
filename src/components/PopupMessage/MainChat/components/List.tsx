import { Avatar, Box, Divider, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useAppDispatch } from "../../../../redux/hooks";
import { selectUser } from "../../../../redux/slices/messageSlice";
import { mainColor } from "../../../../resources/color";

const data = [
  {
    user: {
      name: "test",
      avatar: "",
    },
    lastMessage: "string",
    time: "10:11",
    seen: false,
  },
];

const ListItem = (data: any) => {
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(selectUser(data));
  };

  return (
    <Box sx={{ cursor: "pointer" }} onClick={handleSelect}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingTop: 2,
          pr: 2,
        }}
      >
        <Avatar src={data.user?.avatar} />
        <Box width={"100%"}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>
              {data.user.name.length > 10
                ? data.user.name.slice(0, 10) + "..."
                : data.user.name}
            </Typography>
            {data.seen && (
              <Box component={"li"} sx={{ color: mainColor }}></Box>
            )}
            <Typography
              fontWeight={600}
              color={"#777"}
              fontSize={13}
              fontStyle={"italic"}
            >
              {data.time}
            </Typography>
          </Box>
          <Typography fontSize={14} color={!data.seen ? "#555" : "#000"}>
            {data.lastMessage.length > 16
              ? data.lastMessage.slice(0, 16) + "..."
              : data.lastMessage}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ pt: 1 }} />
    </Box>
  );
};

function List() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <ListIcon />
        <Typography fontWeight={600}>Danh sách</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        {data.map((d, i) => (
          <ListItem {...d} key={i} />
        ))}
      </Box>
    </Box>
  );
}

export default List;
