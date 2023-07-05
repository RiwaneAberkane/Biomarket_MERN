
import  {OrderItemType}  from "../models/OrderItemType";
import axios from "axios";
import { getObjectFromLocalStorage } from "../utils/utils";

export async function getOrderItemsByOrderId(orderId: string): Promise<OrderItemType[]> {
  try {
    const orderItems = await axios.get(`http://localhost:4000/api/orderItems/items/${orderId}`, {
      headers:{
       'x-access-token' : getObjectFromLocalStorage("token")
      }
     }
    ).then((response) => {console.log(response); return response.data
    });
    return orderItems;
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur s'est produite lors de la récupération des éléments de commande.");
  }
}
