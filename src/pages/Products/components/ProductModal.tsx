import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SelectCategoryNews from "./SelectCategoryNews";
import NewsEditor from "./NewsEditor";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CategoryType } from "../../../types/categoryType";
import { TagType } from "../../../types/tagType";
import SelectTagsNews from "./SelectTagsNews";
import { categoryActions } from "../../../actions/categoryActions";
import { tagActions } from "../../../actions/tagActions";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { RootState } from "../../../redux/store";
import { InitialProduct, ProductType } from "../../../types/productType";
import AddIcon from "@mui/icons-material/Add";
import { setProductModal } from "../../../redux/slices/productSlice";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: 2,
  p: 4,
  width: "80%",
  height: 900,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
};

export interface DataSelect {
  categories: Array<CategoryType>;
  tags: Array<TagType>;
}

const initialError = {
  title: "",
  category: "",
  tag: "",
  content: "",
};

const ProductModal = memo(() => {
  const { open, data } = useAppSelector((state) => state.product.modal);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.news.isLoading);
  const userId = useAppSelector((state: RootState) => state.user.user?._id);

  const [product, setProduct] = useState<ProductType>(data ?? InitialProduct);
  const [errText, setErrText] = useState(initialError);
  const [dataSelect, setDataSelect] = useState<DataSelect>({
    categories: [],
    tags: [],
  });
  const [category, setCategory] = useState<string>(data?.category ?? "");
  const [tags, setTags] = useState<TagType[]>(data ? data.tags : []);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(data?.images ?? []);

  // get data select
  useEffect(() => {
    const getData = async () => {
      const [categories, tags] = await Promise.all([
        dispatch(categoryActions.gets()).unwrap(),
        dispatch(tagActions.gets()).unwrap(),
      ]);
      if (categories && tags) {
        setDataSelect({
          categories,
          tags: tags,
        });
      }
    };
    getData();
  }, [dispatch]);

  // handle close modal
  const handleClose = () => {
    setErrText(initialError);
    setProduct(InitialProduct);
    setTags([]);
    setCategory("");
    setTagsSelected([]);
    dispatch(setProductModal({ open: false }));
  };

  // handle category change
  const handleCategorySelect = (e: string) => {
    setCategory(e);
  };

  // handle select tags
  const handleTagsSelect = (e: any) => {
    setTagsSelected(e);
    setTags(e.map((name: string) => ({ name })));
  };

  // handle add images
  const handleAddImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const images = await getBaseImage(e);
    if (images && images.length > 6) {
      NotificationToast({
        message: "The maximun number of images allowed is 6",
        type: "warning",
      });
      return;
    }
    images?.map(({ data }: { data: any }) => {
      setImages((prev) => [...prev, data]);
    });
  };

  // handle remove images
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePostNews = async () => {
    const newProduct: ProductType = product;

    console.log(newProduct);

    setErrText(initialError);

    // dispatch(
    //   data ? newsActions.update(newsData) : newsActions.create(newsData)
    // )
    //   .unwrap()
    //   .then(() => {
    //     dispatch(setNewsModal({ open: false }));
    //   })
    //   .catch((err: any) => {
    //     err.errors &&
    //       err.errors.forEach((e: any) => {
    //         switch (e.path) {
    //           case "title":
    //             setErrText((prev) => ({
    //               ...prev,
    //               title: e.msg,
    //             }));
    //             break;
    //           case "content":
    //             setErrText((prev) => ({
    //               ...prev,
    //               content: e.msg,
    //             }));
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //   });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography align="center" fontWeight={600} fontSize={32} m={2}>
          {data ? "Update" : "Create"} product
        </Typography>

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-around",
              overflowX: "auto ",
            }}
          >
            {!images.length ? (
              <label
                htmlFor="contained-button-file"
                style={{ cursor: "pointer" }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  hidden
                  type="file"
                  onChange={handleAddImages}
                  multiple={true}
                />
                <Box display={"flex"} color={"green"} flexDirection={"row"}>
                  <Typography align="center" fontWeight={600}>
                    Add images
                  </Typography>
                  <AddIcon />
                </Box>
              </label>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  title="image"
                  alt="imageProduct"
                  onClick={() => handleRemoveImage(index)}
                  style={{ width: "auto", maxHeight: 300, objectFit: "cover" }}
                />
              ))
            )}
          </Box>
          <TextField
            fullWidth
            label="Title"
            name="title"
            defaultValue={data?.title ?? product.title}
            required
            error={errText.title !== ""}
            helperText={errText.title}
          />
          <TextField
            fullWidth
            multiline={true}
            label="Description"
            name="description"
            defaultValue={data?.description ?? product.description}
            required
            error={errText.title !== ""}
            helperText={errText.title}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Price"
              name="price"
              defaultValue={data?.price ?? product.price}
              required
              error={errText.title !== ""}
              helperText={errText.title}
              type="number"
            />
            <TextField
              label="Discount %"
              name="discount"
              type="number"
              defaultValue={data?.discount ?? product.discount}
              error={errText.title !== ""}
              helperText={errText.title}
            />
            <TextField
              label="Brand"
              name="brand"
              defaultValue={data?.description ?? product.description}
              required
              error={errText.title !== ""}
              helperText={errText.title}
            />
            <TextField
              label="Quantity"
              name="quantity"
              defaultValue={data?.quantity ?? product.quantity}
              required
              error={errText.title !== ""}
              helperText={errText.title}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!dataSelect.categories.length ? (
              <CircularProgress />
            ) : (
              <SelectCategoryNews
                data={dataSelect.categories}
                errText={errText.category}
                onChange={handleCategorySelect}
                value={data?.category ?? category}
              />
            )}
            {!dataSelect.tags.length ? (
              <CircularProgress />
            ) : (
              <SelectTagsNews
                tagsData={dataSelect.tags}
                tagSelected={
                  !tagsSelected.length
                    ? data
                      ? data.tags.map((tag: TagType) => tag.name)
                      : []
                    : tagsSelected
                }
                handleSelectTags={handleTagsSelect}
                error={errText.tag}
              />
            )}
          </Box>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          mt={"auto"}
          gap={5}
        >
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="success"
            fullWidth
            loading={loading}
            onClick={handlePostNews}
          >
            {data ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
});

export default memo(ProductModal);