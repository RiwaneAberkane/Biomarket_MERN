import axios from "axios";
import { UserType } from "../models/UserType";

export const getUser = () => {
  return axios.get<UserType[]>(`http://localhost:4000/api/users/all`)
              .then((res) => res.data);
}

export const getUserById = (userId: string): Promise<UserType | null> => {
  
  return axios.get<UserType[]>(`http://localhost:4000/api/users/all`)
  .then((res) => {
    const users = res.data;
    const user = users.find((user) => user._id === userId);
    return user || null;
  })
  .catch((error) => {
    console.error(error);
    return null;
  });
};

export const signin = (data: any) => {
  return axios.post(`http://localhost:4000/api/auth/signin`, data)
  .then((res) => {
    return res.data
  })
};

export const logout = () => {
  return axios.get(`http://localhost:4000/api/users/logout`)
  .then((res) => {
    return res.data
  })
};
