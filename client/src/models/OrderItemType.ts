import { ProductType } from "./ProductType";

export type OrderItemType =
{
    _id: string;
    product: ProductType;
    quantity: number;
    price: number;
}


