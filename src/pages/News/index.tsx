import { Box, SpeedDial } from "@mui/material";
import NewsModel from "./components/NewsModel";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import NewsList from "./components/NewsList";
import { useEffect, useMemo, useState } from "react";
import { newsActions } from "../../actions/newsActions";
import Search from "../../components/common/Search";
import { setProductModal } from "../../redux/slices/productSlice";

const News = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const newsList = useAppSelector((state) => state.news.newsList);

  useEffect(() => {
    dispatch(newsActions.gets());
  }, [dispatch]);

  const handleOpenModel = () => {
    dispatch(setProductModal({ open: true }));
  };

  const filterNewsList = useMemo(
    () =>
      newsList.filter((news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [newsList, searchQuery]
  );

  return (
    <Box>
      <Search
        placeholder="news..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <NewsModel />
      <NewsList newsList={filterNewsList} />
      <SpeedDial
        ariaLabel="Create an news"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenModel}
      />
    </Box>
  );
};

export default News;
