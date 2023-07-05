import { Types } from "mongoose";

interface OrderItemType {
  _id: Types.ObjectId;
  quantity: number;
  price: number;

}

interface OrderType {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  supplier: Types.ObjectId;
  items: OrderItemType[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

export default OrderType;
