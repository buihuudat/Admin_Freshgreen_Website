export interface ShopType {
  name: string;
  username: string;
  image: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  bio: string;
  startYear: number;
  products: Array<string>;
  star: {
    count: number;
  };
  ratings: Array<{
    stars: number;
    count: number;
  }>;
  followers: Array<string>;
}
