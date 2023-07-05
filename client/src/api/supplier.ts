import axios            from "axios";
import { SupplierType } from "../models/SupplierType";
import { getObjectFromLocalStorage } from "../utils/utils";

export const getSupplier = () => {
  return axios.get<SupplierType[]>(`http://localhost:4000/api/supplier`,
  {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  })
  .then((res) => res.data);
}

export const getSupplierById = (supplierId: string): Promise<SupplierType | null> => {
  return axios.get<SupplierType[]>(`http://localhost:4000/api/supplier`,{
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  })
    .then((res) => {
      const suppliers = res.data;
      const supplier = suppliers.find((supplier) => supplier._id === supplierId);
      return supplier || null;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export const updateSupplier = (productId: string, updateSupplier: SupplierType) => {
  return axios.put<SupplierType>(`http://localhost:4000/api/supplier/${productId}/update`, updateSupplier, {
    headers:{
     'x-access-token' : getObjectFromLocalStorage("token")
    }
  })
  .then((res) => res.data);
};

export const createSupplier = async (
  newSupplier: SupplierType
): Promise<SupplierType> => {
  const response = await axios.post<SupplierType>(
    "http://localhost:4000/api/supplier/create",
    newSupplier,
    {
      headers:{
       'x-access-token' : getObjectFromLocalStorage("token")
      }
    }
  );
  return response.data;
};

