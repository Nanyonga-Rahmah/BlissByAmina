import { jwtDecode } from "jwt-decode";
import type { IUser } from "../interfaces/interface";




const setUserToken = (accessToken: string) => {
  localStorage.setItem("bliss_user_tkn", accessToken);
};

const setAuthUser = (userData: unknown) => {
  localStorage.setItem("bliss_user", JSON.stringify(userData));
};

const getUserToken = () => {
  return localStorage.getItem("bliss_user_tkn") ?? null;
};

const getAuthUser = (): IUser | undefined => {
  const user =
    typeof window !== "undefined" && localStorage.getItem("bliss_user");

  if (user) {
    try {
      return JSON.parse(user) as IUser;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return undefined;
    }
  }

  return undefined;
};

const deleteUserToken = () => {
  localStorage.removeItem("bliss_user_tkn");
};

const deleteAuthUser = () => {
  localStorage.removeItem("bliss_user");
};

const logout = () => {
  localStorage.removeItem("bliss_user_tkn");
  localStorage.removeItem("bliss_user");
};

const isAuthTokenExpired = (expirationTime: number) => {
  const currentTime = Math.floor(Date.now() / 1000);

  return expirationTime < currentTime;
};

const decodeToken = (token: string) => {
  return jwtDecode(token);
};

const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("bliss_user_tkn") ?? null;
    // console.log("Token:", token);
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp !== undefined) {
        const isTokenExpired = isAuthTokenExpired(decodedToken.exp);
        if (isTokenExpired) {
          console.log("Token expired");
          localStorage.removeItem("bliss_user_tkn");

        }
        return !isTokenExpired;
      }
    }
  }
  return false;
};

export {
  setUserToken,
  
  isAuthenticated,
  getUserToken,
  deleteUserToken,
  setAuthUser,
  getAuthUser,
  deleteAuthUser,
  logout,
};
