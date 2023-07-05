import axios            from "axios";
import SaleType from "../models/SaleType";
import { getObjectFromLocalStorage } from "../utils/utils";

export const getAllSales = () => {
  return axios.get<SaleType[]>(`http://localhost:4000/api/sale`, {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
   }
  ).then((res) => res.data);
}


export const postSale = (sale : any) => {
  return axios.post(`http://localhost:4000/api/sale/create`, sale, {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
   }
  ).then((res) => res.data);
}
