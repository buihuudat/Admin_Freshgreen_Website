import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CategoryType } from "../../../types/categoryType";
import { TagType } from "../../../types/tagType";
import { categoryActions } from "../../../actions/categoryActions";
import { tagActions } from "../../../actions/tagActions";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { RootState } from "../../../redux/store";
import {
  InitialProduct,
  NewProductType,
  ProductType,
} from "../../../types/productType";
import AddIcon from "@mui/icons-material/Add";
import { setProductModal } from "../../../redux/slices/productSlice";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";
import { productActions } from "../../../actions/productActions";
import { imageUpload } from "../../../utils/handlers/imageUploadClound";
import ProductEditor from "../../../components/common/Editor";
import SelectCategory from "../../../components/SelectCategory";
import SelectTags from "../../../components/SelectTags";
import SelectShop from "../../../components/SelectShop";
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
  height: 800,
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

const ProductModal = () => {
  const { open, data } = useAppSelector(
    (state: RootState) => state.product.modal
  );
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>(() =>
    data ? data : InitialProduct
  );
  const [errText, setErrText] = useState(initialError);
  const [description, setDescription] = useState<string>(() =>
    data ? data.description : ""
  );
  const [category, setCategory] = useState<string>(() =>
    data ? data.category : ""
  );
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [shopSelected, setShopSelected] = useState<string>(() =>
    data ? (data.shop._id as string) : ""
  );
  const [tags, setTags] = useState<TagType[]>(() => (data ? data.tags : []));
  const [dataSelect, setDataSelect] = useState<DataSelect>({
    categories: [],
    tags: [],
  });

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
  const handleClose = useCallback(() => {
    setErrText(initialError);
    setProduct(InitialProduct);
    setTags([]);
    setShopSelected("");
    setCategory("");
    setDescription("");
    setTagsSelected([]);
    setIsLoading(false);
    dispatch(setProductModal({ open: false }));
  }, [dispatch]);

  // handle category change
  const handleCategorySelect = useCallback((e: string) => {
    setCategory(e);
  }, []);

  // handle select tags
  const handleTagsSelect = useCallback((e: any) => {
    setTagsSelected(e);
    setTags(e.map((name: string) => ({ name })));
  }, []);

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

    images?.length &&
      images?.map(({ data }: { data: any }) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, data],
        }));
      });
  };

  // handle remove images
  const handleRemoveImage = useCallback(
    (index: number) => {
      const newImages = [...product.images];
      newImages.splice(index, 1);
      setProduct((prev) => ({
        ...prev,
        images: newImages,
      }));
    },
    [product.images]
  );

  const handleCreateProduct = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      let newProduct: NewProductType = {
        images: [],
        title: formData.get("title") as string,
        description,
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount")),
        brand: formData.get("brand") as string,
        quantity: Number(formData.get("quantity")),
        category: category === "" ? dataSelect.categories[0].name : category,
        tags,
        shop: shopSelected,
      };

      let err = false;

      if (!product.images.length) {
        NotificationToast({
          message: "You haven't selected a photo yet",
          type: "error",
        });
        err = true;
      }

      if (newProduct.title.length < 3 || newProduct.title.length > 50) {
        setErrText((prev) => ({
          ...prev,
          title: "Title must be between 3 and 50 characters long.",
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
        NotificationToast({
          message: "Desciption must be at 100 characters.",
          type: "error",
        });
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
      setIsLoading(true);
      setErrText(initialError);

      newProduct = {
        ...newProduct,
        images: await Promise.all(
          product.images.map((image) => imageUpload(image))
        ),
      };

      await dispatch(productActions.create(newProduct))
        .unwrap()
        .then(() => {
          setErrText(initialError);
          setProduct(InitialProduct);
          setTags([]);
          setShopSelected("");
          setCategory("");
          setDescription("");
          setTagsSelected([]);
          setIsLoading(false);
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
                  NotificationToast({ message: e.msg, type: "error" });
                  break;
                default:
                  break;
              }
            });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [
      dispatch,
      category,
      description,
      shopSelected,
      tags,
      dataSelect.categories,
      product,
    ]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={"form"} onSubmit={handleCreateProduct}>
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
              alignItems: "center",
            }}
          >
            {(data?.images || product.images).map((image, index) => (
              <img
                key={index}
                src={image}
                title="image"
                alt="imageProduct"
                onClick={() => handleRemoveImage(index)}
                style={{ width: "auto", maxHeight: 300, objectFit: "cover" }}
              />
            ))}
            {product.images.length < 6 && (
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "green",
                    flexDirection: "row",
                    width: "auto",
                    height: 100,
                  }}
                >
                  <Typography align="center" fontWeight={600}>
                    Add images
                  </Typography>
                  <AddIcon />
                </Box>
              </label>
            )}
          </Box>

          <SelectShop
            shopSelected={shopSelected}
            setShopSelected={setShopSelected}
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

          <ProductEditor
            content={data?.description ?? description}
            setContent={setDescription}
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
              <SelectCategory
                data={dataSelect.categories}
                errText={errText.category}
                onChange={handleCategorySelect}
                value={data?.category ?? category}
              />
            )}
            {!dataSelect.tags.length ? (
              <CircularProgress />
            ) : (
              <SelectTags
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
            loading={isLoading}
            type="submit"
          >
            {data ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
