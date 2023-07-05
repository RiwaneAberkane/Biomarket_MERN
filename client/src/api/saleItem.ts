import axios from "axios";
import { SaleItemType } from "../models/SaleItemType";
import { getObjectFromLocalStorage } from "../utils/utils";

export async function getSaleItemsBySaleId(saleId: string): Promise<SaleItemType[]> {
  try {
    const saleItems = await axios.get(`http://localhost:4000/api/saleItems/items/${saleId}`,  {
      headers:{
       'x-access-token' : getObjectFromLocalStorage("token")
      }
    }
  ).then((response) => {console.log(response); return response.data
    });
    return saleItems;
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur s'est produite lors de la récupération des éléments de vente.");
  }
}
