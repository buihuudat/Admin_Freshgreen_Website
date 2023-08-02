import { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import { Box, CircularProgress } from "@mui/material";
import { categoryActions } from "../../actions/categoryActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { CategoryType } from "../../types/categoryType";

const Categories = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryErrText, setCategoryErrText] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const loading = useAppSelector((state: RootState) => state.category.loading);

  useEffect(() => {
    dispatch(categoryActions.gets());
  }, [dispatch]);

  const handleChange = async () => {
    if (category === "") {
      setCategoryErrText("Bạn chưa nhập thêm thể loại");
      return;
    }
    await dispatch(categoryActions.create({ name: category }));
    setCategory("");
  };

  const handleDelete = async (category: CategoryType) => {
    setIsPending(true);
    await dispatch(categoryActions.delete(category));
    setIsPending(false);
  };
  return (
    <Box display={"flex"} gap={10} justifyContent={"center"}>
      <CategoryForm
        category={category}
        setCategory={setCategory}
        onChange={handleChange}
        categoryErrText={categoryErrText}
        isLoading={loading}
      />
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} width={"50%"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box width={"50%"}>
          <CategoryTable
            categories={categories}
            onDelete={handleDelete}
            isPending={isPending}
          />
        </Box>
      )}
    </Box>
  );
};

export default Categories;
