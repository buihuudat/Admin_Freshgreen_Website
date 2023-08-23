import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { ShopType } from "../../../types/shopType";
import { userApi } from "../../../utils/api/userApi";
import { UserType } from "../../../types/userType";
import { notImage } from "../../../resources/images";
import moment from "moment";

const ShopItem = memo(({ shop }: { shop: ShopType }) => {
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getUser(shop.user);
        if (res.data) setUserInfo(res.data);
      } catch (error) {
        return false;
      }
    };
    getUser();
  }, [shop.user]);

  const handleView = () => {
    console.log("viewing");
  };

  // const handleDelete = async () => {
  //   dispatch(newsActions.delete(props.news._id as string));
  // };

  return (
    <Box>
      <Card
        sx={{
          width: 200,
          height: 300,
        }}
      >
        <CardActionArea onClick={handleView}>
          <CardMedia
            component={"img"}
            image={shop.image ?? notImage}
            sx={{ width: "100%", height: 150, objectFit: "cover" }}
          />
          <Typography>
            <i> Created: {moment(shop.createdAt).format("l")}</i>
          </Typography>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              m: 1,
              p: 1,
            }}
          >
            <Avatar src={userInfo?.avatar} alt={userInfo?.username} />
            <Typography fontWeight={600}>
              {userInfo?.fullname.firstname + " " + userInfo?.fullname.lastname}
            </Typography>
          </Paper>

          <Typography fontWeight={600} fontSize={22} align="center">
            {shop.name}
          </Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
});

export default ShopItem;
