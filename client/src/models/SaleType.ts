import { Types } from "mongoose";

interface SaleItemType{
  _id: Types.ObjectId;
  quantity: number;
  price: number;

}

interface SaleType {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: SaleItemType[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

export default SaleType;
