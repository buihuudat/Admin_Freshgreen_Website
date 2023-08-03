interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
  more: string;
}

export enum UserRole {
  user = "user",
  staff = "staff",
  producer = "producer",
  admin = "admin",
  superadmin = "superadmin",
}

interface FullnameOfUser {
  firstname: string;
  lastname: string;
}

export interface UserType {
  _id?: string;
  fullname: FullnameOfUser;
  email: string;
  phone: string;
  username: string;
  password?: string;
  avatar?: string;
  address: UserAddress;
  role: UserRole;
  following?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialUser: UserType = {
  fullname: {
    firstname: "",
    lastname: "",
  },
  email: "",
  phone: "",
  username: "",
  password: "",
  avatar: "",
  address: {
    city: "",
    district: "",
    ward: "",
    street: "",
    more: "",
  },
  role: UserRole.user,
  following: [""],
};
