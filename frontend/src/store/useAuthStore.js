import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useToast } from "@chakra-ui/react";

export const useAuthStore = create((set, get) => ({
  authUser: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: true });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("Logged in");
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      console.log("Logged out");
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
}));
