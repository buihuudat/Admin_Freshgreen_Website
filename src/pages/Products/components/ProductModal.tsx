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
import SelectUser from "../../Shops/components/SelectUser";
import { productActions } from "../../../actions/productActions";
import { imageUpload } from "../../../utils/handlers/imageUploadClound";
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
  height: 600,
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
  description: "",
  tag: "",
  discount: "",
  price: "",
  brand: "",
  quantity: "",
};

const ProductModal = memo(() => {
  const { open, data } = useAppSelector(
    (state: RootState) => state.product.modal
  );
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.news.isLoading);

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
  const [userSelected, setUserSelected] = useState<string>("");

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
          tags,
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
    setImages([]);
    setUserSelected("");
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

  const handleProduct = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newProduct: ProductType = {
      images: await Promise.all(images.map((image) => imageUpload(image))),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      discount: Number(formData.get("descount")),
      brand: formData.get("brand") as string,
      quantity: Number(formData.get("quantity")),
      category: category === "" ? dataSelect.categories[0].name : category,
      tags,
      shop: userSelected,
    };

    let err = false;

    if (!newProduct.images.length) {
      NotificationToast({
        message: "You haven't selected a photo yet",
        type: "error",
      });
      return;
    }

    if (newProduct.title.length < 10 || newProduct.title.length > 50) {
      setErrText((prev) => ({
        ...prev,
        title: "Title must be between 10 and 50 characters long.",
      }));
      err = true;
    }

    if (newProduct.brand.length < 3 || newProduct.brand.length > 50) {
      setErrText((prev) => ({
        ...prev,
        brand: "Brand must be between 3 and 50 characters long.",
      }));
      err = true;
    }

    if (newProduct.description.length < 100) {
      setErrText((prev) => ({
        ...prev,
        description: "Desciption must be at 100 characters.",
      }));
      err = true;
    }

    if (newProduct.price < 0) {
      setErrText((prev) => ({
        ...prev,
        price: "Invalid price.",
      }));
      err = true;
    }

    if (newProduct.discount < 0 || newProduct.discount > 100) {
      setErrText((prev) => ({
        ...prev,
        disccoun: "Invalid price.",
      }));
      err = true;
    }

    if (newProduct.quantity < 0) {
      setErrText((prev) => ({
        ...prev,
        quantity: "Invalid quantity.",
      }));
      err = true;
    }

    if (!newProduct.tags.length) {
      setErrText((prev) => ({
        ...prev,
        tag: "You haven't selected a tag yet.",
      }));
      err = true;
    }

    if (err) return;

    setErrText(initialError);

    await dispatch(productActions.create(newProduct))
      .unwrap()
      .then(() => {
        dispatch(setProductModal({ open: false }));
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case "title":
                setErrText((prev) => ({
                  ...prev,
                  title: e.msg,
                }));
                break;
              case "description":
                setErrText((prev) => ({
                  ...prev,
                  description: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={"form"} onSubmit={handleProduct}>
        <Typography align="center" fontWeight={600} fontSize={32} m={2}>
          {data ? "Update" : "Create"} product
        </Typography>

        {/* form */}
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

          <SelectUser
            userSelected={userSelected}
            setUserSelected={setUserSelected}
          />

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
            error={errText.description !== ""}
            helperText={errText.description}
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
              error={errText.price !== ""}
              helperText={errText.price}
              type="number"
            />
            <TextField
              label="Discount %"
              name="discount"
              type="number"
              defaultValue={data?.discount ?? product.discount}
              error={errText.discount !== ""}
              helperText={errText.discount}
            />
            <TextField
              label="Brand"
              name="brand"
              defaultValue={data?.brand ?? product.brand}
              required
              error={errText.brand !== ""}
              helperText={errText.brand}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              defaultValue={data?.quantity ?? product.quantity}
              required
              error={errText.quantity !== ""}
              helperText={errText.quantity}
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

        {/* form button */}
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
            type="submit"
          >
            {data ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
});

export default memo(ProductModal);
