import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toastStore, useToast } from "@chakra-ui/react";

export const useAuthStore = create((set, get) => ({
  isLoggingIn: false,

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
}));
