import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/authResponse";

export function chequearAction() {
  return async (): Promise<AuthResponse> => {
    const token = localStorage.getItem("token-Teslo");
    if (!token) {
      throw new Error("Token no encontrado");
    }
    try {
      const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
      localStorage.setItem("token-Teslo", data.token);
      return data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token-Teslo");
      throw new Error("El token ha caducado o no es válido");
    }
  };
}
