import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

interface HomeTabsProps {
  select: string;
  setSelect: (select: string) => void;
}
export default function HomeTabs(props: HomeTabsProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.setSelect(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={props.select} onChange={handleChange} centered>
        <Tab
          value={"day"}
          label={<Typography fontWeight={600}>Ngày</Typography>}
        />
        <Tab
          value={"month"}
          label={<Typography fontWeight={600}>Tháng</Typography>}
        />
        <Tab
          value={"year"}
          label={<Typography fontWeight={600}>Năm</Typography>}
        />
      </Tabs>
    </Box>
  );
}
