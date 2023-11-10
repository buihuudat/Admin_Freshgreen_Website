import { Box } from "@mui/material";
import HomeSwiper from "./components/HomeSwiper";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Banner from "./components/Banner";
import EmailForm from "./components/EmailForm";

export default function Settings() {
  const { settings } = useAppSelector((state: RootState) => state.settings);
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      <HomeSwiper settings={settings} user={user} />
      <Banner />

      <EmailForm />
    </Box>
  );
}
