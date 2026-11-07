import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/authResponse";

export async function AccesoAction(
  email: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
