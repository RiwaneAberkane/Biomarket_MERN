import axios            from "axios";
import { ProductType } from "../models/ProductType";
import { getObjectFromLocalStorage } from "../utils/utils";

export const getProduct = () => {
  return axios.get<ProductType[]>(`http://localhost:4000/api/product`,  {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  }).then((res) => res.data);
}

export const updateProduct = (productId: string, updatedProduct: ProductType) => {
  return axios.put<ProductType>(`http://localhost:4000/api/product/${productId}/update`, updatedProduct, {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  }).then((res) => res.data);
};

// Supprimer un produit
export const deleteProduct = (productId: string) => {
  return axios.delete(`http://localhost:4000/api/product/${productId}/delete`,  {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  }).then((res) => res.data);
};


export const getProductById = (productId: string) => {
  return axios.get<ProductType>(`http://localhost:4000/api/product/${productId}`,  {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  }).then((res) => res.data);
}

export const createProduct = async (
  newProduct: ProductType
): Promise<ProductType> => {
  const response = await axios.post<ProductType>(
    "http://localhost:4000/api/product/create",
    newProduct,  {
      headers:{
       'x-access-token' : getObjectFromLocalStorage("token")
      }
    }
  );
  return response.data;
};

