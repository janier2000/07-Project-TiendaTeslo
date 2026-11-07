import type { User } from "@/interfaces/userInterface";
import { create } from "zustand";
import { AccesoAction } from "../actions/AccesoAction";
import { chequearAction } from "../actions/chequearAction";

type LstEstados = "autenticado" | "no-autenticado" | "checkiado";

type StateAuth = {
  //propiedades
  user: User | null;
  token: string | null;
  estadosAut: LstEstados;

  //captadores
  esAdministradorStore: () => boolean;

  //Acciones
  accesoStore: (correo: string, contraseña: string) => Promise<boolean>;
  cerrarSesionStore: () => void;
  chequearEstadoStore: () => Promise<boolean>;
};

export const useAuthStore = create<StateAuth>()((set, get) => ({
  // Implementación del Store
  user: null,
  token: null,
  estadosAut: "checkiado",

  // captadores
  esAdministradorStore: function () {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
    // return !!get().user?.roles.includes('admin')
  },

  // Actions
  accesoStore: async function (correo: string, contraseña: string) {
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

  cerrarSesionStore: function () {
    localStorage.removeItem("token-Teslo");
    set({ user: null, token: null, estadosAut: "no-autenticado" });
  },

  chequearEstadoStore: async function () {
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
