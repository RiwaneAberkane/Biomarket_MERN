import axios            from "axios";
import OrderType from "../models/OrderType";
import { getObjectFromLocalStorage } from "../utils/utils";

export const getAllOrders = () => {
  return axios.get<OrderType[]>(`http://localhost:4000/api/order`, {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
   }
  ).then((res) => res.data);
}

