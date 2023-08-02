import { CategoryType } from "./categoryType";
import { TagType } from "./tagType";

interface RatingsType {
  stars: number;
  count: number;
}

export interface ProductType {
  _id?: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  lastPrice: number;
  discount: number;
  star: {
    count: number;
  };
  ratings: Array<RatingsType>;
  category: string;
  tags: Array<TagType>;
  status: boolean;
  quantity: number;
  currentQuantity: number;
  brand: string;
  shop: string;
  comments: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialProduct: ProductType = {
  _id: "",
  images: [],
  title: "",
  description: "",
  price: 0,
  lastPrice: 0,
  discount: 0,
  star: {
    count: 0,
  },
  ratings: [],
  category: "",
  tags: [],
  status: false,
  quantity: 0,
  currentQuantity: 0,
  brand: "",
  shop: "",
  comments: [],
  createdAt: "",
  updatedAt: "",
};
