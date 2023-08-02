import { NewsType } from "../../../types/newsType";
import { Box, LinearProgress, Typography } from "@mui/material";
import NewsItem from "./NewsItem";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { memo } from "react";

const NewsList = memo(({ newsList }: { newsList: NewsType[] }) => {
  const loading = useAppSelector((state: RootState) => state.news.isLoading);

  return loading ? (
    <LinearProgress />
  ) : !newsList.length ? (
    <Typography fontSize={23} fontWeight={600} align="center">
      There are no news yet
    </Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        px: 3,
      }}
    >
      {newsList.map((news: NewsType) => (
        <NewsItem key={news._id} news={news} />
      ))}
    </Box>
  );
});

export default NewsList;
