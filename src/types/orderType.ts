interface ProductOrder {
  product: string;
  quantity: number;
  totalPrice: number;
  voucherUsed: string;
}

export enum StatusOrder {
  spending,
  success,
  cancel,
  refuse,
  default,
}

export interface OrderType {
  user: string;
  product: ProductOrder;
  status: "spending" | "success" | "cancel" | "refuse" | "default";
  message: string;
  pay: string;
}
