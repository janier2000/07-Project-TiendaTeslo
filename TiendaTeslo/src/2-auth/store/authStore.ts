import type { User } from "@/interfaces/userInterface";
import { create } from "zustand";
import { AccesoAction } from "../actions/AccesoAction";
import { chequearAction } from "../actions/chequearAction";

type LstEstados = "autenticado" | "no-autenticado" | "checkiado";

type Estado = {
  // propiedades
  user: User | null;
  token: string | null;
  estadosAut: LstEstados;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<Estado>()((set, get) => ({
  // Implementación del Store
  user: null,
  token: null,
  estadosAut: "checkiado",

  // Getters
  isAdmin: function () {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
    // return !!get().user?.roles.includes('admin')
  },

  // Actions
  login: async function (correo: string, contraseña: string) {
    console.log({ correo, contraseña });

    try {
      const data = await AccesoAction(correo, contraseña);
      localStorage.setItem("token-Teslo", data.token);

      set({ user: data.user, token: data.token, estadosAut: "autenticado" });

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem("token-Teslo");
      set({ user: null, token: null, estadosAut: "no-autenticado" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token-Teslo");
    set({ user: null, token: null, estadosAut: "no-autenticado" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await chequearAction();
      set({
        user: user,
        token: token,
        estadosAut: "autenticado",
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        estadosAut: "no-autenticado",
      });

      return false;
    }
  },
}));
