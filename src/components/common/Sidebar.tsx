import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Tag";
import { mainColor } from "../../resources/color";
import { Avatar, Button, Card, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { authAction } from "../../actions/authActions";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sidebarData = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/",
    badge: 0,
    active: true,
  },
  {
    icon: <ShoppingBasketIcon />,
    text: "Orders",
    path: "/orders",
    badge: 0,
    active: true,
  },
];

const sidebarHandleData = [
  {
    icon: <SupervisedUserCircleIcon />,
    text: "Users",
    path: "/users",
    badge: 0,
    active: true,
  },

  {
    icon: <Inventory2Icon />,
    text: "Products",
    path: "/products",
    badge: 0,
    active: true,
  },
  {
    icon: <NewspaperIcon />,
    text: "News",
    path: "/news",
    badge: 0,
    active: true,
  },
  {
    icon: <StorefrontIcon />,
    text: "Shops",
    path: "/shops",
    badge: 0,
    active: true,
  },
  {
    icon: <LocalOfferIcon />,
    text: "Vouchers",
    path: "/vouchers",
    badge: 0,
    active: true,
  },
  {
    icon: <CategoryIcon />,
    text: "Categories",
    path: "/categories",
    badge: 0,
    active: true,
  },
  {
    icon: <TagIcon />,
    text: "Tags",
    path: "/tags",
    badge: 0,
    active: true,
  },
];

interface UserInfoProps {
  open: boolean;
}

const UserInfo: React.FC<UserInfoProps> = React.memo(({ open }) => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        py: 3,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate("/profile")}
    >
      <Avatar
        src={user?.avatar}
        sx={{
          mx: "auto",
          width: open ? 100 : 40,
          height: open ? 100 : 40,
          border: `5px solid ${mainColor}`,
        }}
        alt={user?.fullname?.firstname}
      />
      {open && (
        <Typography fontWeight={600} fontSize={23}>
          {user?.fullname?.lastname}
        </Typography>
      )}
      {open && (
        <Typography>
          Role:
          <b> {user?.role}</b>
        </Typography>
      )}
    </Card>
  );
});

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography fontWeight={600} fontSize={23} color={mainColor}>
            {open ? "Bui Huu Dat" : ""}
          </Typography>
          <IconButton onClick={() => setOpen(!open)}>
            {!open ? <FormatListBulletedIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarData.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  background: pathname === data.path ? mainColor : "",
                }}
                onClick={() => navigate(data.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarHandleData.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 45,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  background: pathname === data.path ? mainColor : "",
                }}
                onClick={() => navigate(data.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto" }}>
          <UserInfo open={open} />
          <Button
            variant="outlined"
            color="info"
            fullWidth
            onClick={() => authAction.logout({ navigate })}
          >
            <PowerSettingsNewIcon sx={{ color: "red" }} />
            {open && <Typography color={"red"}>Log out</Typography>}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
