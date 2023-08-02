export enum StatusPayment {
  spending,
  falure,
  success,
}

export interface PaymentType {
  user: string;
  status: "spending" | "falure" | "success";
  method: string;
  amount: number;
  transactionId: string;
}
