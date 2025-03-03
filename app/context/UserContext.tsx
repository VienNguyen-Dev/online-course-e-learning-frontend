"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface UserContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const useParams = useSearchParams();
  useEffect(() => {
    const token = localStorage.getItem("auth_token") || useParams.get("token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const login = (token: string, userData: any) => {
    Cookies.set("auth_cookies", token, { expires: 7 });
    localStorage.setItem("auth_token", token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("auth_cookies");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/sign-in");
  };
  return <UserContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
