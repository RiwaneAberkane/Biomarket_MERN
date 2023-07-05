import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type contextProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: any | null;
  token: string | null;
  setToken: (token: string) => void;
  checkUserData(): void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setToken(): void {},
  checkUserData(): void {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: contextProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function checkUserData(): Promise<any> {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }

    try {
      const loggedInUser = await axios.get(
        "http://localhost:4000/api/auth/profile",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (loggedInUser) {
        setUser(loggedInUser.data);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  useEffect(() => {
    if (!user) {
      checkUserData();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, checkUserData, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
